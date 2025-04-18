import {
  NotatResultatBidragsberegningBarnDto,
  Samvaersklasse,
} from "~/types/Api";
import { useNotatFelles } from "~/components/notat_felles/NotatContext";
import { VedtakFattetDetaljer } from "~/components/notat_felles/components/VedtakFattetDetaljer";
import { formatPeriode, deductDays } from "~/utils/date-utils";
import elementIds from "~/utils/elementIds";
import { groupBy } from "~/utils/array-utils";
import { TableData, CommonTable, TableRow } from "~/components/CommonTable";
import TableGjelderBarn from "~/components/TableGjelderBarn";
import {
  formatterBeløpForBeregning,
  formatterProsent,
} from "~/utils/visningsnavn";
import { DataViewTable, DataViewTableData } from "~/components/DataViewTable";
import { VedleggProps } from "~/types/commonTypes";

export default function Vedtak({ vedleggNummer }: VedleggProps) {
  const { erAvslag, data } = useNotatFelles();
  return (
    <>
      <div className={"elements_inline section-title break-before-page"}>
        <h2 className={"section-title"}>Vedtak</h2>
        {!erAvslag && (
          <a href={`#${elementIds.vedleggBeregningsdetaljer}`}>
            se vedlegg nr. {vedleggNummer} for beregningsdetaljer
          </a>
        )}
      </div>
      {erAvslag ? (
        <VedtakTableAvslag
          data={data.vedtak.resultat as NotatResultatBidragsberegningBarnDto[]}
        />
      ) : (
        <VedtakTable
          data={data.vedtak.resultat as NotatResultatBidragsberegningBarnDto[]}
        />
      )}
      <VedtakFattetDetaljer data={data.vedtak} />
    </>
  );
}

function VedtakTableAvslag({
  data,
}: {
  data: NotatResultatBidragsberegningBarnDto[];
}) {
  const { erOpphør } = useNotatFelles();

  if (data.length == 0) return <div>Mangler resultat</div>;
  return (
    <div style={{ paddingTop: "0px" }}>
      {groupBy(data, (d) => d.barn?.ident!).map(([key, value]) => {
        const gjelderBarn = value[0].barn!;
        const perioder = value[0].perioder;
        const tableData: TableData = {
          headers: [
            { name: "Periode", width: "170px" },
            { name: "Resultat", width: "150px" },
            { name: "Årsak", width: "250px" },
          ],
          rows: perioder.map((d) => ({
            columns: [
              { content: formatPeriode(d.periode!.fom, d.periode!.til) },
              { content: erOpphør ? "Opphør" : "Avslag" },
              { content: d.resultatkodeVisningsnavn },
            ],
          })),
        };
        return (
          <div key={key} className="table_container">
            <TableGjelderBarn gjelderBarn={gjelderBarn} />
            <CommonTable data={tableData} />
          </div>
        );
      })}
    </div>
  );
}

function VedtakTable({
  data,
}: {
  data: NotatResultatBidragsberegningBarnDto[];
}) {
  if (data.length == 0) return <div>Mangler resultat</div>;
  function renderAvslag(d) {
    return [{ content: "", colSpan: 5 }, { content: "Avslag" }];
  }
  function renderResult(d) {
    return [
      { content: formatterBeløpForBeregning(d.underholdskostnad) },
      {
        content: (
          <table>
            <tbody>
              <tr>
                <td className={"w-[25px]"} align={"right"}>
                  {formatterProsent(d.bpsAndelU)}
                </td>
                <td className="w-[5px]">/</td>
                <td>{formatterBeløpForBeregning(d.bpsAndelBeløp)}</td>
              </tr>
            </tbody>
          </table>
        ),
      },
      {
        content: (
          <table>
            <tbody>
              <tr>
                <td className={"w-[25px]"} align="right">
                  {formatterBeløpForBeregning(d.samværsfradrag)}
                </td>
                <td className="w-[5px]">/</td>
                <td>
                  {d.beregningsdetaljer != undefined
                    ? d.beregningsdetaljer!.samværsfradrag?.samværsklasse ===
                      Samvaersklasse.DELT_BOSTED
                      ? "D"
                      : d.beregningsdetaljer!.samværsfradrag
                          ?.samværsklasseVisningsnavn
                    : 0}
                </td>
              </tr>
            </tbody>
          </table>
        ),
      },
      {
        content: (
          <table>
            <tbody>
              <tr>
                <td className={"w-[35px]"} align="right">
                  {formatterBeløpForBeregning(
                    d.beregningsdetaljer?.delberegningBidragsevne
                      ?.bidragsevne ?? 0,
                  )}
                </td>
                <td className="w-[5px]">/</td>
                <td>
                  {formatterBeløpForBeregning(
                    d.beregningsdetaljer?.delberegningBidragsevne
                      ?.sumInntekt25Prosent ?? 0,
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        ),
      },
      { content: formatterBeløpForBeregning(d.beregnetBidrag) },
      { content: formatterBeløpForBeregning(d.faktiskBidrag) },
    ];
  }
  return (
    <>
      {groupBy(data, (d) => d.barn?.ident!).map(([key, value]) => {
        const gjelderBarn = value[0].barn!;
        const perioder = value[0].perioder;
        const tableData: TableData = {
          headers: [
            { name: "U", width: "50px" },
            { name: "BPs andel U", width: "120px" },
            { name: "Samvær", width: "100px" },
            { name: "Evne / 25%", width: "100px" },
            { name: "Beregnet bidrag", width: "80px" },
            { name: "Endelig bidrag", width: "80px" },
          ],
          rows: perioder
            .flatMap((d) => [
              {
                skipBorderBottom: true,
                periodColumn: formatPeriode(
                  d.periode!.fom,
                  deductDays(d.periode!.til, 1),
                ),
                columns: d.beregningsdetaljer?.sluttberegning
                  ?.ikkeOmsorgForBarnet
                  ? renderAvslag(d)
                  : renderResult(d),
              },
              {
                zebraStripe: false,
                skipPadding: true,
                columns: [
                  {
                    colSpan: 8,
                    content: (
                      <DataViewTable
                        className={"pl-0 ml-0"}
                        data={[
                          {
                            label: "Resultat",
                            labelBold: true,
                            value: d.resultatkodeVisningsnavn,
                          },
                        ]}
                      />
                    ),
                  },
                ],
              },
            ])
            .concat([
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              {
                skipBorderBottom: true,
                zebraStripe: false,
                skipPadding: true,
                className: "pt-2",
                columns: [
                  {
                    fullSpan: true,
                    content:
                      "U = Underholdskostnad, BP = Bidragspliktig, BM = Bidragsmottaker",
                  },
                ],
              } as TableRow,
            ]) as TableRow[],
        };
        return (
          <>
            <TableGjelderBarn gjelderBarn={gjelderBarn} />
            {value[0].indeksår && (
              <DataViewTable
                className={"mb-1 mt-2"}
                data={
                  [
                    {
                      label: "Neste indeksår",
                      value: value[0].indeksår,
                    },
                  ].filter((d) => d != null) as DataViewTableData[]
                }
              />
            )}
            {gjelderBarn.innbetaltBeløp && (
              <DataViewTable
                className="mt-2 mb-2"
                data={[
                  {
                    label: "Innbetalt beløp",
                    labelBold: true,
                    value: gjelderBarn.innbetaltBeløp,
                  },
                ]}
              />
            )}
            <CommonTable data={tableData} />
          </>
        );
      })}
    </>
  );
}
