import {
  DokumentmalDelberegningBidragspliktigesBeregnedeTotalbidragDto,
  NotatMalType,
  NotatBeregnetBidragPerBarnDto,
} from "~/types/Api";
import {
  formatterBeløpForBeregning,
  formatterProsent,
} from "~/utils/visningsnavn";
import tekster from "~/tekster";
import { CommonTable, TableColumn, TableRow } from "~/components/CommonTable";
import { CalculationTable } from "~/components/vedtak/CalculationTable";
import { useNotatFelles } from "~/components/notat_felles/NotatContext";

export const BPsBeregnedeTotalbidragSærbidrag = ({
  delberegning,
}: {
  delberegning: DokumentmalDelberegningBidragspliktigesBeregnedeTotalbidragDto;
}) => {
  return (
    <BPsBeregnedeTotalbidrag
      delberegning={delberegning.beregnetBidragPerBarnListe}
      bidragspliktigesBeregnedeTotalbidrag={
        delberegning.bidragspliktigesBeregnedeTotalbidrag
      }
    />
  );
};
export const BPsPrivatAvtaler = ({
  delberegning,
  bidragspliktigeTotalPrivatAvtaler,
}: {
  bidragspliktigeTotalPrivatAvtaler: number;
  delberegning: NotatBeregnetBidragPerBarnDto[];
}) => {
  const { type } = useNotatFelles();
  if (delberegning.length == 0) return null;

  return (
    <div>
      <h4>{`${tekster.begreper.bidragspliktiges} private avtaler`}</h4>
      <CommonTable
        data={{
          headers: [
            {
              name: "Barn",
            },
            {
              name: "Saksnummer",
            },
            {
              name: "Indeksprosent",
            },
            {
              name: "Avtale beløp",
            },
            {
              name: "Samvær",
            },
            {
              name: "Sum",
            },
          ],
          rows: delberegning
            .map(({ beregnetBidragPerBarn: row, personidentBarn }) => {
              return {
                columns: [
                  {
                    content: personidentBarn,
                  },
                  {
                    content: row.saksnummer,
                  },
                  {
                    content: formatterProsent(row.indeksreguleringFaktor),
                  },
                  {
                    content: formatterBeløpForBeregning(row.løpendeBeløp, true),
                  },
                  {
                    content: formatterBeløpForBeregning(
                      row.samværsfradrag,
                      true,
                    ),
                  },
                  {
                    content: formatterBeløpForBeregning(
                      row.beregnetBidrag,
                      true,
                    ),
                  },
                ],
              };
            })
            .concat([
              {
                skipPadding: true,
                columns: [
                  {
                    content: "",
                    colSpan: 4,
                  } as TableColumn,
                  {
                    content: "Sum: ",
                    labelBold: true,
                    textAlign: "right",
                    colSpan: 1,
                  } as TableColumn,
                  {
                    textAlign: "center",
                    content: formatterBeløpForBeregning(
                      bidragspliktigeTotalPrivatAvtaler,
                      true,
                    ),
                  } as TableColumn,
                ] as TableColumn[],
              } as TableRow,
              {
                zebraStripe: false,
                skipPadding: true,
                skipBorderBottom: true,
                columns: [
                  {
                    content: "U = Underholdskostnad, BP = Bidragspliktig",
                    colSpan: 7,
                  },
                ] as TableColumn[],
              } as TableRow,
            ]) as TableRow[],
        }}
      />
    </div>
  );
};

export const BPsBeregnedeTotalbidrag = ({
  delberegning,
  bidragspliktigesBeregnedeTotalbidrag,
}: {
  bidragspliktigesBeregnedeTotalbidrag: number;
  delberegning: NotatBeregnetBidragPerBarnDto[];
}) => {
  const { type } = useNotatFelles();
  if (delberegning.length == 0) return null;
  return (
    <div>
      <h4>{`${tekster.begreper.bidragspliktiges} beregnede totalbidrag${type === NotatMalType.BIDRAG ? " for andre barn" : ""}`}</h4>
      <CommonTable
        data={{
          headers: [
            {
              name: "Barn",
            },
            {
              name: "Saksnummer",
            },
            {
              name: "Løpende bidrag",
            },
            {
              name: "Samvær",
            },
            {
              name: "Reduksjon av BPs andel av U",
            },
            {
              name: "Sum",
            },
          ],
          rows: delberegning
            .map(({ beregnetBidragPerBarn: row, personidentBarn }) => {
              const showBeregningAvU =
                row.beregnetBidrag !== 0 || row.faktiskBeløp !== 0;
              return {
                expandableContent: showBeregningAvU
                  ? [
                      {
                        content: (
                          <CalculationTable
                            width={"200px"}
                            simpleStyling
                            className={"ml-2"}
                            title={`Reduksjon av BPs andel av U`}
                            data={[
                              {
                                label: `Beregnet bidrag`,

                                value: formatterBeløpForBeregning(
                                  row.beregnetBeløp,
                                  true,
                                ),
                              },
                              {
                                label: `Faktisk bidrag`,
                                value: (
                                  <div>
                                    -{" "}
                                    {formatterBeløpForBeregning(
                                      row.faktiskBeløp,
                                      true,
                                    )}
                                  </div>
                                ),
                              },
                            ]}
                            result={{
                              label: "Resultat",
                              value: formatterBeløpForBeregning(
                                row.reduksjonUnderholdskostnad,
                                true,
                              ),
                            }}
                          />
                        ),
                      },
                    ]
                  : undefined,
                columns: [
                  {
                    content: personidentBarn,
                  },
                  {
                    content: row.saksnummer,
                  },
                  {
                    content: formatterBeløpForBeregning(row.løpendeBeløp, true),
                  },
                  {
                    content: formatterBeløpForBeregning(
                      row.samværsfradrag,
                      true,
                    ),
                  },
                  {
                    content: formatterBeløpForBeregning(
                      row.reduksjonUnderholdskostnad,
                      true,
                    ),
                  },
                  {
                    content: formatterBeløpForBeregning(
                      row.beregnetBidrag,
                      true,
                    ),
                  },
                ],
              };
            })
            .concat([
              {
                skipPadding: true,
                columns: [
                  {
                    content: "",
                    colSpan: 4,
                  } as TableColumn,
                  {
                    content: "Beregnet totalbidrag: ",
                    labelBold: true,
                    textAlign: "right",
                    colSpan: 1,
                  } as TableColumn,
                  {
                    textAlign: "center",
                    content: formatterBeløpForBeregning(
                      bidragspliktigesBeregnedeTotalbidrag,
                      true,
                    ),
                  } as TableColumn,
                ] as TableColumn[],
              } as TableRow,
              {
                zebraStripe: false,
                skipPadding: true,
                skipBorderBottom: true,
                columns: [
                  {
                    content: "U = Underholdskostnad, BP = Bidragspliktig",
                    colSpan: 7,
                  },
                ] as TableColumn[],
              } as TableRow,
            ]) as TableRow[],
        }}
      />
    </div>
  );
};
