package no.nav.bidrag.dokument.produksjon

import com.fasterxml.jackson.databind.ObjectMapper
import io.swagger.v3.oas.annotations.OpenAPIDefinition
import io.swagger.v3.oas.annotations.info.Info
import io.swagger.v3.oas.models.examples.Example
import no.nav.bidrag.commons.web.DefaultCorsFilter
import no.nav.bidrag.commons.web.UserMdcFilter
import no.nav.bidrag.dokument.produksjon.util.ReloadFilter
import no.nav.bidrag.dokument.produksjon.util.getObjectmapper
import no.nav.bidrag.dokument.produksjon.util.handlebarEnumMapper
import no.nav.pdfgen.core.Environment
import no.nav.pdfgen.core.PDFGenCore
import no.nav.pdfgen.core.PDFGenResource
import org.springdoc.core.customizers.OpenApiCustomizer
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.EnableAspectJAutoProxy
import org.springframework.context.annotation.Import
import org.verapdf.gf.foundry.VeraGreenfieldFoundryProvider

@Configuration
@EnableAspectJAutoProxy
@OpenAPIDefinition(info = Info(title = "bidrag-dokument-produksjon", version = "v1"))
@Import(DefaultCorsFilter::class, UserMdcFilter::class, ReloadFilter::class)
class Configuration {
    init {
        System.setProperty("sun.java2d.cmm", "sun.java2d.cmm.kcms.KcmsServiceProvider")
        VeraGreenfieldFoundryProvider.initialise()
        val environment = no.nav.bidrag.dokument.produksjon.Environment()
        PDFGenCore.init(
            Environment(
                additionalHandlebarHelpers = mapOf(handlebarEnumMapper()),
                templateRoot = PDFGenResource("templates/"),
                resourcesRoot = PDFGenResource("resources/"),
                dataRoot = PDFGenResource("data/"),
            ),
        )
    }

    @Bean
    fun openApiCustomiser(examples: Collection<Example>): OpenApiCustomizer {
        return OpenApiCustomizer { openAPI ->
            examples.forEach { example ->
                openAPI.components.addExamples(example.description, example)
            }
        }
    }

    @Bean fun objectMapper(): ObjectMapper = getObjectmapper()
}
