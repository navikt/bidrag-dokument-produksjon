import { NotatResultatBidragsberegningBarnDto } from "~/types/Api";
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
import { DataViewTable } from "~/components/DataViewTable";

export default function Vedtak() {
  const { erAvslag, data } = useNotatFelles();
  return (
    <div>
      <div
        style={{
          pageBreakBefore: erAvslag ? "auto" : "always",
          display: "inline-block",
        }}
      >
        <div className={"elements_inline"}>
          <h2>Vedtak</h2>
          <a href={`#${elementIds.vedleggBeregningsdetaljer}`}>
            se vedlegg nr. 3 for beregningsdetaljer
          </a>
        </div>
        <VedtakTable
          data={data.vedtak.resultat as NotatResultatBidragsberegningBarnDto[]}
        />
      </div>
      <VedtakFattetDetaljer data={data.vedtak} />
    </div>
  );
}

function VedtakTable({
  data,
}: {
  data: NotatResultatBidragsberegningBarnDto[];
}) {
  if (data.length == 0) return <div>Mangler resultat</div>;
  return (
    <div style={{ paddingTop: "0px" }}>
      {groupBy(data, (d) => d.barn?.ident!).map(([key, value]) => {
        const gjelderBarn = value[0].barn!;
        const perioder = value[0].perioder;
        const tableData: TableData = {
          headers: [
            { name: "U", width: "50px" },
            { name: "BPs andel U", width: "120px" },
            { name: "Samværsfradrag", width: "100px" },
            { name: "Beregnet bidrag", width: "60px" },
            { name: "Endelig bidrag", width: "60px" },
          ],
          rows: perioder
            .flatMap((d) => [
              {
                skipBorderBottom: true,
                periodColumn: formatPeriode(
                  d.periode!.fom,
                  deductDays(d.periode!.til, 1),
                ),
                columns: [
                  { content: formatterBeløpForBeregning(d.underholdskostnad) },
                  {
                    content: (
                      <table>
                        <tbody>
                          <tr>
                            <td className="w-[45px]">
                              {formatterProsent(d.bpsAndelU)}
                            </td>
                            <td className="w-[5px]">/</td>
                            <td className="w-[45px]">
                              {formatterBeløpForBeregning(d.bpsAndelBeløp)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ),
                  },
                  { content: formatterBeløpForBeregning(d.samværsfradrag) },
                  { content: formatterBeløpForBeregning(d.beregnetBidrag) },
                  { content: formatterBeløpForBeregning(d.faktiskBidrag) },
                ],
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
          <div key={key} className="table_container mb-medium mt-medium">
            <TableGjelderBarn gjelderBarn={gjelderBarn} />
            <CommonTable data={tableData} width={"550px"} />
          </div>
        );
      })}
    </div>
  );
}
