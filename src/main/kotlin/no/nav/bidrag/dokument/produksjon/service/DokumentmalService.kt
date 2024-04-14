package no.nav.bidrag.dokument.produksjon.service

import no.nav.bidrag.commons.service.AppContext
import no.nav.bidrag.commons.util.secureLogger
import no.nav.bidrag.dokument.produksjon.consumer.BidragDokumentmalConsumer

fun genererHtml(
    category: String,
    type: String,
    payload: String,
): String? =
    try {
        AppContext.getBean(
            BidragDokumentmalConsumer::class.java,
        ).hentDokumentmal(category, type, payload)
    } catch (e: Exception) {
        secureLogger.debug(e) {
            "Feil ved henting av dokumentmal for kategory $category og type $type med data $payload"
        }
        null
    }
