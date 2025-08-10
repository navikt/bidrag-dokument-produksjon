export type SpråkType = "nb" | "nn" | "en";

export type Bidragstype = "MOTTAKER" | "PLIKTIG";

export type Oppgjørsform = "PRIVAT" | "INNKREVING";

export interface IPerson {
  fornavn: string;
  etternavn: string;
  fodselsnummer: string;
}

export interface IAndreBestemmelser {
  harAndreBestemmelser: boolean;
  beskrivelse?: string;
}

export type TilknyttetAvtaleVedlegg =
  | "SENDES_MED_SKJEMA"
  | "ETTERSENDES"
  | "LEVERT_TIDLIGERE";

export const tilknyttetAvtaleVedleggTekster: Record<
  TilknyttetAvtaleVedlegg,
  Record<SpråkType, string>
> = {
  SENDES_MED_SKJEMA: {
    nb: "Jeg legger det ved dette skjemaet",
    nn: "Eg legg det ved dette skjemaet",
    en: "I'll attach it to this form",
  },
  ETTERSENDES: {
    nb: "Jeg ettersender dokumentasjonen senere",
    nn: "Eg ettersender dokumentasjonen seinare",
    en: "I'll send the documentation later",
  },
  LEVERT_TIDLIGERE: {
    nb: "Jeg har levert denne dokumentasjonen tidligere",
    nn: "Eg har levert denne dokumentasjonen tidlegare",
    en: "I have submitted this documentation earlier",
  },
};

export type AnnenDokumentasjon =
  | "SENDES_MED_SKJEMA"
  | "INGEN_EKSTRA_DOKUMENTASJON";

export const annenDokumentasjonTekster: Record<
  AnnenDokumentasjon,
  Record<SpråkType, string>
> = {
  SENDES_MED_SKJEMA: {
    nb: "Jeg legger det ved dette skjemaet",
    nn: "Eg legg det ved dette skjemaet",
    en: "I'll attach it to this form",
  },
  INGEN_EKSTRA_DOKUMENTASJON: {
    nb: "Nei, jeg har ingen ekstra dokumentasjon jeg vil legge ved",
    nn: "Nei, eg har ingen ekstra dokumentasjon eg vil leggje ved",
    en: "No, I have no additional documentation to attach",
  },
};

export interface IVedlegg {
  tilknyttetAvtale: TilknyttetAvtaleVedlegg;
  annenDokumentasjon: AnnenDokumentasjon;
}

export const tilknyttetAvtaleVedleggAlternativer = (språk: SpråkType) => [
  {
    value: "SENDES_MED_SKJEMA" as TilknyttetAvtaleVedlegg,
    label: tilknyttetAvtaleVedleggTekster.SENDES_MED_SKJEMA[språk],
  },
  {
    value: "ETTERSENDES" as TilknyttetAvtaleVedlegg,
    label: tilknyttetAvtaleVedleggTekster.ETTERSENDES[språk],
  },
  {
    value: "LEVERT_TIDLIGERE" as TilknyttetAvtaleVedlegg,
    label: tilknyttetAvtaleVedleggTekster.LEVERT_TIDLIGERE[språk],
  },
];

export const annenDokumentasjonAlternativer = (språk: SpråkType) => [
  {
    value: "SENDES_MED_SKJEMA" as AnnenDokumentasjon,
    label: annenDokumentasjonTekster.SENDES_MED_SKJEMA[språk],
  },
  {
    value: "INGEN_EKSTRA_DOKUMENTASJON" as AnnenDokumentasjon,
    label: annenDokumentasjonTekster.INGEN_EKSTRA_DOKUMENTASJON[språk],
  },
];

export interface IBarn extends IPerson {
  sumBidrag: number; // Beløp i kroner
}

export interface PrivatAvtaleDto {
  språk: SpråkType;
  innhold: string;
  bidragsmottaker: IPerson;
  bidragspliktig: IPerson;
  barn: IBarn[];
  fraDato: string;
  nyAvtale: boolean;
  oppgjorsform: Oppgjørsform;
  andreBestemmelser: IAndreBestemmelser;
  vedlegg: IVedlegg;
}
