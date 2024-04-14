package no.nav.bidrag.dokument.produksjon.api

import com.fasterxml.jackson.databind.JsonNode
import io.github.oshai.kotlinlogging.KotlinLogging
import no.nav.bidrag.dokument.produksjon.OPENHTMLTOPDF_RENDERING_SUMMARY
import no.nav.bidrag.dokument.produksjon.SIKKER_LOGG
import no.nav.bidrag.dokument.produksjon.consumer.BidragDokumentmalConsumer
import no.nav.bidrag.transport.felles.commonObjectmapper
import no.nav.pdfgen.core.PDFGenCore.Companion.environment
import no.nav.pdfgen.core.objectMapper
import no.nav.pdfgen.core.pdf.createHtml
import no.nav.pdfgen.core.pdf.createHtmlFromTemplateData
import no.nav.pdfgen.core.pdf.createPDFA
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import java.nio.file.Files

private val log = KotlinLogging.logger {}

fun generateHTMLResponse(
    category: String,
    template: String,
    content: String?,
    useHottemplate: Boolean = false,
): ResponseEntity<String> {
    return generateHtml(category, template, content, useHottemplate)?.let {
        ResponseEntity.ok().contentType(MediaType.TEXT_HTML).body(it)
    }
        ?: ResponseEntity.status(HttpStatus.NOT_FOUND).body("Template or category not found")
}

fun generateHTMLResponse2(
    bidragDokumentmalConsumer: BidragDokumentmalConsumer,
    category: String,
    template: String,
    payload: String?,
    useHottemplate: Boolean = false,
): ResponseEntity<String> {
    if (payload == null && !useHottemplate) {
        throw RuntimeException(
            "Mangler data for å generere brev",
        )
    }
    val jsonPayload = payload ?: hotTemplateData(category, template)
    return bidragDokumentmalConsumer.hentDokumentmal(category, template, jsonPayload)?.let {
        ResponseEntity.ok().contentType(MediaType.TEXT_HTML).body(it)
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

fun generatePDFResponse2(
    bidragDokumentmalConsumer: BidragDokumentmalConsumer,
    category: String,
    template: String,
    payload: String?,
    useHottemplate: Boolean = false,
): ResponseEntity<*> {
    if (payload == null && !useHottemplate) {
        throw RuntimeException(
            "Mangler data for å generere brev",
        )
    }
    val jsonPayload = payload ?: hotTemplateData(category, template)
    val startTime = System.currentTimeMillis()
    return bidragDokumentmalConsumer.hentDokumentmal(category, template, jsonPayload)?.let {
            document ->
        log.info { document }
        val bytes = PdfContent(document).generate()
        log.info {
            "Done generating PDF for category $category and template $template in ${System.currentTimeMillis() - startTime}ms"
        }
        ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_PDF)
            .header(
                HttpHeaders.CONTENT_DISPOSITION,
                "inline; filename=dokumenter_sammenslatt.pdf",
            )
            .body(bytes)
    }
        ?: ResponseEntity.status(HttpStatus.NOT_FOUND).body("Template or category not found")
}

private fun hotTemplateData(
    foldername: String,
    template: String,
): String {
    val dataFile = environment.dataRoot.getPath("$foldername/$template.json")
    val data =
        objectMapper.readValue(
            if (Files.exists(dataFile)) {
                Files.readAllBytes(dataFile)
            } else {
                "{}".toByteArray(Charsets.UTF_8)
            },
            JsonNode::class.java,
        )
    return commonObjectmapper.writeValueAsString(data)
}

fun generatePDFResponse(
    category: String,
    template: String,
    payload: String?,
    useHottemplate: Boolean = false,
): ResponseEntity<*> {
    val startTime = System.currentTimeMillis()
    return generateHtml(category, template, payload, useHottemplate)?.let { document ->
        val bytes = PdfContent(document).generate()
        log.info {
            "Done generating PDF for category $category and template $template in ${System.currentTimeMillis() - startTime}ms"
        }
        ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_PDF)
            .header(
                HttpHeaders.CONTENT_DISPOSITION,
                "inline; filename=dokumenter_sammenslatt.pdf",
            )
            .body(bytes)
    }
        ?: ResponseEntity.status(HttpStatus.NOT_FOUND).body("Template or category not found")
}

fun generateHtml(
    category: String,
    template: String,
    payload: String?,
    useHottemplate: Boolean = false,
): String? {
    return if (useHottemplate) {
        createHtmlFromTemplateData(template, category)
    } else {
        return try {
            val jsonNode: JsonNode = objectMapper.readTree(payload)
            createHtml(template, category, jsonNode)
        } catch (e: Exception) {
            SIKKER_LOGG.error(e) { "Kunne ikke opprette $category $template for input $payload" }
            throw e
        }
    }
}

class PdfContent(
    private val html: String,
) {
    fun generate(): ByteArray = createPDFA(html)
}
