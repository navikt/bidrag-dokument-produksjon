package no.nav.bidrag.dokument.produksjon.api

import io.github.oshai.kotlinlogging.KotlinLogging
import io.ktor.http.ContentType
import io.ktor.http.HttpStatusCode
import io.ktor.http.content.OutgoingContent
import io.ktor.server.application.ApplicationCall
import io.ktor.server.application.call
import io.ktor.server.request.contentType
import io.ktor.server.request.receive
import io.ktor.server.request.receiveText
import io.ktor.server.response.respond
import io.ktor.server.response.respondBytes
import io.ktor.server.response.respondText
import io.ktor.server.routing.Routing
import io.ktor.server.routing.get
import io.ktor.server.routing.post
import io.ktor.server.routing.route
import java.io.InputStream
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import no.nav.bidrag.dokument.produksjon.OPENHTMLTOPDF_RENDERING_SUMMARY
import no.nav.pdfgen.core.Environment
import no.nav.pdfgen.core.pdf.createHtml
import no.nav.pdfgen.core.pdf.createHtmlFromTemplateData
import no.nav.pdfgen.core.pdf.createPDFA
import no.nav.pdfgen.core.pdf.createPdfFromImage

private val log = KotlinLogging.logger {}

fun Routing.setupGeneratePdfApi(env: Environment = Environment()) {
    route("/api/v1/genpdf") {
        if (!env.disablePdfGet) {
            get("/{directoryName}/{template}") {
                generateHtml(call, true)?.let { document -> call.respond(PdfContent(document)) }
                    ?: call.respondText(
                        "Template or application not found22",
                        status = HttpStatusCode.NotFound
                    )
            }
        }
        post("/{directoryName}/{template}") {
            val startTime = System.currentTimeMillis()
            generateHtml(call)?.let { document ->
                call.respond(PdfContent(document))
                log.info { "Done generating PDF in ${System.currentTimeMillis() - startTime}ms" }
            }
                ?: call.respondText(
                    "Template or application not found",
                    status = HttpStatusCode.NotFound
                )
        }
        post("/html") {
            val timer = OPENHTMLTOPDF_RENDERING_SUMMARY.labels("converthtml").startTimer()

            val html = call.receiveText()

            call.respond(PdfContent(html))
            log.info { "Generated PDF using HTML template on ${timer.observeDuration()}ms" }
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
                                contentType = ContentType.Application.Pdf
                            )
                        }
                    }
                }
                else -> call.respond(HttpStatusCode.UnsupportedMediaType)
            }
            log.info { "Generated PDF using image on ${timer.observeDuration()}ms" }
        }
    }
    if (env.enableHtmlEndpoint) {
        route("/api/v1/genhtml") {
            if (!env.disablePdfGet) {
                get("/{directoryName}/{template}") {
                    generateHtml(call, true)?.let { call.respond(it) }
                        ?: call.respondText(
                            "Template or application not found",
                            status = HttpStatusCode.NotFound
                        )
                }
            }

            post("/{directoryName}/{template}") {
                val startTime = System.currentTimeMillis()
                generateHtml(call)?.let {
                    call.respond(it)
                    log.info {
                        "Done generating HTML in ${System.currentTimeMillis() - startTime}ms"
                    }
                }
                    ?: call.respondText(
                        "Template or application not found",
                        status = HttpStatusCode.NotFound
                    )
            }
        }
    }
}

private suspend fun generateHtml(
    call: ApplicationCall,
    useHottemplate: Boolean = false,
): String? {
    val template = call.parameters["template"]!!
    val directoryName = call.parameters["directoryName"]!!
    return if (useHottemplate) createHtmlFromTemplateData(template, directoryName)
    else createHtml(template, directoryName, call.receive())
}

class PdfContent(
    private val html: String,
    override val contentType: ContentType = ContentType.Application.Pdf,
) : OutgoingContent.ByteArrayContent() {
    override fun bytes(): ByteArray = createPDFA(html)
}
