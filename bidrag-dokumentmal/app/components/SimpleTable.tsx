import { Kilde, TypeArManedsperiode } from "~/types/Api";
import { formatPeriode } from "~/utils/date-utils";
import KildeIcon from "~/components/KildeIcon";
import tekster from "~/tekster";

type TableData = {
  periode: TypeArManedsperiode;
  statusVisningsnavn?: string;
  kilde: Kilde;
};

type SimpleTableProps = {
  data: TableData[];
};

export function SimpleTable({ data }: SimpleTableProps) {
  return (
    <table className="table" style={{ breakBefore: "recto" }}>
      <tr>
        <th style={{ width: "150px" }}>{tekster.tabell.felles.fraTilOgMed}</th>
        <th style={{ width: "150px" }}>{tekster.tabell.felles.status}</th>
        <th>Kilde</th>
      </tr>
      {data.map((d, i) => (
        <tr key={d.statusVisningsnavn + i.toString()}>
          <td>{formatPeriode(d.periode.fom, d.periode.til)}</td>
          <td>{d.statusVisningsnavn}</td>
          <td>{<KildeIcon kilde={d.kilde} />}</td>
        </tr>
      ))}
    </table>
  );
}
