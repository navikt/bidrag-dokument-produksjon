import { NotatForskuddProps, useNotat } from "~/routes/notat.forskudd/route";
import { groupBy } from "~/utils/array-utils";
import {
  NotatResultatBeregningBarnDto,
  Vedtak as VedtakDto,
} from "~/types/Api";
import { dateToDDMMYYYY, formatPeriode } from "~/utils/date-utils";
import TableGjelderBarn from "~/components/TableGjelderBarn";
import Datadisplay from "~/components/Datadisplay";

export default function Vedtak({ data }: NotatForskuddProps) {
  const { erAvslag } = useNotat();
  return (
    <div style={{ pageBreakBefore: erAvslag ? "auto" : "always" }}>
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
      <h3>Vedtak fattet:</h3>
      <Datadisplay label={"Saksbehandler"} value={data.fattetAvSaksbehandler} />
      <Datadisplay
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
  if (data.length == 0) return <div>Mangler resultat</div>;
  return (
    <div style={{ paddingTop: "10px" }}>
      {groupBy(data, (d) => d.barn?.ident!).map(([key, value]) => {
        const gjelderBarn = value[0].barn!;
        const perioder = value[0].perioder;
        return (
          <div key={key} className="background_section">
            <TableGjelderBarn gjelderBarn={gjelderBarn} />
            <table className="table" style={{ width: "500px" }}>
              <tr>
                <th style={{ width: "170px" }}>Periode</th>
                <th style={{ width: "150px" }}>Resultat</th>
                <th style={{ width: "150px" }}>Årsak</th>
              </tr>
              {perioder.map((d) => {
                return (
                  <tr key={d.periode.fom}>
                    <td>{formatPeriode(d.periode!.fom, d.periode!.til)}</td>
                    <td>Avslag</td>
                    <td>{d.resultatKodeVisningsnavn}</td>
                  </tr>
                );
              })}
            </table>
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
        return (
          <div key={key} className="background_section">
            <TableGjelderBarn gjelderBarn={gjelderBarn} />
            <table className="table" style={{ width: "710px" }}>
              <tr>
                <th style={{ width: "170px" }}>Periode</th>
                <th>Inntekt</th>
                <th style={{ width: "140px" }}>Sivilstand</th>
                <th style={{ width: "80px" }}>Antall barn i husstand</th>
                <th style={{ width: "80px" }}>Forskudd</th>
                <th style={{ width: "150px" }}>Resultat</th>
              </tr>
              {perioder.map((d) => {
                return (
                  <tr key={d.periode.fom}>
                    <td>{formatPeriode(d.periode!.fom, d.periode!.til)}</td>
                    <td>{d.inntekt}</td>
                    <td>{d.sivilstandVisningsnavn}</td>
                    <td>{d.antallBarnIHusstanden}</td>
                    <td>{d.beløp}</td>
                    <td>{d.resultatKodeVisningsnavn}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        );
      })}
    </div>
  );
}
