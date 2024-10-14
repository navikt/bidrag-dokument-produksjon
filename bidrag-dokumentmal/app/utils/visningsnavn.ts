import { Rolletype, SoktAvType } from "~/types/Api";

export const sammenlignRoller = (rolle?: Rolletype, erLikRolle?: Rolletype) =>
  rolle != undefined &&
  erLikRolle != undefined &&
  (rolle == erLikRolle || rolle == rolleTilType[erLikRolle]);

export function søktAvTilVisningsnavn(søktAv?: SoktAvType) {
  switch (søktAv) {
    case SoktAvType.NAV_INTERNASJONALT:
    case SoktAvType.NAV_BIDRAG:
      return "NAV";
    case SoktAvType.BARN18AR:
      return "Barn";
    case SoktAvType.BM_I_ANNEN_SAK:
      return "Bidragsmottaker i annen sak";
    case SoktAvType.KLAGE_ANKE:
      return "Klage";
    default:
      return capitalizeFirstLetter(søktAv);
  }
}
export const rolleTilVisningsnavn = (rolle: Rolletype): string => {
  switch (rolle) {
    case Rolletype.BM:
      return "Bidragsmottaker";
    case Rolletype.BP:
      return "Bidragspliktig";
    case Rolletype.BA:
      return "Søknadsbarn";
    default:
      return capitalizeFirstLetter(rolle) ?? "";
  }
};

export const rolleTilType = {
  [Rolletype.BA]: "BARN",
  [Rolletype.BM]: "BIDRAGSMOTTAKER",
  [Rolletype.BP]: "BIDRAGSPLIKTIG",
  [Rolletype.FR]: "FEILREGISTRERT",
  [Rolletype.RM]: "REELMOTTAKER",
};

export function capitalizeFirstLetter(str?: string) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
export const formatterBeløpForBeregning = (
  beløp: number | string | undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  visSymbol = false,
): string => {
  return (beløp ?? 0).toLocaleString("nb-NO", {
    // style: visSymbol ? "currency" : undefined,
    currency: "NOK",
    currencySign: "accounting",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    // currencyDisplay: visSymbol ? "symbol" : undefined,
  });
};
export const formatterBeløp = (
  beløp: number | string | undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  visSymbol = false,
): string => {
  return (beløp ?? 0).toLocaleString("nb-NO", {
    // style: visSymbol ? "currency" : undefined,
    currency: "NOK",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    // currencyDisplay: visSymbol ? "symbol" : undefined,
  });
};
export const formatterProsent = (
  value: number | string | undefined,
): string => {
  if (!value) return "0%";
  const asNumber = typeof value == "string" ? parseFloat(value) : value;
  const percentageAsFraction = asNumber > 1 ? asNumber / 100 : asNumber;
  return percentageAsFraction.toLocaleString("nb-NO", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};
