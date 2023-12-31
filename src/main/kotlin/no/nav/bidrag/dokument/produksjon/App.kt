package no.nav.bidrag.dokument.produksjon

import io.github.oshai.kotlinlogging.KotlinLogging
import org.springframework.boot.actuate.autoconfigure.security.servlet.ManagementWebSecurityAutoConfiguration
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration
import org.springframework.boot.runApplication
val SIKKER_LOGG = KotlinLogging.logger("secureLogger")

@SpringBootApplication(
    exclude = [SecurityAutoConfiguration::class, ManagementWebSecurityAutoConfiguration::class]
)
class App

fun main(args: Array<String>) {

    runApplication<App>(*args)
}
