package no.nav.pdfgen.api

import com.fasterxml.jackson.databind.JsonNode
import com.github.jknack.handlebars.Context
import com.github.jknack.handlebars.JsonNodeValueResolver
import com.github.jknack.handlebars.Template
import com.github.jknack.handlebars.context.MapValueResolver
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
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import net.logstash.logback.argument.StructuredArguments
import no.nav.pdfgen.HANDLEBARS_RENDERING_SUMMARY
import no.nav.pdfgen.OPENHTMLTOPDF_RENDERING_SUMMARY
import no.nav.pdfgen.core.Environment
import no.nav.pdfgen.core.pdf.createHtml
import no.nav.pdfgen.core.pdf.createPDFA
import no.nav.pdfgen.objectMapper
import java.io.ByteArrayOutputStream
import java.io.InputStream
import java.nio.file.Files
import java.nio.file.Paths

private val log = KotlinLogging.logger {}

fun Routing.setupGeneratePdfApi(env: Environment = Environment()) {
    route("/api/v1/genpdf") {
        if (!env.disablePdfGet) {
            get("/{applicationName}/{template}") {
                generateHtml(call, true)?.let { document ->
                    call.respond(PdfContent(document, env))
                }
                    ?: call.respondText(
                        "Template or application not found",
                        status = HttpStatusCode.NotFound
                    )
            }
        }
        post("/{applicationName}/{template}") {
            val startTime = System.currentTimeMillis()
            generateHtml(call)?.let { document ->
                call.respond(PdfContent(document, env))
                log.info { "Done generating PDF in ${System.currentTimeMillis() - startTime}ms" }
            }
                ?: call.respondText(
                    "Template or application not found",
                    status = HttpStatusCode.NotFound
                )
        }
        post("/html/{applicationName}") {
            val applicationName = call.parameters["applicationName"]!!
            val timer =
                OPENHTMLTOPDF_RENDERING_SUMMARY.labels(applicationName, "converthtml").startTimer()

            val html = call.receiveText()

            call.respond(PdfContent(html, env))
            log.info {
                "Generated PDF using HTML template for $applicationName om ${timer.observeDuration()}ms"
            }
        }
        post("/image/{applicationName}") {
            val applicationName = call.parameters["applicationName"]!!
            val timer =
                OPENHTMLTOPDF_RENDERING_SUMMARY.labels(applicationName, "convertjpeg").startTimer()

            when (call.request.contentType()) {
                ContentType.Image.JPEG,
                ContentType.Image.PNG -> {
                    withContext(Dispatchers.IO) {
                        call.receive<InputStream>().use { inputStream ->
                            ByteArrayOutputStream().use { outputStream ->
                                createPDFA(inputStream, outputStream, env)
                                call.respondBytes(
                                    outputStream.toByteArray(),
                                    contentType = ContentType.Application.Pdf
                                )
                            }
                        }
                    }
                }
                else -> call.respond(HttpStatusCode.UnsupportedMediaType)
            }
            log.info {
                "Generated PDF using image for $applicationName om ${timer.observeDuration()}ms"
            }
        }
    }
    if (env.enableHtmlEndpoint) {
        route("/api/v1/genhtml") {
            if (!env.disablePdfGet) {
                get("/{applicationName}/{template}") {
                    generateHtml(call, true)?.let { call.respond(it) }
                        ?: call.respondText(
                            "Template or application not found",
                            status = HttpStatusCode.NotFound
                        )
                }
            }

            post("/{applicationName}/{template}") {
                val startTime = System.currentTimeMillis()
                generateHtml(call)?.let {
                    call.respond(it)
                    log.info { "Done generating HTML in ${System.currentTimeMillis() - startTime}ms" }
                }
                    ?: call.respondText(
                        "Template or application not found",
                        status = HttpStatusCode.NotFound
                    )
            }
        }
    }
}

private fun hotTemplateData(applicationName: String, template: String): JsonNode {
    val dataFile = Paths.get("data", applicationName, "$template.json")
    val data =
        objectMapper.readValue(
            if (Files.exists(dataFile)) {
                Files.readAllBytes(dataFile)
            } else {
                "{}".toByteArray(Charsets.UTF_8)
            },
            JsonNode::class.java,
        )
    return data
}

private suspend fun generateHtml(
    call: ApplicationCall,
    useHottemplate: Boolean = false,
): String? {
    val template = call.parameters["template"]!!
    val applicationName = call.parameters["applicationName"]!!
    val jsonNode =
        if (useHottemplate) hotTemplateData(applicationName, template) else call.receive()
    log.debug { "${"JSON: {}"} ${objectMapper.writeValueAsString(jsonNode)}" }
    return createHtml(template, applicationName, useHottemplate, jsonNode)
}

fun render(
    applicationName: String,
    template: String,
    templates: Map<Pair<String, String>, Template>,
    jsonNode: JsonNode
): String? {
    return HANDLEBARS_RENDERING_SUMMARY.startTimer()
        .use {
            templates[applicationName to template]?.apply(
                Context.newBuilder(jsonNode)
                    .resolver(
                        JsonNodeValueResolver.INSTANCE,
                        MapValueResolver.INSTANCE,
                    )
                    .build(),
            )
        }
        ?.let { html ->
            log.debug { "${"Generated HTML {}"} ${StructuredArguments.keyValue("html", html)}" }

            /* Uncomment to output html to file for easier debug
             *        File("pdf.html").bufferedWriter().use { out ->
             *            out.write(html)
             *        }
             */
            html
        }
}

class PdfContent(
    private val html: String,
    private val env: Environment,
    override val contentType: ContentType = ContentType.Application.Pdf,
) : OutgoingContent.ByteArrayContent() {
    override fun bytes(): ByteArray = createPDFA(html, env)
}
