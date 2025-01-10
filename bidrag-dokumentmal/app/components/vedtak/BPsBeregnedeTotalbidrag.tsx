import { NotatDelberegningBidragspliktigesBeregnedeTotalbidragDto } from "~/types/Api";
import { formatterBeløpForBeregning } from "~/utils/visningsnavn";
import tekster from "~/tekster";
import { CommonTable } from "~/components/CommonTable";
import { CalculationTabellV2 } from "~/components/vedtak/CalculationTableV2";

export const BPsBeregnedeTotalbidrag = ({
  delberegning,
}: {
  delberegning: NotatDelberegningBidragspliktigesBeregnedeTotalbidragDto;
}) => {
  const colPaddingClassname = "px-1";
  return (
    <div>
      <h4>{`${tekster.begreper.bidragspliktiges} beregnede totalbidrag`}</h4>
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
              name: "Reduksjon av BPs andel av U*",
            },
            {
              name: "Sum",
            },
          ],
          rows: delberegning.beregnetBidragPerBarnListe
            .map(({ beregnetBidragPerBarn: row, personidentBarn }) => {
              const showBeregningAvU =
                row.beregnetBeløp !== 0 || row.faktiskBeløp !== 0;
              return {
                expandableContent: showBeregningAvU
                  ? [
                      {
                        content: (
                          <CalculationTabellV2
                            width={"200px"}
                            simpleStyling
                            title={`Reduksjon av BPs andel av U*`}
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
                      row.beregnetBeløp,
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
                  },
                  {
                    content: "Beregnet totalbidrag: ",
                    labelBold: true,
                    alignRight: true,
                    colSpan: 1,
                  },
                  {
                    alignRight: true,
                    content: formatterBeløpForBeregning(
                      delberegning.bidragspliktigesBeregnedeTotalbidrag,
                      true,
                    ),
                  },
                ],
              },
              {
                zebraStripe: false,
                skipPadding: true,
                skipBorderBottom: true,
                columns: [
                  {
                    content: "* U = Underholdskostnad, BP = Bidragspliktig",
                    colSpan: 7,
                  },
                ],
              },
            ]),
        }}
      />
    </div>
  );
};
