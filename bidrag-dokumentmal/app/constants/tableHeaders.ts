import tekster from "~/tekster";

export const getInntektTableHeaders = (erBarnetillegg: boolean = false) =>
  [
    { name: tekster.tabell.felles.fraTilOgMed, width: "170px" },
    {
      name: tekster.tabell.felles.kilde,
      width: erBarnetillegg ? "70px" : "230px",
    },
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
  ].flatMap((d) => d);
