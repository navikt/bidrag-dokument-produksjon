package no.nav.bidrag.dokument.produksjon.consumer

import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.http.HttpHeaders
import org.springframework.web.client.RestTemplate
import org.springframework.web.client.postForEntity

class BidragDokumentmalConsumer {
    val url = "http://localhost:3000"

    fun hentDokumentmal(
        category: String,
        type: String,
        payload: String,
    ): String {
        val malUrl = "$url/$category/$type"
        val restTemplate: RestTemplate =
            RestTemplateBuilder()
                .defaultHeader(HttpHeaders.CONTENT_TYPE, "application/json; charset=utf-8")
                .build()
        return restTemplate.postForEntity<String>(malUrl, payload).body!!
    }
}