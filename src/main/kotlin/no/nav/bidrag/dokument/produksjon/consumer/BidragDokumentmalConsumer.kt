package no.nav.bidrag.dokument.produksjon.consumer

import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.http.HttpHeaders
import org.springframework.stereotype.Component
import org.springframework.web.client.RestTemplate
import org.springframework.web.client.postForEntity

@Component
class BidragDokumentmalConsumer(
    @Value("\${bidrag-dokumentmal.url}") private val url: String,
) {
    fun hentDokumentmal(
        category: String,
        type: String,
        payload: String,
    ): String? {
        return try {
            val malUrl = "$url/$category/$type"
            val restTemplate: RestTemplate =
                RestTemplateBuilder()
                    .defaultHeader(HttpHeaders.CONTENT_TYPE, "application/json; charset=utf-8")
                    .build()
            restTemplate.postForEntity<String>(malUrl, payload).body!!
        } catch (e: Exception) {
            null
        }
    }
}
