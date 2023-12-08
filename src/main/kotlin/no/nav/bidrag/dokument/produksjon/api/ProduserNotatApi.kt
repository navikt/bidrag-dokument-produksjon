package no.nav.bidrag.dokument.produksjon.api

import io.github.oshai.kotlinlogging.KotlinLogging
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.media.ExampleObject
import io.swagger.v3.oas.annotations.parameters.RequestBody
import io.swagger.v3.oas.models.examples.Example
import java.nio.file.Paths
import kotlin.io.path.readText
import no.nav.bidrag.dokument.produksjon.dto.NotatDto
import no.nav.bidrag.dokument.produksjon.util.getObjectmapper
import org.springframework.context.annotation.Bean
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

private val log = KotlinLogging.logger {}

@RestController
@RequestMapping("/api/notat")
class ProduserNotatApi {

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
        payload: NotatDto
    ): ResponseEntity<*> {
        return generatePDFResponse(
            "notat",
            dokumentmal,
            getObjectmapper().writeValueAsString(payload)
        )
    }

    @PostMapping("/html/{dokumentmal}")
    fun generateHTML(
        @Parameter(name = "dokumentmal", example = "forskudd") @PathVariable dokumentmal: String,
        @org.springframework.web.bind.annotation.RequestBody payload: NotatDto
    ): ResponseEntity<String> {
        return generateHTMLResponse(
            "notat",
            dokumentmal,
            getObjectmapper().writeValueAsString(payload)
        )
    }
}
