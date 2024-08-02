import tekster from "~/tekster";
import { TableHeader } from "~/components/CommonTable";

export const getInntektTableHeaders = (
  erBarnetillegg: boolean = false,
  inkluderKilde: boolean = true,
) =>
  [
    {
      name: tekster.tabell.felles.fraTilOgMed,
      width: inkluderKilde ? "170px" : erBarnetillegg ? "150px" : "345px",
    },
    inkluderKilde
      ? {
          name: tekster.tabell.felles.kilde,
          width: erBarnetillegg ? "70px" : "230px",
        }
      : undefined,
    erBarnetillegg
      ? [
          { name: tekster.tabell.felles.type, width: "160px" },
          { name: tekster.tabell.inntekt.beløpMnd, width: "80px" },
          { name: tekster.tabell.inntekt.beløp12Mnd, width: "120px" },
        ]
      : {
          name: tekster.tabell.inntekt.beløp,
          width: erBarnetillegg ? "140px" : undefined,
        },
  ]
    .filter((d) => d !== undefined)
    .flatMap((d) => d) as TableHeader[];
