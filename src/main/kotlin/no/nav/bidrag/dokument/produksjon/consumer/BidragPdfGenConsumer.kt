package no.nav.bidrag.dokument.produksjon.consumer

import io.github.oshai.kotlinlogging.KotlinLogging
import org.apache.hc.client5.http.entity.mime.InputStreamBody
import org.apache.hc.core5.http.ContentType
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
import java.io.ByteArrayInputStream

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
            val htmlContent =
                removeElementByIdFromString(
                    html,
                    "headerfooter",
                )!!.html().toHtmlResource("index")
            val header =
                getElementByIdFromString(
                    html,
                    "headerfooter",
                )!!.html().toHtmlResource("header")
            val footer =
                getElementByIdFromString(
                    html,
                    "headerfooter",
                )!!.html().toHtmlResource("footer")
            val formParams: MultiValueMap<String, Any> = LinkedMultiValueMap()
            formParams.add("files", htmlContent)
            formParams.add("files", header)
            formParams.add("files", footer)
            formParams.add("pdfa", "PDF/A-3b")
//            formParams.add("pdfua", "false")
            formParams.add("emulatedMediaType", "print")
            formParams.add("preferCssPageSize", "true")
            formParams.add("marginTop", "40px")
            formParams.add("marginLeft", "40px")
            formParams.add("scale", "1.5")

            val requestEntity = HttpEntity(formParams, headers)
            restTemplate.postForEntity<ByteArray>(url, requestEntity).body
        } catch (e: Exception) {
            log.error(e) { "Det skjedde en feil ved henting av dokumentmal fra url $url" }
            null
        }

    fun String.toHtmlResource(name: String) =
        object : ByteArrayResource(toByteArray()) {
            override fun getFilename(): String = "$name.html"
        }

    fun removeElementByIdFromString(
        htmlString: String,
        elementId: String,
    ): Element? {
        val document: Document = Jsoup.parse(htmlString)
        while (document.getElementById(elementId) != null) {
            document.getElementById(elementId)?.remove()
        }
        return document
    }

    fun getElementByIdFromString(
        htmlString: String,
        elementId: String,
    ): Element? {
        val document: Document = Jsoup.parse(htmlString)
        return document.getElementById(elementId)
    }
}

internal class KnownSizeInputStreamBody(
    val input: ByteArray?,
    contentType: ContentType? = ContentType.DEFAULT_BINARY,
) : InputStreamBody(ByteArrayInputStream(input), contentType) {
    override fun getContentLength(): Long = input?.size?.toLong() ?: 0

    override fun getFilename(): String = "index.html"
}
