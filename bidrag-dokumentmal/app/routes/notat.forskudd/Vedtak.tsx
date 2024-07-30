import { groupBy } from "~/utils/array-utils";
import { deductDays, formatPeriode } from "~/utils/date-utils";
import TableGjelderBarn from "~/components/TableGjelderBarn";
import { formatterBeløp } from "~/utils/visningsnavn";
import { CommonTable, TableData } from "~/components/CommonTable";
import { useNotatFelles } from "~/components/notat_felles/NotatContext";
import { VedtakFattetDetaljer } from "~/components/notat_felles/components/VedtakFattetDetaljer";
import { NotatResultatForskuddBeregningBarnDto } from "~/types/Api";

export default function Vedtak() {
  const { erAvslag, data } = useNotatFelles();
  return (
    <div
      className={"section"}
      style={{ pageBreakBefore: erAvslag ? "auto" : "always" }}
    >
      <h2>Vedtak</h2>
      {erAvslag ? (
        <VedtakTableAvslag
          data={data.vedtak.resultat as NotatResultatForskuddBeregningBarnDto[]}
        />
      ) : (
        <VedtakTable
          data={data.vedtak.resultat as NotatResultatForskuddBeregningBarnDto[]}
        />
      )}
      <VedtakFattetDetaljer data={data.vedtak} />
    </div>
  );
}

function VedtakTableAvslag({
  data,
}: {
  data: NotatResultatForskuddBeregningBarnDto[];
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
            { name: "Årsak", width: "150px" },
          ],
          rows: perioder.map((d) => ({
            columns: [
              { content: formatPeriode(d.periode!.fom, d.periode!.til) },
              { content: erOpphør ? "Opphør" : "Avslag" },
              { content: d.resultatKodeVisningsnavn },
            ],
          })),
        };
        return (
          <div key={key} className="table_container">
            <TableGjelderBarn gjelderBarn={gjelderBarn} />
            <CommonTable width={"500px"} data={tableData} />
            <div
              className="horizontal-line"
              style={{
                pageBreakAfter: "avoid",
                marginBottom: "24px",
              }}
            ></div>
          </div>
        );
      })}
    </div>
  );
}

function VedtakTable({
  data,
}: {
  data: NotatResultatForskuddBeregningBarnDto[];
}) {
  if (data.length == 0) return <div>Mangler resultat</div>;
  return (
    <div style={{ paddingTop: "0px" }}>
      {groupBy(data, (d) => d.barn?.ident!).map(([key, value]) => {
        const gjelderBarn = value[0].barn!;
        const perioder = value[0].perioder;
        const tableData: TableData = {
          headers: [
            { name: "Periode", width: "140px" },
            { name: "Inntekt", width: "90px" },
            { name: "Sivilstand", width: "130px" },
            { name: "Antall barn i husstand", width: "80px" },
            { name: "Forskudd", width: "70px" },
            { name: "Resultat", width: "200px" },
          ],
          rows: perioder.map((d) => ({
            columns: [
              {
                content: formatPeriode(
                  d.periode!.fom,
                  deductDays(d.periode!.til, 1),
                ),
              },
              { content: formatterBeløp(d.inntekt) },
              { content: d.sivilstandVisningsnavn },
              { content: d.antallBarnIHusstanden },
              { content: formatterBeløp(d.beløp) },
              { content: d.resultatKodeVisningsnavn },
            ],
          })),
        };
        return (
          <div key={key} className="table_container">
            <TableGjelderBarn gjelderBarn={gjelderBarn} />
            <CommonTable data={tableData} width={"710px"} />
            <div
              className="horizontal-line"
              style={{
                pageBreakAfter: "avoid",
              }}
            ></div>
          </div>
        );
      })}
    </div>
  );
}
