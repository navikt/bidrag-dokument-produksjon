package no.nav.bidrag.dokument.produksjon.api

import com.fasterxml.jackson.databind.JsonNode
import io.github.oshai.kotlinlogging.KotlinLogging
import no.nav.bidrag.dokument.produksjon.OPENHTMLTOPDF_RENDERING_SUMMARY
import no.nav.pdfgen.core.objectMapper
import no.nav.pdfgen.core.pdf.createHtml
import no.nav.pdfgen.core.pdf.createHtmlFromTemplateData
import no.nav.pdfgen.core.pdf.createPDFA
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity

private val log = KotlinLogging.logger {}


fun generateHTMLResponse(
    category: String,
    template: String,
    content: String,
    useHottemplate: Boolean = false
): ResponseEntity<*> {
    return generateHtml(category, template, content, useHottemplate)?.let {
        ResponseEntity.ok()
            .contentType(MediaType.TEXT_HTML)
            .body(it)
    }
        ?: ResponseEntity.status(HttpStatus.NOT_FOUND).body("Template or category not found")
}

fun generatePDFFromHtmlResponse(html: String): ResponseEntity<ByteArray> {
    val timer = OPENHTMLTOPDF_RENDERING_SUMMARY.labels("converthtml").startTimer()
    val bytes = PdfContent(html).generate()
    log.info { "Done generating PDF from html in ${timer.observeDuration()}ms" }
    return ResponseEntity.ok()
        .contentType(MediaType.APPLICATION_PDF)
        .header(
            HttpHeaders.CONTENT_DISPOSITION,
            "inline; filename=dokumenter_sammenslatt.pdf",
        )
        .body(bytes)
}

fun generatePDFResponse(
    category: String,
    template: String,
    payload: String,
    useHottemplate: Boolean = false
): ResponseEntity<*> {
    val startTime = System.currentTimeMillis()
    return generateHtml(category, template, payload, useHottemplate)?.let { document ->
        val bytes = PdfContent(document).generate()
        log.info { "Done generating PDF for category $category and template $template in ${System.currentTimeMillis() - startTime}ms" }
        ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_PDF)
            .header(
                HttpHeaders.CONTENT_DISPOSITION,
                "inline; filename=dokumenter_sammenslatt.pdf",
            )
            .body(bytes)
    } ?: ResponseEntity.status(HttpStatus.NOT_FOUND).body("Template or category not found")
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
) {
    fun generate(): ByteArray = createPDFA(html)
}
