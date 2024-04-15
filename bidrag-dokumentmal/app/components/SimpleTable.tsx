import { Kilde, TypeArManedsperiode } from "~/types/Api";
import { formatPeriode } from "~/utils/date-utils";
import KildeIcon from "~/components/KildeIcon";

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
    <table className="table">
      <tr>
        <th style={{ width: "180px" }}>Fra og med - Til og med</th>
        <th style={{ width: "180px" }}>Status</th>
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
