package no.nav.bidrag.dokument.produksjon

import com.fasterxml.jackson.databind.ObjectMapper
import com.github.jknack.handlebars.Helper
import io.swagger.v3.oas.annotations.OpenAPIDefinition
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType
import io.swagger.v3.oas.annotations.info.Info
import io.swagger.v3.oas.annotations.security.SecurityRequirement
import io.swagger.v3.oas.annotations.security.SecurityScheme
import no.nav.bidrag.commons.web.DefaultCorsFilter
import no.nav.bidrag.commons.web.UserMdcFilter
import no.nav.pdfgen.core.Environment
import no.nav.pdfgen.core.PDFGenCore
import no.nav.pdfgen.core.PDFGenResource
import org.springframework.boot.actuate.autoconfigure.security.servlet.ManagementWebSecurityAutoConfiguration
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration
import org.springframework.boot.runApplication
import org.springframework.context.annotation.EnableAspectJAutoProxy
import org.springframework.context.annotation.Import
import org.verapdf.gf.foundry.VeraGreenfieldFoundryProvider
val objectmapper = ObjectMapper().findAndRegisterModules()

@SpringBootApplication(exclude = [SecurityAutoConfiguration::class, ManagementWebSecurityAutoConfiguration::class])
class App

fun main(args: Array<String>) {
    System.setProperty("sun.java2d.cmm", "sun.java2d.cmm.kcms.KcmsServiceProvider")
    VeraGreenfieldFoundryProvider.initialise()
    val environment = no.nav.bidrag.dokument.produksjon.Environment()
    PDFGenCore.init(
        Environment(
            additionalHandlebarHelpers = mapOf(
                "enum_to_readable" to Helper<String> { context, _ ->
                    when (context) {
                        "BIDRAGSMOTTAKER" -> "Bidragsmottaker"
                        else -> ""
                    }
                },
            ),
            templateRoot = PDFGenResource("templates/"),
            resourcesRoot = PDFGenResource("resources/"),
            dataRoot = PDFGenResource("data/"),
        ),
    )
    runApplication<App>(*args)
}
