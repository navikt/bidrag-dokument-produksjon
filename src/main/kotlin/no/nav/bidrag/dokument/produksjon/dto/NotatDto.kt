package no.nav.bidrag.dokument.produksjon.dto

import no.nav.bidrag.domene.enums.beregning.Resultatkode
import no.nav.bidrag.domene.enums.inntekt.Inntektsrapportering
import no.nav.bidrag.domene.enums.inntekt.Inntektstype
import no.nav.bidrag.domene.enums.person.Bostatuskode
import no.nav.bidrag.domene.enums.person.Sivilstandskode
import no.nav.bidrag.domene.enums.rolle.Rolletype
import no.nav.bidrag.domene.enums.rolle.SøktAvType
import no.nav.bidrag.domene.enums.vedtak.VirkningstidspunktÅrsakstype
import no.nav.bidrag.domene.ident.Personident
import no.nav.bidrag.domene.tid.ÅrMånedsperiode
import no.nav.bidrag.transport.behandling.felles.grunnlag.DelberegningSumInntekt
import java.math.BigDecimal
import java.time.LocalDate
import java.time.YearMonth

data class NotatDto(
    val saksnummer: String,
    val saksbehandlerNavn: String?,
    val virkningstidspunkt: Virkningstidspunkt,
    val boforhold: Boforhold,
    val roller: List<RolleNotatDto>,
    val inntekter: Inntekter,
    val vedtak: List<Vedtak>,
)

data class Virkningstidspunkt(
    val søknadstype: String?,
    val søktAv: SøktAvType?,
    val mottattDato: YearMonth?,
    val søktFraDato: YearMonth?,
    val virkningstidspunkt: LocalDate?,
    val årsak: VirkningstidspunktÅrsakstype?,
    val avslag: Resultatkode?,
    val notat: Notat,
)

data class Notat(
    val medIVedtaket: String?,
    val intern: String?,
)

data class Boforhold(
    val barn: List<BoforholdBarn> = emptyList(),
    val sivilstand: SivilstandNotat,
    val notat: Notat,
)

data class SivilstandNotat(
    val opplysningerFraFolkeregisteret: List<OpplysningerFraFolkeregisteret<Sivilstandskode>> =
        emptyList(),
    val opplysningerBruktTilBeregning: List<OpplysningerBruktTilBeregning<Sivilstandskode>> =
        emptyList(),
)

data class BoforholdBarn(
    val navn: String,
    val fødselsdato: LocalDate?,
    val opplysningerFraFolkeregisteret: List<OpplysningerFraFolkeregisteret<Bostatuskode>> =
        emptyList(),
    val opplysningerBruktTilBeregning: List<OpplysningerBruktTilBeregning<Bostatuskode>> =
        emptyList(),
)

data class OpplysningerFraFolkeregisteret<T>(
    val periode: ÅrMånedsperiode,
    val status: T?,
)

data class OpplysningerBruktTilBeregning<T>(
    val periode: ÅrMånedsperiode,
    val status: T,
    val kilde: Kilde,
)

data class RolleNotatDto(
    val rolle: Rolletype,
    val navn: String?,
    val fødselsdato: LocalDate?,
    val personident: Personident?,
)

data class Inntekter(
    val inntekterPerRolle: List<InntekterPerRolle>,
    val notat: Notat,
)

data class InntekterPerRolle(
    val rolle: RolleNotatDto,
    val arbeidsforhold: List<Arbeidsforhold>,
    val årsinntekter: List<NotatInntektDto>,
    val barnetillegg: List<NotatInntektDto>,
    val utvidetBarnetrygd: List<NotatInntektDto>,
    val småbarnstillegg: List<NotatInntektDto>,
    val kontantstøtte: List<NotatInntektDto>,
    val beregnetInntekter: List<NotatBeregnetInntektDto>,
)

data class NotatBeregnetInntektDto(
    val gjelderBarn: RolleNotatDto,
    val summertInntektListe: List<DelberegningSumInntekt>,
)

data class Arbeidsforhold(
    val periode: ÅrMånedsperiode,
    val arbeidsgiver: String,
    val stillingProsent: String?,
    val lønnsendringDato: LocalDate?,
)

data class NotatInntektDto(
    val periode: ÅrMånedsperiode,
    val opprinneligPeriode: ÅrMånedsperiode?,
    val beløp: BigDecimal,
    val kilde: Kilde = Kilde.OFFENTLIG,
    val visningsnavn: String? = null,
    val type: Inntektsrapportering,
    val medIBeregning: Boolean = false,
    val gjelderBarn: RolleNotatDto?,
    val inntektsposter: List<NotatInntektspostDto>,
)

data class NotatInntektspostDto(
    val kode: String?,
    val visningsnavn: String?,
    val inntektstype: Inntektstype?,
    val beløp: BigDecimal,
)

data class Vedtak(
    val navn: String,
    val fødselsdato: LocalDate,
    val resultat: List<Resultat>,
)

data class Resultat(
    val type: String,
    val periode: ÅrMånedsperiode,
    val inntekt: BigDecimal,
    val sivilstand: String,
    val antallBarn: Int,
    val resultat: String,
)

enum class Kilde {
    MANUELT,
    OFFENTLIG,
}
