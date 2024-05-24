package no.nav.bidrag.dokument.produksjon.consumer

import io.github.oshai.kotlinlogging.KotlinLogging
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.http.HttpHeaders
import org.springframework.stereotype.Component
import org.springframework.web.client.RestTemplate
import org.springframework.web.client.postForEntity

private val log = KotlinLogging.logger {}

@Component
class BidragDokumentmalConsumer(
    @Value("\${bidrag-dokumentmal.url}") private val url: String,
) {
    fun hentDokumentmal(
        category: String,
        type: String,
        payload: String,
        renderforpdf: Boolean = true,
    ): String? {
        return try {
            val malUrl = "$url/$category/$type"
            val restTemplate: RestTemplate =
                RestTemplateBuilder()
                    .defaultHeader(HttpHeaders.CONTENT_TYPE, "application/json; charset=utf-8")
                    .defaultHeader("renderforpdf", renderforpdf.toString())
                    .build()
            restTemplate.postForEntity<String>(malUrl, payload).body!!
        } catch (e: Exception) {
            log.error(e) { "Det skjedde en feil ved henting av dokumentmal fra url $url" }
            null
        }
    }
}
