package no.nav.bidrag.dokument.produksjon

import org.springframework.boot.SpringApplication
import org.springframework.boot.actuate.autoconfigure.security.servlet.ManagementWebSecurityAutoConfiguration
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration

@SpringBootApplication(
    exclude = [SecurityAutoConfiguration::class, ManagementWebSecurityAutoConfiguration::class],
)
class AppLocal

fun main(args: Array<String>) {
    val app = SpringApplication(AppLocal::class.java)
    app.setAdditionalProfiles("local", "nais", "Lokal-nais-secrets")
    app.run(*args)
}
