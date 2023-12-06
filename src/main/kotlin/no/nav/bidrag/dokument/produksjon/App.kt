package no.nav.bidrag.dokument.produksjon

import org.springframework.boot.actuate.autoconfigure.security.servlet.ManagementWebSecurityAutoConfiguration
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication(exclude = [ManagementWebSecurityAutoConfiguration::class])
class App

fun main(args: Array<String>) {

    runApplication<App>(*args)
}
