package no.nav.bidrag.dokument.produksjon.api

import io.github.oshai.kotlinlogging.KotlinLogging
import io.ktor.http.ContentType
import io.ktor.http.HttpStatusCode
import io.ktor.server.application.call
import io.ktor.server.request.contentType
import io.ktor.server.request.receive
import io.ktor.server.request.receiveText
import io.ktor.server.response.respond
import io.ktor.server.response.respondBytes
import io.ktor.server.routing.Routing
import io.ktor.server.routing.get
import io.ktor.server.routing.post
import io.ktor.server.routing.route
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import no.nav.bidrag.dokument.produksjon.Environment
import no.nav.bidrag.dokument.produksjon.OPENHTMLTOPDF_RENDERING_SUMMARY
import no.nav.pdfgen.core.pdf.createPdfFromImage
import java.io.InputStream


private val log = KotlinLogging.logger {}

fun Routing.setupApi(env: Environment = Environment()) {
    route("/api/genpdf") {
        if (!env.disablePdfGet) {
            get("/get/{category}/{dokumentmal}") {
                generatePDFResponse(call.category, call.template, call, true)
            }
        }
        post("/html") {
            generatePDFFromHtmlResponse(call.receiveText(), call)
        }
        post("/image") {
            val timer = OPENHTMLTOPDF_RENDERING_SUMMARY.labels("convertjpeg").startTimer()

            when (call.request.contentType()) {
                ContentType.Image.JPEG,
                ContentType.Image.PNG -> {
                    withContext(Dispatchers.IO) {
                        call.receive<InputStream>().use { inputStream ->
                            call.respondBytes(
                                createPdfFromImage(inputStream),
                                contentType = ContentType.Application.Pdf,
                            )
                        }
                    }
                }

                else -> call.respond(HttpStatusCode.UnsupportedMediaType)
            }
            log.info { "Generated PDF using image on ${timer.observeDuration()}ms" }
        }
    }
    route("/api/genhtml") {
        if (!env.disablePdfGet) {
            get("/{category}/{template}") {
                generateHTMLResponse(call.category, call.template, call, true)
            }
        }

        post("/{category}/{template}") {
            generateHTMLResponse(call.category, call.template, call)
        }
    }
}
