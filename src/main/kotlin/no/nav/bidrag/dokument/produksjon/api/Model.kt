package no.nav.bidrag.dokument.produksjon.api

import com.fasterxml.jackson.databind.JsonNode
import io.github.oshai.kotlinlogging.KotlinLogging
import io.ktor.http.ContentType
import io.ktor.http.HttpStatusCode
import io.ktor.http.content.OutgoingContent
import io.ktor.server.application.ApplicationCall
import io.ktor.server.request.receive
import io.ktor.server.request.receiveText
import io.ktor.server.response.respondBytes
import io.ktor.server.response.respondText
import no.nav.bidrag.dokument.produksjon.OPENHTMLTOPDF_RENDERING_SUMMARY
import no.nav.bidrag.dokument.produksjon.objectMapper
import no.nav.pdfgen.core.pdf.createHtml
import no.nav.pdfgen.core.pdf.createHtmlFromTemplateData
import no.nav.pdfgen.core.pdf.createPDFA

private val log = KotlinLogging.logger {}

val ApplicationCall.category get() = parameters["category"]!!
val ApplicationCall.template get() = parameters["dokumentmal"] ?: parameters["template"] ?: "Ukjent"

suspend fun generateHTMLResponse(
    category: String,
    template: String,
    call: ApplicationCall,
    useHottemplate: Boolean = false
) {
    val content = call.receiveText()
    return generateHtml(category, template, content, useHottemplate)?.let {
        call.respondText(it, contentType = ContentType.Text.Html)
    }
        ?: call.respondText(
            "Template or application not found",
            status = HttpStatusCode.NotFound,
        )
}

suspend fun generatePDFFromHtmlResponse(html: String, call: ApplicationCall) {
    val timer = OPENHTMLTOPDF_RENDERING_SUMMARY.labels("converthtml").startTimer()
    call.respondBytes(
        PdfContent(html).bytes(),
        contentType = ContentType.Application.Pdf,
    )
    log.info { "Done generating PDF from html in ${timer.observeDuration()}ms" }
}

suspend fun generatePDFResponse(
    category: String,
    template: String,
    call: ApplicationCall,
    useHottemplate: Boolean = false
) {
    val startTime = System.currentTimeMillis()
    generateHtml(category, template, call.receive(), useHottemplate)?.let { document ->
        call.respondBytes(
            PdfContent(document).bytes(),
            contentType = ContentType.Application.Pdf,
        )
        log.info { "Done generating PDF for category $category and template $template in ${System.currentTimeMillis() - startTime}ms" }
    }
        ?: call.respondText(
            "Template or category not found",
            status = HttpStatusCode.NotFound,
        )
}

fun generateHtml(
    category: String,
    template: String,
    payload: String,
    useHottemplate: Boolean = false,
): String? {
    return if (useHottemplate) createHtmlFromTemplateData(template, category)
    else {
        val jsonNode: JsonNode = objectMapper.readTree(payload)
        createHtml(template, category, jsonNode)
    }
}

class PdfContent(
    private val html: String,
    override val contentType: ContentType = ContentType.Application.Pdf,
) : OutgoingContent.ByteArrayContent() {
    override fun bytes(): ByteArray = createPDFA(html)
}
