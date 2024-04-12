package no.nav.bidrag.dokument.produksjon

import io.github.oshai.kotlinlogging.KotlinLogging
import org.springframework.boot.actuate.autoconfigure.security.servlet.ManagementWebSecurityAutoConfiguration
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration
import org.springframework.boot.runApplication

private val log = KotlinLogging.logger {}

val SIKKER_LOGG = KotlinLogging.logger("secureLogger")

@SpringBootApplication(
    exclude = [SecurityAutoConfiguration::class, ManagementWebSecurityAutoConfiguration::class],
)
class App

fun main(args: Array<String>) {
    try {
        runApplication<App>(*args)
    } catch (e: Exception) {
        log.error(e) { "Feil ved oppstart av applikasjon" }
    } catch (e: Error) {
        log.error(e) { "Feil ved oppstart av applikasjon" }
    }
}
