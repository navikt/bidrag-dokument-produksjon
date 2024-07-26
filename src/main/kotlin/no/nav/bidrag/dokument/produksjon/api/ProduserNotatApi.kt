package no.nav.bidrag.dokument.produksjon.api

import io.github.oshai.kotlinlogging.KotlinLogging
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.models.examples.Example
import no.nav.bidrag.dokument.produksjon.SIKKER_LOGG
import no.nav.bidrag.dokument.produksjon.consumer.BidragDokumentmalConsumer
import no.nav.bidrag.dokument.produksjon.util.getObjectmapper
import no.nav.bidrag.transport.felles.commonObjectmapper
import no.nav.bidrag.transport.notat.NotatDto
import org.springframework.context.annotation.Bean
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.nio.file.Paths
import kotlin.io.path.readText

private val log = KotlinLogging.logger {}

@RestController
@RequestMapping("/api/notat")
class ProduserNotatApi(
    val bidragDokumentmalConsumer: BidragDokumentmalConsumer,
) {
    @Bean
    fun notatForskuddExample(): Example {
        val example = Example()
        example.value = Paths.get("data/notat/forskudd.json").readText()
        example.description = "Forskudd notat"
        return example
    }

    @PostMapping("/pdf/{dokumentmal}")
    fun generatePDF(
        @Parameter(name = "dokumentmal", example = "forskudd") @PathVariable dokumentmal: String,
        @org.springframework.web.bind.annotation.RequestBody payload: NotatDto,
    ): ResponseEntity<ByteArray> {
        log.info { "Produserer notat PDF 2 for dokumentmal $dokumentmal" }
        return generatePDFResponse2(
            bidragDokumentmalConsumer,
            "notat",
            dokumentmal,
            getObjectmapper().writeValueAsString(payload),
        )
    }

    @PostMapping("/html/{dokumentmal}")
    fun generateHTML(
        @Parameter(name = "dokumentmal", example = "forskudd") @PathVariable dokumentmal: String,
        @org.springframework.web.bind.annotation.RequestBody payload: NotatDto,
    ): ResponseEntity<String> {
        SIKKER_LOGG.info { "Produserer notat HTML for dokumentmal $dokumentmal for input $payload" }
        log.info { "Produserer notat HTML for dokumentmal $dokumentmal" }
        return generateHTMLResponse2(
            bidragDokumentmalConsumer,
            "notat",
            dokumentmal,
            getObjectmapper().writeValueAsString(payload),
        )
    }
}

@RestController
@RequestMapping("/api/v2/notat")
class ProduserNotatApiV2(
    val bidragDokumentmalConsumer: BidragDokumentmalConsumer,
) {
    @Bean
    fun notatForskuddExampleV2(): Example {
        val example = Example()
        example.value = Paths.get("data/notat/forskudd.json").readText()
        example.description = "Forskudd notat"
        return example
    }

    @PostMapping("/pdf")
    fun generatePDF(
        @org.springframework.web.bind.annotation.RequestBody payload: NotatDto,
    ): ResponseEntity<ByteArray> {
        log.info { "Produserer notat PDF 2 for dokumentmal ${payload.type}" }
        return generatePDFResponseV2(
            bidragDokumentmalConsumer,
            "notat",
            payload.type,
            commonObjectmapper.writeValueAsString(payload),
        )
    }

    @PostMapping("/html")
    fun generateHTML(
        @Parameter(name = "dokumentmal", example = "forskudd")
        @org.springframework.web.bind.annotation.RequestBody payload: NotatDto,
    ): ResponseEntity<String> {
        SIKKER_LOGG.info {
            "Produserer notat HTML for dokumentmal ${payload.type} for input $payload"
        }
        log.info { "Produserer notat HTML for dokumentmal ${payload.type}" }
        return generateHTMLResponseV2(
            bidragDokumentmalConsumer,
            "notat",
            payload.type,
            getObjectmapper().writeValueAsString(payload),
        )
    }
}
