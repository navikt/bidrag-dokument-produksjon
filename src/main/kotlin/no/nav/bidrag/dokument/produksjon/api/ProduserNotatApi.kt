package no.nav.bidrag.dokument.produksjon.api

import io.github.oshai.kotlinlogging.KotlinLogging
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.media.ExampleObject
import io.swagger.v3.oas.annotations.parameters.RequestBody
import io.swagger.v3.oas.models.examples.Example
import no.nav.bidrag.dokument.produksjon.SIKKER_LOGG
import no.nav.bidrag.dokument.produksjon.consumer.BidragDokumentmalConsumer
import no.nav.bidrag.dokument.produksjon.dto.NotatDto
import no.nav.bidrag.dokument.produksjon.util.getObjectmapper
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
class ProduserNotatApi(val bidragDokumentmalConsumer: BidragDokumentmalConsumer) {
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
        @RequestBody(
            content =
                [
                    Content(
                        examples =
                            [
                                ExampleObject(
                                    ref = "#/components/examples/Forskudd notat",
                                    name = "Forskudd",
                                ),
                            ],
                    ),
                ],
        )
        payload: NotatDto,
    ): ResponseEntity<*> {
        log.info { "Produserer notat PDF for dokumentmal $dokumentmal" }
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
