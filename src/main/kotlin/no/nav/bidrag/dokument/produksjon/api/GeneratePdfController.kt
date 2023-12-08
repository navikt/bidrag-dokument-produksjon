package no.nav.bidrag.dokument.produksjon.api

import io.github.oshai.kotlinlogging.KotlinLogging
import java.io.InputStream
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import no.nav.bidrag.dokument.produksjon.OPENHTMLTOPDF_RENDERING_SUMMARY
import no.nav.pdfgen.core.pdf.createPdfFromImage
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

private val log = KotlinLogging.logger {}

@RestController
@RequestMapping("/api/genpdf")
class GenPDFController {

    @GetMapping("/{category}/{dokumentmal}")
    fun generatePDFFromSample(
        @PathVariable category: String,
        @PathVariable dokumentmal: String,
    ): ResponseEntity<*> {
        return generatePDFResponse(category, dokumentmal, null, true)
    }

    @PostMapping("/html")
    fun html(@RequestBody payload: String): ResponseEntity<*> {
        return generatePDFFromHtmlResponse(payload)
    }

    @PostMapping("/image")
    suspend fun image(
        @RequestHeader(HttpHeaders.CONTENT_TYPE) contentType: MediaType,
        @RequestBody inputStream: InputStream
    ): ResponseEntity<*> {
        val timer = OPENHTMLTOPDF_RENDERING_SUMMARY.labels("convertjpeg").startTimer()
        val response =
            when (contentType) {
                MediaType.IMAGE_JPEG,
                MediaType.IMAGE_PNG ->
                    withContext(Dispatchers.IO) {
                        ResponseEntity.ok()
                            .contentType(MediaType.APPLICATION_PDF)
                            .header(
                                HttpHeaders.CONTENT_DISPOSITION,
                                "inline; filename=dokumenter_sammenslatt.pdf",
                            )
                            .body(createPdfFromImage(inputStream))
                    }
                else -> ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).build()
            }
        log.info { "Generated PDF using image on ${timer.observeDuration()}ms" }
        return response
    }
}

@RestController
@RequestMapping("/api/genhtml")
class GenHtmlController {

    @GetMapping("/{category}/{dokumentmal}")
    fun generateHtmlFromSample(
        @PathVariable category: String,
        @PathVariable dokumentmal: String,
    ): ResponseEntity<*> {
        return generateHTMLResponse(category, dokumentmal, null, true)
    }

    @PostMapping("/{category}/{dokumentmal}")
    fun fromHtml(
        @PathVariable category: String,
        @PathVariable dokumentmal: String,
        @RequestBody payload: String
    ): ResponseEntity<*> {
        return generateHTMLResponse(category, dokumentmal, payload)
    }
}
