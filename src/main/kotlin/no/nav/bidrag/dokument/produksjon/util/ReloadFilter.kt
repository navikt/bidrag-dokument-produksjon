package no.nav.bidrag.dokument.produksjon.util

import jakarta.servlet.Filter
import jakarta.servlet.FilterChain
import jakarta.servlet.ServletRequest
import jakarta.servlet.ServletResponse
import no.nav.bidrag.dokument.produksjon.Environment
import no.nav.pdfgen.core.PDFGenCore
import org.springframework.stereotype.Component

@Component
class ReloadFilter : Filter {
    override fun doFilter(
        request: ServletRequest,
        response: ServletResponse,
        chain: FilterChain,
    ) {
        if (Environment().isDevMode) PDFGenCore.reloadEnvironment()
        chain.doFilter(request, response)
    }
}
