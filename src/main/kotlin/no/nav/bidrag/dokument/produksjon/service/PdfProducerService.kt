package no.nav.bidrag.dokument.produksjon.service

import io.github.oshai.kotlinlogging.KotlinLogging
import no.nav.bidrag.dokument.produksjon.consumer.BidragDokumentmalConsumer
import no.nav.bidrag.dokument.produksjon.consumer.BidragPdfGenConsumer
import no.nav.bidrag.transport.felles.commonObjectmapper
import no.nav.bidrag.transport.notat.NotatMalType
import no.nav.bidrag.transport.notat.VedtakNotatDto
import no.nav.pdfgen.core.PDFGenCore.Companion.environment
import no.nav.pdfgen.core.pdf.createPDFA
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import java.nio.file.Files

private val log = KotlinLogging.logger {}

@Service
class PdfProducerService(
    private val bidragPdfGenConsumer: BidragPdfGenConsumer,
    private val bidragDokumentmalConsumer: BidragDokumentmalConsumer,
) {
    fun generateHTMLResponseV2(
        category: String,
        dokumentmal: NotatMalType,
        payload: String?,
        useHottemplate: Boolean = false,
    ): ResponseEntity<String> {
        if (payload == null && !useHottemplate) {
            throw RuntimeException(
                "Mangler data for å generere brev",
            )
        }
        val type = dokumentmal.name.lowercase()
        val jsonPayload = payload ?: hotTemplateData(category, type)
        return bidragDokumentmalConsumer.hentDokumentmal(category, type, jsonPayload, false)?.let {
            ResponseEntity.ok().contentType(MediaType.TEXT_HTML).body(it)
        }
            ?: ResponseEntity.status(HttpStatus.NOT_FOUND).body("Template or category not found")
    }

    fun generatePDFResponseV2(
        category: String,
        dokumentmal: NotatMalType,
        payload: String?,
        useHottemplate: Boolean = false,
    ): ResponseEntity<ByteArray> {
        if (payload == null && !useHottemplate) {
            throw RuntimeException(
                "Mangler data for å generere brev",
            )
        }
        val type = dokumentmal.name.lowercase()
        val jsonPayload = payload ?: hotTemplateData(category, type)
        val startTime = System.currentTimeMillis()
        return bidragDokumentmalConsumer.hentDokumentmal(category, type, jsonPayload)?.let { document ->
            val bytes = PdfContent(document.fjernKontrollTegn()).generate()
            log.info {
                "Done generating PDF for category $category and template $type in ${System.currentTimeMillis() - startTime}ms"
            }
            ResponseEntity
                .ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(
                    HttpHeaders.CONTENT_DISPOSITION,
                    "inline; filename=dokumenter_sammenslatt.pdf",
                ).body(bytes)
        }
            ?: ResponseEntity
                .status(
                    HttpStatus.NOT_FOUND,
                ).body("Template or category not found".toByteArray())
    }
}

fun String.fjernKontrollTegn() = this.replace("\\p{C}".toRegex(), "")

fun hotTemplateData(
    foldername: String,
    template: String,
): String {
    val dataFile = environment.dataRoot.getPath("$foldername/$template.json")
    val data =
        commonObjectmapper.readValue(
            if (Files.exists(dataFile)) {
                Files.readAllBytes(dataFile)
            } else {
                "{}".toByteArray(Charsets.UTF_8)
            },
            VedtakNotatDto::class.java,
        )
    return commonObjectmapper.writeValueAsString(data)
}

class PdfContent(
    private val html: String,
) {
    fun generate(): ByteArray = createPDFA(html)
}
