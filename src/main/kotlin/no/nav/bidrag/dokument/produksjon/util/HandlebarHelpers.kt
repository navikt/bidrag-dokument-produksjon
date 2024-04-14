package no.nav.bidrag.dokument.produksjon.util

import com.fasterxml.jackson.databind.JsonNode
import com.github.jknack.handlebars.Helper
import no.nav.bidrag.dokument.produksjon.dto.Kilde
import no.nav.bidrag.domene.enums.beregning.Resultatkode
import no.nav.bidrag.domene.enums.inntekt.Inntektsrapportering
import no.nav.bidrag.domene.enums.person.Bostatuskode
import no.nav.bidrag.domene.enums.person.Sivilstandskode
import no.nav.bidrag.domene.enums.rolle.SøktAvType
import no.nav.bidrag.domene.enums.vedtak.VirkningstidspunktÅrsakstype
import no.nav.bidrag.domene.util.visningsnavn
import java.math.RoundingMode
import java.util.Locale

fun divide(): Pair<String, Helper<String>> =
    "divide" to
        Helper<String> { context, options ->
            if (context == null) return@Helper ""
            val value = context.toBigDecimalOrNull() ?: return@Helper ""
            val factor = options.param(0, 1.0)
            (value / factor.toBigDecimal()).setScale(0, RoundingMode.HALF_UP)
        }

fun multiply(): Pair<String, Helper<String>> =
    "multiply" to
        Helper<String> { context, options ->
            if (context == null) return@Helper ""
            val value = context.toBigDecimalOrNull() ?: return@Helper ""
            val factor = options.param(0, 1)
            value.multiply(factor.toBigDecimal())
        }

fun groupBy(): Pair<String, Helper<Iterable<Any>>> =
    "groupBy" to
        Helper<Iterable<Any>> { list, options ->
            val groupByField = options.param(0, null as String?)
            val context: MutableList<Pair<Any, List<Any>>> = mutableListOf()
            if (list is JsonNode) {
                list.groupBy { node ->
                    getParameterValue(
                        node,
                        groupByField,
                    )
                }.forEach {
                    context.add(
                        getParameterValueAsObject(
                            it.value.first(),
                            groupByField,
                        ) to it.value,
                    )
                }
            } else {
                return@Helper options.inverse()
            }

            context.map { (key, value) ->
                options.fn(
                    mutableMapOf<Any, Any>().apply {
                        put("key", key)
                        put("value", value)
                    },
                )
            }.joinToString("")
        }

private fun getParameterValue(
    jsonNode: JsonNode,
    parameterPathString: String?,
): String {
    val parameterPath = parameterPathString?.split(".") ?: emptyList()
    var tempJsonNode = jsonNode
    parameterPath.forEach { parameter -> tempJsonNode = tempJsonNode.get(parameter) }
    return if (tempJsonNode.asText().isEmpty()) {
        tempJsonNode.toString()
    } else {
        tempJsonNode.asText()
    }
}

private fun getParameterValueAsObject(
    jsonNode: JsonNode,
    parameterPathString: String?,
): JsonNode {
    val parameterPath = parameterPathString?.split(".") ?: emptyList()
    var tempJsonNode = jsonNode
    parameterPath.forEach { parameter -> tempJsonNode = tempJsonNode.get(parameter) }
    return tempJsonNode
}

fun handlebarEnumMapper(): Pair<String, Helper<Any>> =
    "enum_to_readable" to
        Helper<Any> { context, _ ->
            return@Helper when (val enum = context?.toEnum) {
                is Bostatuskode -> enum.visningsnavn.intern
                is Inntektsrapportering -> enum.visningsnavn.intern
                is Resultatkode -> enum.visningsnavn.intern
                is Sivilstandskode -> enum.visningsnavn.intern
                is Kilde -> enum.name.lowercase().replaceFirstChar { it.uppercase() }
                is VirkningstidspunktÅrsakstype -> enum.visningsnavn.intern
                is SøktAvType ->
                    enum.name.lowercase().replaceFirstChar {
                        if (it.isLowerCase()) it.titlecase(Locale.getDefault()) else it.toString()
                    }
                else -> null
            }
        }

val Any.toEnum
    get() =
        if (this is String) {
            toEnum<Sivilstandskode>(this)
                ?: toEnum<Bostatuskode>(this) ?: toEnum<Inntektsrapportering>(this)
                ?: toEnum<Resultatkode>(this) ?: toEnum<SøktAvType>(this)
                ?: toEnum<VirkningstidspunktÅrsakstype>(this) ?: toEnum<Kilde>(this)
        } else {
            null
        }

inline fun <reified T : Enum<T>> toEnum(enumStr: String): T? {
    return try {
        enumValueOf<T>(enumStr)
    } catch (e: Exception) {
        null
    }
}
