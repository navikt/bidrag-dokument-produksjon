import { NotatDelberegningBidragspliktigesBeregnedeTotalbidragDto } from "~/types/Api";
import { formatterBeløpForBeregning } from "~/utils/visningsnavn";
import { calculationTableBottomBorder } from "~/utils/stylingUtils";
import tekster from "~/tekster";
import { CalculationTabell } from "~/components/vedtak/CalculationTable";
import React from "react";

export const BPsBeregnedeTotalbidrag = ({
  delberegning,
}: {
  delberegning: NotatDelberegningBidragspliktigesBeregnedeTotalbidragDto;
}) => {
  const colPaddingClassname = "px-1";
  return (
    <div>
      <h4>{`${tekster.begreper.bidragspliktiges} beregnede totalbidrag`}</h4>
      <table
        className="table-auto border-collapse text-left border-spacing-2"
        style={{ paddingBottom: "5px", width: "600px" }}
      >
        <thead>
          <tr>
            <th className="pr-1 w-[100px]">{"Barn"}</th>
            <th className={`${colPaddingClassname} w-[100px]`}>
              {"Saksnummer"}
            </th>
            <th className={`${colPaddingClassname} text-right w-[100px]`}>
              {"Løpende bidrag"}
            </th>
            <th className={`${colPaddingClassname} text-right w-[100px]`}>
              {"Samvær"}
            </th>
            <th
              className={`${colPaddingClassname} text-right whitespace-pre-wrap w-[120px]`}
            >
              {`Reduksjon av BPs andel av U*`}
            </th>
            <th className={`${colPaddingClassname} text-right w-[70px]`}>
              {"Sum"}
            </th>
          </tr>
        </thead>
        <tbody>
          {delberegning.beregnetBidragPerBarnListe.map(
            ({ beregnetBidragPerBarn: row, personidentBarn }, rowIndex) => {
              const showBeregningAvU =
                row.beregnetBeløp !== 0 || row.faktiskBeløp !== 0;
              return (
                <React.Fragment key={rowIndex}>
                  <tr key={rowIndex}>
                    <td className="pr-1 w-[100px]">{personidentBarn}</td>
                    <td className={`${colPaddingClassname}`}>
                      {row.saksnummer}
                    </td>
                    <td className={`${colPaddingClassname} text-right`}>
                      {formatterBeløpForBeregning(row.løpendeBeløp, true)}
                    </td>
                    <td className={`${colPaddingClassname} text-right`}>
                      {formatterBeløpForBeregning(row.samværsfradrag, true)}
                    </td>
                    <td className={`${colPaddingClassname} text-right`}>
                      {formatterBeløpForBeregning(
                        row.reduksjonUnderholdskostnad,
                        true,
                      )}
                    </td>

                    <td className={`${colPaddingClassname} text-right`}>
                      {formatterBeløpForBeregning(row.beregnetBeløp, true)}
                    </td>
                  </tr>
                  {showBeregningAvU && (
                    <tr>
                      <td
                        colSpan={7}
                        className={
                          "table_row_details border-b-2 border-b-black border-solid border-0 w-full"
                        }
                        style={{ paddingTop: "8px" }}
                      >
                        <CalculationTabell
                          width={"200px"}
                          title={`Reduksjon av BPs andel av U*`}
                          labelColWidth={"150px"}
                          valueColWidth={"100px"}
                          className={"pb-2 "}
                          data={[
                            {
                              label: `Beregnet bidrag`,
                              result: formatterBeløpForBeregning(
                                row.beregnetBeløp,
                                true,
                              ),
                            },
                            {
                              label: `Faktisk bidrag`,
                              result: (
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
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            },
          )}
          <tr>
            <td className={`text-right ${calculationTableBottomBorder}`}></td>
            <td className={`text-right ${calculationTableBottomBorder}`}></td>
            <td className={`text-right ${calculationTableBottomBorder}`}></td>
            <td className={`text-right ${calculationTableBottomBorder}`}></td>
            <td className={`text-right ${calculationTableBottomBorder}`}>
              {"Beregnet totalbidrag:"}
            </td>
            <td
              className={`${colPaddingClassname} text-right ${calculationTableBottomBorder}`}
            >
              {formatterBeløpForBeregning(
                delberegning.bidragspliktigesBeregnedeTotalbidrag,
                true,
              )}
            </td>
          </tr>
          <tr>
            <td colSpan={7}>* U = Underholdskostnad, BP = Bidragspliktig</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
