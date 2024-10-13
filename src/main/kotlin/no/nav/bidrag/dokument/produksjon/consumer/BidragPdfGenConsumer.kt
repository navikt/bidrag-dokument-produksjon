package no.nav.bidrag.dokument.produksjon.consumer

import io.github.oshai.kotlinlogging.KotlinLogging
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.jsoup.nodes.Element
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.core.io.ByteArrayResource
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.stereotype.Component
import org.springframework.util.LinkedMultiValueMap
import org.springframework.util.MultiValueMap
import org.springframework.web.client.RestTemplate
import org.springframework.web.client.postForEntity

private val log = KotlinLogging.logger {}

@Component
class BidragPdfGenConsumer(
    @Value("\${bidrag-pdfgen.url}") private val url: String,
) {
    fun produserPdf(html: String): ByteArray? =
        try {
            val url = "$url/forms/chromium/convert/html"
            val restTemplate: RestTemplate = RestTemplateBuilder().build()

            val headers = HttpHeaders()
            headers.contentType = MediaType.MULTIPART_FORM_DATA
            headers["Gotenberg-Output-Filename"] = "output.pdf"
            val requestEntity =
                HttpEntity(
                    LinkedMultiValueMap<String, Any>()
                        .configure()
                        .addFiles(html),
                    headers,
                )
            restTemplate.postForEntity<ByteArray>(url, requestEntity).body
        } catch (e: Exception) {
            log.error(e) { "Det skjedde en feil ved henting av dokumentmal fra url $url" }
            null
        }

    fun String.toHtmlResource(name: String) =
        object : ByteArrayResource(toByteArray()) {
            override fun getFilename(): String = "$name.html"
        }

    private fun MultiValueMap<String, Any>.configure(): MultiValueMap<String, Any> {
        add("pdfa", "PDF/A-3b")
        add("pdfua", "true")
        add("emulatedMediaType", "print")
        add("preferCssPageSize", "true")
        add("scale", "1.5")
        return this
    }

    private fun MultiValueMap<String, Any>.addFiles(html: String): MultiValueMap<String, Any> {
        val htmlContent =
            removeElementByIdFromString(
                html,
                "header",
                "footer",
            ).html().toHtmlResource("index")
        val header =
            getElementByIdFromString(
                html,
                "header",
            )!!.html().toHtmlResource("header")
        val footer =
            getElementByIdFromString(
                html,
                "footer",
            )!!.html().toHtmlResource("footer")
        add("files", htmlContent)
        add("files", header)
        add("files", footer)
        return this
    }

    private fun removeElementByIdFromString(
        htmlString: String,
        vararg elementIds: String,
    ): Element {
        val document: Document = Jsoup.parse(htmlString)
        elementIds.forEach { elementId ->
            while (document.getElementById(elementId) != null) {
                document.getElementById(elementId)?.remove()
            }
        }

        return document
    }

    private fun getElementByIdFromString(
        htmlString: String,
        elementId: String,
    ): Element? {
        val document: Document = Jsoup.parse(htmlString)
        return document.getElementById(elementId)
    }
}
