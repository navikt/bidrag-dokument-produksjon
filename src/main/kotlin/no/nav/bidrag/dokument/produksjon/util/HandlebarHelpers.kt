package no.nav.bidrag.dokument.produksjon.util

import com.github.jknack.handlebars.Helper
import java.util.Locale
import no.nav.bidrag.domene.enums.beregning.ResultatkodeForskudd
import no.nav.bidrag.domene.enums.inntekt.Inntektsrapportering
import no.nav.bidrag.domene.enums.person.Bostatuskode
import no.nav.bidrag.domene.enums.person.Sivilstandskode
import no.nav.bidrag.domene.enums.rolle.SøktAvType
import no.nav.bidrag.domene.util.visningsnavn

fun handlebarEnumMapper(): Pair<String, Helper<Any>> =
    "enum_to_readable" to
        Helper<Any> { context, _ ->
            return@Helper when (val enum = context?.toEnum) {
                is Bostatuskode -> enum.visningsnavn.intern
                is Inntektsrapportering -> enum.visningsnavn.intern
                is ResultatkodeForskudd -> enum.visningsnavn.intern
                is Sivilstandskode -> enum.visningsnavn.intern
                is SøktAvType ->
                    enum.name.lowercase().replaceFirstChar {
                        if (it.isLowerCase()) it.titlecase(Locale.getDefault()) else it.toString()
                    }
                else -> null
            }
        }

val Any.toEnum
    get() =
        if (this is String)
            toEnum<Sivilstandskode>(this)
                ?: toEnum<Bostatuskode>(this) ?: toEnum<Inntektsrapportering>(this)
                    ?: toEnum<ResultatkodeForskudd>(this) ?: toEnum<SøktAvType>(this)
        else null

inline fun <reified T : Enum<T>> toEnum(enumStr: String): T? {
    return try {
        enumValueOf<T>(enumStr)
    } catch (e: Exception) {
        null
    }
}
