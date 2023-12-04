package no.nav.bidrag.dokument.produksjon

import io.swagger.v3.oas.annotations.OpenAPIDefinition
import io.swagger.v3.oas.annotations.info.Info
import io.swagger.v3.oas.models.examples.Example
import no.nav.bidrag.commons.web.DefaultCorsFilter
import no.nav.bidrag.commons.web.UserMdcFilter
import org.springdoc.core.customizers.OpenApiCustomizer
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.EnableAspectJAutoProxy
import org.springframework.context.annotation.Import

@Configuration
@EnableAspectJAutoProxy
@OpenAPIDefinition(info = Info(title = "bidrag-dokument-produksjon", version = "v1"))
@Import(DefaultCorsFilter::class, UserMdcFilter::class)
class Configuration {
    @Bean
    fun openApiCustomiser(examples: Collection<Example>): OpenApiCustomizer {
        return OpenApiCustomizer { openAPI ->
            examples.forEach { example ->
                openAPI.components.addExamples(example.description, example)
            }
        }
    }
}
