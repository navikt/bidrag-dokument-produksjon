import tekster from "~/tekster";

export const getInntektTableHeaders = (erBarnetillegg: boolean = false) =>
  [
    { name: tekster.tabell.felles.fraTilOgMed, width: "200px" },
    { name: tekster.tabell.felles.kilde, width: "70px" },
    erBarnetillegg
      ? [
          { name: tekster.tabell.felles.type, width: "150px" },
          { name: tekster.tabell.inntekt.beløpMnd, width: "100px" },
          { name: tekster.tabell.inntekt.beløp12Mnd, width: "120px" },
        ]
      : { name: tekster.tabell.inntekt.beløp, width: "100px" },
  ].flatMap((d) => d);
