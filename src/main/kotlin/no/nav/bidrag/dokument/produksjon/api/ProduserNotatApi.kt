package no.nav.bidrag.dokument.produksjon.api

import io.github.oshai.kotlinlogging.KotlinLogging
import io.github.smiley4.ktorswaggerui.dsl.post
import io.ktor.server.application.call
import io.ktor.server.routing.Routing
import io.ktor.server.routing.route
import no.nav.bidrag.dokument.produksjon.Environment
import no.nav.bidrag.dokument.produksjon.dto.NotatDto
import java.nio.file.Paths
import kotlin.io.path.readText

private val log = KotlinLogging.logger {}

fun Routing.setupProduserNotatApi() {
    route("/api/notat/genpdf") {
        post(
            "/{dokumentmal}",
            {
                request {
                    pathParameter<String>("dokumentmal") {
                        example = "forskudd"
                    }
                    body<NotatDto> {
                        example("Forskudd", Paths.get("data/notat/forskudd.json").readText())
                    }
                }
            },
        ) {
            generateHTMLResponse("notat", call.template, call)
        }
    }
    route("/api/notat/genhtml") {
        post(
            "/{template}",
            {
                request {
                    pathParameter<String>("dokumentmal") {
                        example = "forskudd"
                    }
                    body<NotatDto> {
                        example("Forskudd", Paths.get("data/notat/forskudd.json").readText())
                    }
                }
            },
        ) {
            generateHTMLResponse("notat", call.template, call)
        }
    }
}
