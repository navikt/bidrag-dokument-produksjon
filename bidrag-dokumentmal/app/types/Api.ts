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

type UtilRequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export interface Arbeidsforhold {
  periode: TypeArManedsperiode;
  arbeidsgiver: string;
  stillingProsent?: string;
  /** @format date */
  lønnsendringDato?: string;
}

export interface BoforholdBarn {
  gjelder: NotatRolleDto;
  medIBehandling: boolean;
  kilde: Kilde;
  opplysningerFraFolkeregisteret: OpplysningerFraFolkeregisteretMedDetaljerBostatuskodeUnit[];
  opplysningerBruktTilBeregning: OpplysningerBruktTilBeregningBostatuskode[];
}

export enum Bostatuskode {
  MED_FORELDER = "MED_FORELDER",
  DOKUMENTERT_SKOLEGANG = "DOKUMENTERT_SKOLEGANG",
  IKKE_MED_FORELDER = "IKKE_MED_FORELDER",
  DELT_BOSTED = "DELT_BOSTED",
  REGNES_IKKE_SOM_BARN = "REGNES_IKKE_SOM_BARN",
  BOR_MED_ANDRE_VOKSNE = "BOR_MED_ANDRE_VOKSNE",
  BOR_IKKE_MED_ANDRE_VOKSNE = "BOR_IKKE_MED_ANDRE_VOKSNE",
  UNNTAK_HOS_ANDRE = "UNNTAK_HOS_ANDRE",
  UNNTAK_ALENE = "UNNTAK_ALENE",
  UNNTAKENSLIGASYLSOKER = "UNNTAK_ENSLIG_ASYLSØKER",
  MED_VERGE = "MED_VERGE",
  ALENE = "ALENE",
}

export interface DelberegningBidragspliktigesAndelSaerbidrag {
  periode: TypeArManedsperiode;
  andelFaktor: number;
  andelBeløp: number;
  barnetErSelvforsørget: boolean;
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

export interface DelberegningUtgift {
  periode: TypeArManedsperiode;
  sumBetaltAvBp: number;
  sumGodkjent: number;
}

export interface InntekterPerRolle {
  gjelder: NotatRolleDto;
  arbeidsforhold: Arbeidsforhold[];
  årsinntekter: NotatInntektDto[];
  barnetillegg: NotatInntektDto[];
  utvidetBarnetrygd: NotatInntektDto[];
  småbarnstillegg: NotatInntektDto[];
  kontantstøtte: NotatInntektDto[];
  beregnetInntekter: NotatBeregnetInntektDto[];
  harInntekter: boolean;
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
  AINNTEKT_KORRIGERT_FOR_BARNETILLEGG = "AINNTEKT_KORRIGERT_FOR_BARNETILLEGG",
  BARNETRYGD_MANUELL_VURDERING = "BARNETRYGD_MANUELL_VURDERING",
  BARNS_SYKDOM = "BARNS_SYKDOM",
  SKJONNMANGLERDOKUMENTASJON = "SKJØNN_MANGLER_DOKUMENTASJON",
  FORDELSAeRFRADRAGENSLIGFORSORGER = "FORDEL_SÆRFRADRAG_ENSLIG_FORSØRGER",
  FODSELADOPSJON = "FØDSEL_ADOPSJON",
  INNTEKTSOPPLYSNINGER_FRA_ARBEIDSGIVER = "INNTEKTSOPPLYSNINGER_FRA_ARBEIDSGIVER",
  LIGNINGSOPPLYSNINGER_MANGLER = "LIGNINGSOPPLYSNINGER_MANGLER",
  LIGNING_FRA_SKATTEETATEN = "LIGNING_FRA_SKATTEETATEN",
  LONNSOPPGAVEFRASKATTEETATEN = "LØNNSOPPGAVE_FRA_SKATTEETATEN",
  LONNSOPPGAVEFRASKATTEETATENKORRIGERTFORBARNETILLEGG = "LØNNSOPPGAVE_FRA_SKATTEETATEN_KORRIGERT_FOR_BARNETILLEGG",
  SKJONNMANGLENDEBRUKAVEVNE = "SKJØNN_MANGLENDE_BRUK_AV_EVNE",
  NETTO_KAPITALINNTEKT = "NETTO_KAPITALINNTEKT",
  PENSJON_KORRIGERT_FOR_BARNETILLEGG = "PENSJON_KORRIGERT_FOR_BARNETILLEGG",
  REHABILITERINGSPENGER = "REHABILITERINGSPENGER",
  SKATTEGRUNNLAG_KORRIGERT_FOR_BARNETILLEGG = "SKATTEGRUNNLAG_KORRIGERT_FOR_BARNETILLEGG",
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

export interface NotatAndreVoksneIHusstanden {
  opplysningerFraFolkeregisteret: OpplysningerFraFolkeregisteretMedDetaljerBostatuskodeNotatAndreVoksneIHusstandenDetaljerDto[];
  opplysningerBruktTilBeregning: OpplysningerBruktTilBeregningBostatuskode[];
}

export interface NotatAndreVoksneIHusstandenDetaljerDto {
  /** @format int32 */
  totalAntallHusstandsmedlemmer: number;
  husstandsmedlemmer: NotatVoksenIHusstandenDetaljerDto[];
}

/** Notat begrunnelse skrevet av saksbehandler */
export interface NotatBegrunnelseDto {
  innhold?: string;
  /** @deprecated */
  intern?: string;
  gjelder?: NotatRolleDto;
}

export interface NotatBehandlingDetaljerDto {
  søknadstype?: string;
  vedtakstype?: Vedtakstype;
  opprinneligVedtakstype?: Vedtakstype;
  kategori?: NotatSaerbidragKategoriDto;
  søktAv?: SoktAvType;
  /** @format date */
  mottattDato?: string;
  søktFraDato?: {
    /** @format int32 */
    year?: number;
    month?:
      | "JANUARY"
      | "FEBRUARY"
      | "MARCH"
      | "APRIL"
      | "MAY"
      | "JUNE"
      | "JULY"
      | "AUGUST"
      | "SEPTEMBER"
      | "OCTOBER"
      | "NOVEMBER"
      | "DECEMBER";
    /** @format int32 */
    monthValue?: number;
    leapYear?: boolean;
  };
  /** @format date */
  virkningstidspunkt?: string;
  avslag?: Resultatkode;
  /** @format date */
  klageMottattDato?: string;
  avslagVisningsnavn?: string;
  avslagVisningsnavnUtenPrefiks?: string;
  kategoriVisningsnavn?: string;
  vedtakstypeVisningsnavn?: string;
}

export interface NotatBeregnetInntektDto {
  gjelderBarn: NotatRolleDto;
  summertInntektListe: DelberegningSumInntekt[];
}

export interface NotatBoforholdDto {
  barn: BoforholdBarn[];
  andreVoksneIHusstanden?: NotatAndreVoksneIHusstanden;
  sivilstand: NotatSivilstand;
  /** Notat begrunnelse skrevet av saksbehandler */
  begrunnelse: NotatBegrunnelseDto;
  /** Notat begrunnelse skrevet av saksbehandler */
  notat: NotatBegrunnelseDto;
}

export interface NotatInntektDto {
  periode?: TypeArManedsperiode;
  opprinneligPeriode?: TypeArManedsperiode;
  beløp: number;
  kilde: Kilde;
  type: Inntektsrapportering;
  medIBeregning: boolean;
  gjelderBarn?: NotatRolleDto;
  inntektsposter: NotatInntektspostDto[];
  visningsnavn: string;
}

export interface NotatInntekterDto {
  inntekterPerRolle: InntekterPerRolle[];
  offentligeInntekterPerRolle: InntekterPerRolle[];
  /** Notat begrunnelse skrevet av saksbehandler */
  notat: NotatBegrunnelseDto;
  /** @uniqueItems true */
  notatPerRolle: NotatBegrunnelseDto[];
  /** @uniqueItems true */
  begrunnelsePerRolle: NotatBegrunnelseDto[];
}

export interface NotatInntektspostDto {
  kode?: string;
  inntektstype?: Inntektstype;
  beløp: number;
  visningsnavn?: string;
}

export interface NotatMaksGodkjentBelopDto {
  taMed: boolean;
  beløp?: number;
  begrunnelse?: string;
}

export enum NotatMalType {
  FORSKUDD = "FORSKUDD",
  SAeRBIDRAG = "SÆRBIDRAG",
  BIDRAG = "BIDRAG",
}

export type NotatResultatForskuddBeregningBarnDto = UtilRequiredKeys<VedtakResultatInnhold, "type"> & {
  barn: NotatRolleDto;
  perioder: NotatResultatPeriodeDto[];
};

export interface NotatResultatPeriodeDto {
  periode: TypeArManedsperiode;
  beløp: number;
  resultatKode: Resultatkode;
  regel: string;
  sivilstand?: Sivilstandskode;
  inntekt: number;
  vedtakstype?: Vedtakstype;
  /** @format int32 */
  antallBarnIHusstanden: number;
  resultatKodeVisningsnavn: string;
  sivilstandVisningsnavn?: string;
}

export type NotatResultatSaerbidragsberegningDto = UtilRequiredKeys<VedtakResultatInnhold, "type"> & {
  periode: TypeArManedsperiode;
  bpsAndel?: DelberegningBidragspliktigesAndelSaerbidrag;
  beregning?: UtgiftBeregningDto;
  inntekter?: ResultatSaerbidragsberegningInntekterDto;
  delberegningUtgift?: DelberegningUtgift;
  resultat: number;
  resultatKode: Resultatkode;
  /** @format double */
  antallBarnIHusstanden?: number;
  voksenIHusstanden?: boolean;
  enesteVoksenIHusstandenErEgetBarn?: boolean;
  erDirekteAvslag: boolean;
  bpHarEvne: boolean;
  beløpSomInnkreves: number;
  resultatVisningsnavn: string;
};

export interface NotatRolleDto {
  rolle?: Rolletype;
  navn?: string;
  /** @format date */
  fødselsdato?: string;
  ident?: string;
  erBeskyttet: boolean;
}

export interface NotatSivilstand {
  opplysningerFraFolkeregisteret: OpplysningerFraFolkeregisteretMedDetaljerSivilstandskodePDLUnit[];
  opplysningerBruktTilBeregning: OpplysningerBruktTilBeregningSivilstandskode[];
}

export interface NotatSaerbidragKategoriDto {
  kategori: Saerbidragskategori;
  beskrivelse?: string;
}

export interface NotatSaerbidragUtgifterDto {
  beregning?: NotatUtgiftBeregningDto;
  maksGodkjentBeløp?: NotatMaksGodkjentBelopDto;
  /** Notat begrunnelse skrevet av saksbehandler */
  begrunnelse: NotatBegrunnelseDto;
  /** Notat begrunnelse skrevet av saksbehandler */
  notat: NotatBegrunnelseDto;
  utgifter: NotatUtgiftspostDto[];
  totalBeregning: NotatTotalBeregningUtgifterDto[];
}

export interface NotatTotalBeregningUtgifterDto {
  betaltAvBp: boolean;
  utgiftstype: string;
  totalKravbeløp: number;
  totalGodkjentBeløp: number;
  utgiftstypeVisningsnavn: string;
}

export interface NotatUtgiftBeregningDto {
  /** Beløp som er direkte betalt av BP */
  beløpDirekteBetaltAvBp: number;
  /** Summen av godkjente beløp som brukes for beregningen */
  totalGodkjentBeløp: number;
  /** Summen av kravbeløp */
  totalKravbeløp: number;
  /** Summen av godkjente beløp som brukes for beregningen */
  totalGodkjentBeløpBp?: number;
  /** Summen av godkjent beløp for utgifter BP har betalt plus beløp som er direkte betalt av BP */
  totalBeløpBetaltAvBp: number;
}

export interface NotatUtgiftspostDto {
  /**
   * Når utgifter gjelder. Kan være feks dato på kvittering
   * @format date
   */
  dato: string;
  /** Type utgift. Kan feks være hva som ble kjøpt for kravbeløp (bugnad, klær, sko, etc) */
  type: Utgiftstype | string;
  /** Beløp som er betalt for utgiften det gjelder */
  kravbeløp: number;
  /** Beløp som er godkjent for beregningen */
  godkjentBeløp: number;
  /** Begrunnelse for hvorfor godkjent beløp avviker fra kravbeløp. Må settes hvis godkjent beløp er ulik kravbeløp */
  begrunnelse?: string;
  /** Om utgiften er betalt av BP */
  betaltAvBp: boolean;
  utgiftstypeVisningsnavn: string;
}

export interface NotatVedtakDetaljerDto {
  erFattet: boolean;
  fattetAvSaksbehandler?: string;
  /** @format date-time */
  fattetTidspunkt?: string;
  resultat: (NotatResultatForskuddBeregningBarnDto | NotatResultatSaerbidragsberegningDto)[];
}

export interface NotatVirkningstidspunktDto {
  søknadstype?: string;
  vedtakstype?: Vedtakstype;
  søktAv?: SoktAvType;
  /** @format date */
  mottattDato?: string;
  /** @format date */
  søktFraDato?: string;
  /** @format date */
  virkningstidspunkt?: string;
  avslag?: Resultatkode;
  årsak?: TypeArsakstype;
  /** Notat begrunnelse skrevet av saksbehandler */
  begrunnelse: NotatBegrunnelseDto;
  /** Notat begrunnelse skrevet av saksbehandler */
  notat: NotatBegrunnelseDto;
  avslagVisningsnavn?: string;
  årsakVisningsnavn?: string;
}

export interface NotatVoksenIHusstandenDetaljerDto {
  navn: string;
  /** @format date */
  fødselsdato?: string;
  erBeskyttet: boolean;
  harRelasjonTilBp: boolean;
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

export interface OpplysningerFraFolkeregisteretMedDetaljerBostatuskodeNotatAndreVoksneIHusstandenDetaljerDto {
  periode: TypeArManedsperiode;
  status?: Bostatuskode;
  detaljer?: NotatAndreVoksneIHusstandenDetaljerDto;
  statusVisningsnavn?: string;
}

export interface OpplysningerFraFolkeregisteretMedDetaljerBostatuskodeUnit {
  periode: TypeArManedsperiode;
  status?: Bostatuskode;
  detaljer?: Unit;
  statusVisningsnavn?: string;
}

export interface OpplysningerFraFolkeregisteretMedDetaljerSivilstandskodePDLUnit {
  periode: TypeArManedsperiode;
  status?: SivilstandskodePDL;
  detaljer?: Unit;
  statusVisningsnavn?: string;
}

export interface ResultatSaerbidragsberegningInntekterDto {
  inntektBM?: number;
  inntektBP?: number;
  inntektBarn?: number;
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
  SAeRBIDRAGINNVILGET = "SÆRBIDRAG_INNVILGET",
  SAeRTILSKUDDIKKEFULLBIDRAGSEVNE = "SÆRTILSKUDD_IKKE_FULL_BIDRAGSEVNE",
  SAeRBIDRAGIKKEFULLBIDRAGSEVNE = "SÆRBIDRAG_IKKE_FULL_BIDRAGSEVNE",
  SAeRBIDRAGMANGLERBIDRAGSEVNE = "SÆRBIDRAG_MANGLER_BIDRAGSEVNE",
  AVSLAG = "AVSLAG",
  AVSLAG2 = "AVSLAG2",
  AVSLAGOVER18AR = "AVSLAG_OVER_18_ÅR",
  AVSLAGIKKEREGISTRERTPAADRESSE = "AVSLAG_IKKE_REGISTRERT_PÅ_ADRESSE",
  AVSLAGHOYINNTEKT = "AVSLAG_HØY_INNTEKT",
  PAGRUNNAVBARNEPENSJON = "PÅ_GRUNN_AV_BARNEPENSJON",
  IKKE_OMSORG = "IKKE_OMSORG",
  BARNETS_EKTESKAP = "BARNETS_EKTESKAP",
  BARNETS_INNTEKT = "BARNETS_INNTEKT",
  PAGRUNNAVYTELSEFRAFOLKETRYGDEN = "PÅ_GRUNN_AV_YTELSE_FRA_FOLKETRYGDEN",
  FULLT_UNDERHOLDT_AV_OFFENTLIG = "FULLT_UNDERHOLDT_AV_OFFENTLIG",
  IKKE_OPPHOLD_I_RIKET = "IKKE_OPPHOLD_I_RIKET",
  MANGLENDE_DOKUMENTASJON = "MANGLENDE_DOKUMENTASJON",
  PAGRUNNAVSAMMENFLYTTING = "PÅ_GRUNN_AV_SAMMENFLYTTING",
  OPPHOLD_I_UTLANDET = "OPPHOLD_I_UTLANDET",
  UTENLANDSK_YTELSE = "UTENLANDSK_YTELSE",
  AVSLAG_PRIVAT_AVTALE_BIDRAG = "AVSLAG_PRIVAT_AVTALE_BIDRAG",
  IKKESOKTOMINNKREVINGAVBIDRAG = "IKKE_SØKT_OM_INNKREVING_AV_BIDRAG",
  IKKE_INNKREVING_AV_BIDRAG = "IKKE_INNKREVING_AV_BIDRAG",
  UTGIFTER_DEKKES_AV_BARNEBIDRAGET = "UTGIFTER_DEKKES_AV_BARNEBIDRAGET",
  IKKENODVENDIGEUTGIFTER = "IKKE_NØDVENDIGE_UTGIFTER",
  PRIVAT_AVTALE = "PRIVAT_AVTALE",
  AVSLAGPRIVATAVTALEOMSAeRBIDRAG = "AVSLAG_PRIVAT_AVTALE_OM_SÆRBIDRAG",
  ALLE_UTGIFTER_ER_FORELDET = "ALLE_UTGIFTER_ER_FORELDET",
  GODKJENTBELOPERLAVEREENNFORSKUDDSSATS = "GODKJENT_BELØP_ER_LAVERE_ENN_FORSKUDDSSATS",
}

export enum Rolletype {
  BA = "BA",
  BM = "BM",
  BP = "BP",
  FR = "FR",
  RM = "RM",
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

export enum Saerbidragskategori {
  KONFIRMASJON = "KONFIRMASJON",
  TANNREGULERING = "TANNREGULERING",
  OPTIKK = "OPTIKK",
  ANNET = "ANNET",
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

export type Unit = object;

export interface UtgiftBeregningDto {
  /** Beløp som er direkte betalt av BP */
  beløpDirekteBetaltAvBp: number;
  /** Summen av godkjente beløp som brukes for beregningen */
  totalGodkjentBeløp: number;
  /** Summen av kravbeløp */
  totalKravbeløp: number;
  /** Summen av godkjente beløp som brukes for beregningen */
  totalGodkjentBeløpBp?: number;
  /** Summen av godkjent beløp for utgifter BP har betalt plus beløp som er direkte betalt av BP */
  totalBeløpBetaltAvBp: number;
}

export enum Utgiftstype {
  KONFIRMASJONSAVGIFT = "KONFIRMASJONSAVGIFT",
  KONFIRMASJONSLEIR = "KONFIRMASJONSLEIR",
  SELSKAP = "SELSKAP",
  KLAeR = "KLÆR",
  REISEUTGIFT = "REISEUTGIFT",
  TANNREGULERING = "TANNREGULERING",
  OPTIKK = "OPTIKK",
  ANNET = "ANNET",
}

export interface VedtakNotatDto {
  type: NotatMalType;
  saksnummer: string;
  behandling: NotatBehandlingDetaljerDto;
  saksbehandlerNavn?: string;
  virkningstidspunkt: NotatVirkningstidspunktDto;
  utgift?: NotatSaerbidragUtgifterDto;
  boforhold: NotatBoforholdDto;
  roller: NotatRolleDto[];
  inntekter: NotatInntekterDto;
  vedtak: NotatVedtakDetaljerDto;
}

export interface VedtakResultatInnhold {
  type: NotatMalType;
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
  FRAMANEDENETTERIPAVENTEAVBIDRAGSSAK = "FRA_MÅNEDEN_ETTER_I_PÅVENTE_AV_BIDRAGSSAK",
}
