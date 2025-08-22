import { SpråkType } from "./oversettelser";

/**
 * Formatterer et tall som en sum i kroner
 */
export const formatterSum = (sum: number, språk: SpråkType = "nb"): string => {
  const locale = språk === "en" ? "en-US" : "nb-NO";

  const formatted = sum.toLocaleString(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  switch (språk) {
    case "nb":
    case "nn":
      return `${formatted} kr`; // Norsk bokmål/nynorsk → "2 000 kr"
    case "en":
      return `${formatted} NOK`; // Engelsk → "2,000 NOK"
    default:
      return `${formatted} kr`;
  }
};
