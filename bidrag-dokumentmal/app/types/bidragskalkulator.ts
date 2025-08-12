import { SpråkType } from "~/utils/oversettelser";

export type Bidragstype = "MOTTAKER" | "PLIKTIG";
export type Språkkode = "NB" | "NN" | "EN";

export const språkkodeTilSpråkType = (språkkode: Språkkode): SpråkType => {
  switch (språkkode) {
    case "NB":
      return "nb";
    case "NN":
      return "nn";
    case "EN":
      return "en";
    default:
      throw new Error(`Ukjent språkkode: ${språkkode}`);
  }
};

export const bidragstypeTekster: Record<
  Bidragstype,
  Record<SpråkType, string>
> = {
  PLIKTIG: {
    nb: "Bidragspliktig",
    nn: "Bidragspliktig",
    en: "Support debtor",
  },
  MOTTAKER: {
    nb: "Bidragsmottaker",
    nn: "Bidragsmottakar",
    en: "Support recipient",
  },
};

export type Oppgjørsform = "PRIVAT" | "INNKREVING";

export const oppgjørsformTekster: Record<
  Oppgjørsform,
  Record<SpråkType, string>
> = {
  PRIVAT: {
    nb: "Vi ønsker å gjøre opp bidraget oss i mellom (privat).",
    nn: "Vi ønskjer å gjere opp bidraget oss imellom (privat).",
    en: "We want to settle the support between us (privately).",
  },
  INNKREVING: {
    nb: "Vi ønsker at bidraget skal betales gjennom Skatteetaten v/ NAV Innkreving.",
    nn: "Vi ønskjer at bidraget skal betalast gjennom Skatteetaten v/ NAV Innkreving.",
    en: "We want the support to be paid through the Tax Administration / NAV Collection.",
  },
};

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
  språk: Språkkode;
  navSkjemaId: NavSkjemaId;
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

export enum NavSkjemaId {
  AVTALE_OM_BARNEBIDRAG_UNDER_18 = "NAV 55-00.63",
  AVTALE_OM_BARNEBIDRAG_OVER_18 = "NAV 55-00.50",
}

export type NavSkjemaIdKey = keyof typeof NavSkjemaId;

export function kodeOf(id: NavSkjemaIdKey): string {
  return NavSkjemaId[id];
}
