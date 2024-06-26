import { NotatForskuddProps, useNotat } from "~/routes/notat.forskudd/route";
import { groupBy } from "~/utils/array-utils";
import {
  NotatResultatBeregningBarnDto,
  Vedtak as VedtakDto,
} from "~/types/Api";
import { dateToDDMMYYYY, deductDays, formatPeriode } from "~/utils/date-utils";
import TableGjelderBarn from "~/components/TableGjelderBarn";
import DataDescription from "~/components/DataDescription";
import { formatterBeløp } from "~/utils/visningsnavn";
import { CommonTable, TableData } from "~/components/CommonTable";

export default function Vedtak({ data }: NotatForskuddProps) {
  const { erAvslag } = useNotat();
  return (
    <div
      className={"section"}
      style={{ pageBreakBefore: erAvslag ? "auto" : "always" }}
    >
      <h2>Vedtak</h2>
      {erAvslag ? (
        <VedtakTableAvslag data={data.vedtak.resultat} />
      ) : (
        <VedtakTable data={data.vedtak.resultat} />
      )}
      <VedtakFattetDetaljer data={data.vedtak} />
    </div>
  );
}

function VedtakFattetDetaljer({ data }: { data: VedtakDto }) {
  if (!data.erFattet) return null;
  return (
    <div>
      <h4 style={{ marginBottom: "0" }}>Ferdigstilt</h4>
      <DataDescription
        label={"Saksbehandler"}
        value={data.fattetAvSaksbehandler}
      />
      <DataDescription
        label={"Dato"}
        value={dateToDDMMYYYY(data.fattetTidspunkt)}
      />
    </div>
  );
}
function VedtakTableAvslag({
  data,
}: {
  data: NotatResultatBeregningBarnDto[];
}) {
  const { erOpphør } = useNotat();

  if (data.length == 0) return <div>Mangler resultat</div>;
  return (
    <div style={{ paddingTop: "10px" }}>
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

function VedtakTable({ data }: { data: NotatResultatBeregningBarnDto[] }) {
  if (data.length == 0) return <div>Mangler resultat</div>;
  return (
    <div style={{ paddingTop: "10px" }}>
      {groupBy(data, (d) => d.barn?.ident!).map(([key, value]) => {
        const gjelderBarn = value[0].barn!;
        const perioder = value[0].perioder;
        const tableData: TableData = {
          headers: [
            { name: "Periode", width: "170px" },
            { name: "Inntekt" },
            { name: "Sivilstand", width: "140px" },
            { name: "Antall barn i husstand", width: "80px" },
            { name: "Forskudd", width: "80px" },
            { name: "Resultat", width: "150px" },
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
