/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Arbeidsforhold {
  periode: TypeArManedsperiode;
  arbeidsgiver: string;
  stillingProsent?: string;
  /** @format date */
  lønnsendringDato?: string;
}

export interface Boforhold {
  barn: BoforholdBarn[];
  sivilstand: SivilstandNotat;
  notat: Notat;
}

export interface BoforholdBarn {
  gjelder: PersonNotatDto;
  medIBehandling: boolean;
  kilde: Kilde;
  opplysningerFraFolkeregisteret: OpplysningerFraFolkeregisteretBostatuskode[];
  opplysningerBruktTilBeregning: OpplysningerBruktTilBeregningBostatuskode[];
}

export enum Bostatuskode {
  MED_FORELDER = "MED_FORELDER",
  DOKUMENTERT_SKOLEGANG = "DOKUMENTERT_SKOLEGANG",
  IKKE_MED_FORELDER = "IKKE_MED_FORELDER",
  MED_VERGE = "MED_VERGE",
  ALENE = "ALENE",
  DELT_BOSTED = "DELT_BOSTED",
  REGNES_IKKE_SOM_BARN = "REGNES_IKKE_SOM_BARN",
}

export interface DelberegningSumInntekt {
  periode: TypeArManedsperiode;
  totalinntekt: number;
  kontantstøtte?: number;
  skattepliktigInntekt?: number;
  barnetillegg?: number;
  utvidetBarnetrygd?: number;
  småbarnstillegg?: number;
}

export interface Inntekter {
  inntekterPerRolle: InntekterPerRolle[];
  notat: Notat;
}

export interface InntekterPerRolle {
  gjelder: PersonNotatDto;
  arbeidsforhold: Arbeidsforhold[];
  årsinntekter: NotatInntektDto[];
  barnetillegg: NotatInntektDto[];
  utvidetBarnetrygd: NotatInntektDto[];
  småbarnstillegg: NotatInntektDto[];
  kontantstøtte: NotatInntektDto[];
  beregnetInntekter: NotatBeregnetInntektDto[];
}

export enum Inntektsrapportering {
  AINNTEKT = "AINNTEKT",
  AINNTEKTBEREGNET3MND = "AINNTEKT_BEREGNET_3MND",
  AINNTEKTBEREGNET12MND = "AINNTEKT_BEREGNET_12MND",
  AINNTEKTBEREGNET3MNDFRAOPPRINNELIGVEDTAKSTIDSPUNKT = "AINNTEKT_BEREGNET_3MND_FRA_OPPRINNELIG_VEDTAKSTIDSPUNKT",
  AINNTEKTBEREGNET12MNDFRAOPPRINNELIGVEDTAKSTIDSPUNKT = "AINNTEKT_BEREGNET_12MND_FRA_OPPRINNELIG_VEDTAKSTIDSPUNKT",
  AINNTEKTBEREGNET3MNDFRAOPPRINNELIGVEDTAK = "AINNTEKT_BEREGNET_3MND_FRA_OPPRINNELIG_VEDTAK",
  AINNTEKTBEREGNET12MNDFRAOPPRINNELIGVEDTAK = "AINNTEKT_BEREGNET_12MND_FRA_OPPRINNELIG_VEDTAK",
  KAPITALINNTEKT = "KAPITALINNTEKT",
  LIGNINGSINNTEKT = "LIGNINGSINNTEKT",
  KONTANTSTOTTE = "KONTANTSTØTTE",
  SMABARNSTILLEGG = "SMÅBARNSTILLEGG",
  UTVIDET_BARNETRYGD = "UTVIDET_BARNETRYGD",
  AAP = "AAP",
  DAGPENGER = "DAGPENGER",
  FORELDREPENGER = "FORELDREPENGER",
  INTRODUKSJONSSTONAD = "INTRODUKSJONSSTØNAD",
  KVALIFISERINGSSTONAD = "KVALIFISERINGSSTØNAD",
  OVERGANGSSTONAD = "OVERGANGSSTØNAD",
  PENSJON = "PENSJON",
  SYKEPENGER = "SYKEPENGER",
  BARNETILLEGG = "BARNETILLEGG",
  BARNETILSYN = "BARNETILSYN",
  PERSONINNTEKT_EGNE_OPPLYSNINGER = "PERSONINNTEKT_EGNE_OPPLYSNINGER",
  KAPITALINNTEKT_EGNE_OPPLYSNINGER = "KAPITALINNTEKT_EGNE_OPPLYSNINGER",
  SAKSBEHANDLER_BEREGNET_INNTEKT = "SAKSBEHANDLER_BEREGNET_INNTEKT",
  LONNMANUELTBEREGNET = "LØNN_MANUELT_BEREGNET",
  NAeRINGSINNTEKTMANUELTBEREGNET = "NÆRINGSINNTEKT_MANUELT_BEREGNET",
  YTELSE_FRA_OFFENTLIG_MANUELT_BEREGNET = "YTELSE_FRA_OFFENTLIG_MANUELT_BEREGNET",
  AINNTEKT_KORRIGERT_BARNETILLEGG = "AINNTEKT_KORRIGERT_BARNETILLEGG",
  BARNETRYGD_MANUELL_VURDERING = "BARNETRYGD_MANUELL_VURDERING",
  BARNS_SYKDOM = "BARNS_SYKDOM",
  DOKUMENTASJONMANGLERSKJONN = "DOKUMENTASJON_MANGLER_SKJØNN",
  FORDELSKATTEKLASSE2 = "FORDEL_SKATTEKLASSE2",
  FORDELSAeRFRADRAGENSLIGFORSORGER = "FORDEL_SÆRFRADRAG_ENSLIG_FORSØRGER",
  FODSELADOPSJON = "FØDSEL_ADOPSJON",
  INNTEKTSOPPLYSNINGER_ARBEIDSGIVER = "INNTEKTSOPPLYSNINGER_ARBEIDSGIVER",
  KAPITALINNTEKT_SKE = "KAPITALINNTEKT_SKE",
  LIGNINGSOPPLYSNINGER_MANGLER = "LIGNINGSOPPLYSNINGER_MANGLER",
  LIGNING_SKE = "LIGNING_SKE",
  LONNSKE = "LØNN_SKE",
  LONNSKEKORRIGERTBARNETILLEGG = "LØNN_SKE_KORRIGERT_BARNETILLEGG",
  LONNTREKK = "LØNN_TREKK",
  MANGLENDEBRUKEVNESKJONN = "MANGLENDE_BRUK_EVNE_SKJØNN",
  NETTO_KAPITALINNTEKT = "NETTO_KAPITALINNTEKT",
  PENSJON_KORRIGERT_BARNETILLEGG = "PENSJON_KORRIGERT_BARNETILLEGG",
  REHABILITERINGSPENGER = "REHABILITERINGSPENGER",
  SKATTEGRUNNLAG_KORRIGERT_BARNETILLEGG = "SKATTEGRUNNLAG_KORRIGERT_BARNETILLEGG",
  SKATTEGRUNNLAG_SKE = "SKATTEGRUNNLAG_SKE",
}

export enum Inntektstype {
  AAP = "AAP",
  DAGPENGER = "DAGPENGER",
  FORELDREPENGER = "FORELDREPENGER",
  INTRODUKSJONSSTONAD = "INTRODUKSJONSSTØNAD",
  KVALIFISERINGSSTONAD = "KVALIFISERINGSSTØNAD",
  OVERGANGSSTONAD = "OVERGANGSSTØNAD",
  PENSJON = "PENSJON",
  SYKEPENGER = "SYKEPENGER",
  KONTANTSTOTTE = "KONTANTSTØTTE",
  SMABARNSTILLEGG = "SMÅBARNSTILLEGG",
  UTVIDET_BARNETRYGD = "UTVIDET_BARNETRYGD",
  KAPITALINNTEKT = "KAPITALINNTEKT",
  LONNSINNTEKT = "LØNNSINNTEKT",
  NAeRINGSINNTEKT = "NÆRINGSINNTEKT",
  BARNETILSYN = "BARNETILSYN",
  BARNETILLEGG_PENSJON = "BARNETILLEGG_PENSJON",
  BARNETILLEGGUFORETRYGD = "BARNETILLEGG_UFØRETRYGD",
  BARNETILLEGG_DAGPENGER = "BARNETILLEGG_DAGPENGER",
  BARNETILLEGGKVALIFISERINGSSTONAD = "BARNETILLEGG_KVALIFISERINGSSTØNAD",
  BARNETILLEGG_AAP = "BARNETILLEGG_AAP",
  BARNETILLEGG_DNB = "BARNETILLEGG_DNB",
  BARNETILLEGG_NORDEA = "BARNETILLEGG_NORDEA",
  BARNETILLEGG_STOREBRAND = "BARNETILLEGG_STOREBRAND",
  BARNETILLEGG_KLP = "BARNETILLEGG_KLP",
  BARNETILLEGG_SPK = "BARNETILLEGG_SPK",
}

export enum Kilde {
  MANUELL = "MANUELL",
  OFFENTLIG = "OFFENTLIG",
}

export interface Notat {
  medIVedtaket?: string;
  intern?: string;
}

export interface NotatBeregnetInntektDto {
  gjelderBarn: PersonNotatDto;
  summertInntektListe: DelberegningSumInntekt[];
}

export interface NotatDto {
  saksnummer: string;
  saksbehandlerNavn?: string;
  virkningstidspunkt: Virkningstidspunkt;
  boforhold: Boforhold;
  roller: PersonNotatDto[];
  inntekter: Inntekter;
  vedtak: Vedtak;
}

export interface NotatInntektDto {
  periode?: TypeArManedsperiode;
  opprinneligPeriode?: TypeArManedsperiode;
  beløp: number;
  kilde: Kilde;
  type: Inntektsrapportering;
  medIBeregning: boolean;
  gjelderBarn?: PersonNotatDto;
  inntektsposter: NotatInntektspostDto[];
  visningsnavn: string;
}

export interface NotatInntektspostDto {
  kode?: string;
  inntektstype?: Inntektstype;
  beløp: number;
  visningsnavn?: string;
}

export interface NotatResultatBeregningBarnDto {
  barn: PersonNotatDto;
  perioder: NotatResultatPeriodeDto[];
}

export interface NotatResultatPeriodeDto {
  periode: TypeArManedsperiode;
  beløp: number;
  resultatKode: Resultatkode;
  regel: string;
  sivilstand?: Sivilstandskode;
  inntekt: number;
  /** @format int32 */
  antallBarnIHusstanden: number;
  resultatKodeVisningsnavn: string;
  sivilstandVisningsnavn?: string;
}

export interface OpplysningerBruktTilBeregningBostatuskode {
  periode: TypeArManedsperiode;
  status: Bostatuskode;
  kilde: Kilde;
  statusVisningsnavn?: string;
}

export interface OpplysningerBruktTilBeregningSivilstandskode {
  periode: TypeArManedsperiode;
  status: Sivilstandskode;
  kilde: Kilde;
  statusVisningsnavn?: string;
}

export interface OpplysningerFraFolkeregisteretBostatuskode {
  periode: TypeArManedsperiode;
  status?: Bostatuskode;
  statusVisningsnavn?: string;
}

export interface OpplysningerFraFolkeregisteretSivilstandskodePDL {
  periode: TypeArManedsperiode;
  status?: SivilstandskodePDL;
  statusVisningsnavn?: string;
}

export interface PersonNotatDto {
  rolle?: Rolletype;
  navn?: string;
  /** @format date */
  fødselsdato?: string;
  ident?: string;
}

export enum Resultatkode {
  BARNETERSELVFORSORGET = "BARNET_ER_SELVFORSØRGET",
  BEGRENSETEVNEFLERESAKERUTFORFORHOLDSMESSIGFORDELING = "BEGRENSET_EVNE_FLERE_SAKER_UTFØR_FORHOLDSMESSIG_FORDELING",
  BEGRENSET_REVURDERING = "BEGRENSET_REVURDERING",
  BIDRAG_IKKE_BEREGNET_DELT_BOSTED = "BIDRAG_IKKE_BEREGNET_DELT_BOSTED",
  BIDRAG_REDUSERT_AV_EVNE = "BIDRAG_REDUSERT_AV_EVNE",
  BIDRAGREDUSERTTIL25PROSENTAVINNTEKT = "BIDRAG_REDUSERT_TIL_25_PROSENT_AV_INNTEKT",
  BIDRAG_SATT_TIL_BARNETILLEGG_BP = "BIDRAG_SATT_TIL_BARNETILLEGG_BP",
  BIDRAG_SATT_TIL_BARNETILLEGG_FORSVARET = "BIDRAG_SATT_TIL_BARNETILLEGG_FORSVARET",
  BIDRAG_SATT_TIL_UNDERHOLDSKOSTNAD_MINUS_BARNETILLEGG_BM = "BIDRAG_SATT_TIL_UNDERHOLDSKOSTNAD_MINUS_BARNETILLEGG_BM",
  DELT_BOSTED = "DELT_BOSTED",
  FORHOLDSMESSIGFORDELINGBIDRAGSBELOPENDRET = "FORHOLDSMESSIG_FORDELING_BIDRAGSBELØP_ENDRET",
  FORHOLDSMESSIG_FORDELING_INGEN_ENDRING = "FORHOLDSMESSIG_FORDELING_INGEN_ENDRING",
  INGEN_EVNE = "INGEN_EVNE",
  KOSTNADSBEREGNET_BIDRAG = "KOSTNADSBEREGNET_BIDRAG",
  REDUSERTFORSKUDD50PROSENT = "REDUSERT_FORSKUDD_50_PROSENT",
  ORDINAeRTFORSKUDD75PROSENT = "ORDINÆRT_FORSKUDD_75_PROSENT",
  FORHOYETFORSKUDD100PROSENT = "FORHØYET_FORSKUDD_100_PROSENT",
  FORHOYETFORSKUDD11AR125PROSENT = "FORHØYET_FORSKUDD_11_ÅR_125_PROSENT",
  SAeRTILSKUDDINNVILGET = "SÆRTILSKUDD_INNVILGET",
  SAeRTILSKUDDIKKEFULLBIDRAGSEVNE = "SÆRTILSKUDD_IKKE_FULL_BIDRAGSEVNE",
  AVSLAG = "AVSLAG",
  AVSLAG2 = "AVSLAG2",
  PAGRUNNAVBARNEPENSJON = "PÅ_GRUNN_AV_BARNEPENSJON",
  BARNETS_EKTESKAP = "BARNETS_EKTESKAP",
  BARNETS_INNTEKT = "BARNETS_INNTEKT",
  PAGRUNNAVYTELSEFRAFOLKETRYGDEN = "PÅ_GRUNN_AV_YTELSE_FRA_FOLKETRYGDEN",
  FULLT_UNDERHOLDT_AV_OFFENTLIG = "FULLT_UNDERHOLDT_AV_OFFENTLIG",
  IKKE_OMSORG = "IKKE_OMSORG",
  IKKE_OPPHOLD_I_RIKET = "IKKE_OPPHOLD_I_RIKET",
  MANGLENDE_DOKUMENTASJON = "MANGLENDE_DOKUMENTASJON",
  PAGRUNNAVSAMMENFLYTTING = "PÅ_GRUNN_AV_SAMMENFLYTTING",
  OPPHOLD_I_UTLANDET = "OPPHOLD_I_UTLANDET",
  UTENLANDSK_YTELSE = "UTENLANDSK_YTELSE",
}

export enum Rolletype {
  BA = "BA",
  BM = "BM",
  BP = "BP",
  FR = "FR",
  RM = "RM",
}

export interface SivilstandNotat {
  opplysningerFraFolkeregisteret: OpplysningerFraFolkeregisteretSivilstandskodePDL[];
  opplysningerBruktTilBeregning: OpplysningerBruktTilBeregningSivilstandskode[];
}

export enum Sivilstandskode {
  GIFT_SAMBOER = "GIFT_SAMBOER",
  BOR_ALENE_MED_BARN = "BOR_ALENE_MED_BARN",
  ENSLIG = "ENSLIG",
  SAMBOER = "SAMBOER",
  UKJENT = "UKJENT",
}

export enum SivilstandskodePDL {
  GIFT = "GIFT",
  UGIFT = "UGIFT",
  UOPPGITT = "UOPPGITT",
  ENKE_ELLER_ENKEMANN = "ENKE_ELLER_ENKEMANN",
  SKILT = "SKILT",
  SEPARERT = "SEPARERT",
  REGISTRERT_PARTNER = "REGISTRERT_PARTNER",
  SEPARERT_PARTNER = "SEPARERT_PARTNER",
  SKILT_PARTNER = "SKILT_PARTNER",
  GJENLEVENDE_PARTNER = "GJENLEVENDE_PARTNER",
}

export enum SoktAvType {
  BIDRAGSMOTTAKER = "BIDRAGSMOTTAKER",
  BIDRAGSPLIKTIG = "BIDRAGSPLIKTIG",
  BARN18AR = "BARN_18_ÅR",
  BM_I_ANNEN_SAK = "BM_I_ANNEN_SAK",
  NAV_BIDRAG = "NAV_BIDRAG",
  FYLKESNEMDA = "FYLKESNEMDA",
  NAV_INTERNASJONALT = "NAV_INTERNASJONALT",
  KOMMUNE = "KOMMUNE",
  NORSKE_MYNDIGHET = "NORSKE_MYNDIGHET",
  UTENLANDSKE_MYNDIGHET = "UTENLANDSKE_MYNDIGHET",
  VERGE = "VERGE",
  TRYGDEETATEN_INNKREVING = "TRYGDEETATEN_INNKREVING",
  KLAGE_ANKE = "KLAGE_ANKE",
  KONVERTERING = "KONVERTERING",
}

export interface Vedtak {
  erFattet: boolean;
  fattetAvSaksbehandler?: string;
  /** @format date-time */
  fattetTidspunkt?: string;
  resultat: NotatResultatBeregningBarnDto[];
}

export enum Vedtakstype {
  INDEKSREGULERING = "INDEKSREGULERING",
  ALDERSJUSTERING = "ALDERSJUSTERING",
  OPPHOR = "OPPHØR",
  ALDERSOPPHOR = "ALDERSOPPHØR",
  REVURDERING = "REVURDERING",
  FASTSETTELSE = "FASTSETTELSE",
  INNKREVING = "INNKREVING",
  KLAGE = "KLAGE",
  ENDRING = "ENDRING",
  ENDRING_MOTTAKER = "ENDRING_MOTTAKER",
}

export interface Virkningstidspunkt {
  søknadstype?: string;
  vedtakstype?: Vedtakstype;
  søktAv?: SoktAvType;
  /** @format date */
  mottattDato?: string;
  /** @format date */
  søktFraDato?: string;
  /** @format date */
  virkningstidspunkt?: string;
  årsak?: TypeArsakstype;
  avslag?: Resultatkode;
  notat: Notat;
  årsakVisningsnavn?: string;
  avslagVisningsnavn?: string;
}

export interface TypeArManedsperiode {
  /**
   * @pattern YYYY-MM
   * @example "2023-01"
   */
  fom: string;
  /**
   * @pattern YYYY-MM
   * @example "2023-01"
   */
  til?: string;
}

export enum TypeArsakstype {
  ANNET = "ANNET",
  ENDRING3MANEDERTILBAKE = "ENDRING_3_MÅNEDER_TILBAKE",
  ENDRING3ARSREGELEN = "ENDRING_3_ÅRS_REGELEN",
  FRABARNETSFODSEL = "FRA_BARNETS_FØDSEL",
  FRABARNETSFLYTTEMANED = "FRA_BARNETS_FLYTTEMÅNED",
  FRA_KRAVFREMSETTELSE = "FRA_KRAVFREMSETTELSE",
  FRAMANEDETTERINNTEKTENOKTE = "FRA_MÅNED_ETTER_INNTEKTEN_ØKTE",
  FRA_OPPHOLDSTILLATELSE = "FRA_OPPHOLDSTILLATELSE",
  FRASOKNADSTIDSPUNKT = "FRA_SØKNADSTIDSPUNKT",
  FRA_SAMLIVSBRUDD = "FRA_SAMLIVSBRUDD",
  FRASAMMEMANEDSOMINNTEKTENBLEREDUSERT = "FRA_SAMME_MÅNED_SOM_INNTEKTEN_BLE_REDUSERT",
  PRIVAT_AVTALE = "PRIVAT_AVTALE",
  REVURDERINGMANEDENETTER = "REVURDERING_MÅNEDEN_ETTER",
  SOKNADSTIDSPUNKTENDRING = "SØKNADSTIDSPUNKT_ENDRING",
  TIDLIGERE_FEILAKTIG_AVSLAG = "TIDLIGERE_FEILAKTIG_AVSLAG",
  TREMANEDERTILBAKE = "TRE_MÅNEDER_TILBAKE",
  TREARSREGELEN = "TRE_ÅRS_REGELEN",
}

export interface MediaType {
  type?: string;
  subtype?: string;
  parameters?: Record<string, string>;
  /** @format double */
  qualityValue?: number;
  wildcardSubtype?: boolean;
  subtypeSuffix?: string;
  wildcardType?: boolean;
  concrete?: boolean;
  charset?: string;
}
