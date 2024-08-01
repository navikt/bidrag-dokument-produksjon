import { Vedtak as VedtakDto } from "~/types/Api";
import { dateToDDMMYYYY } from "~/utils/date-utils";
import { DataViewTable } from "~/components/DataViewTable";

export function VedtakFattetDetaljer({ data }: { data: VedtakDto }) {
  if (!data.erFattet) return null;
  return (
    <div>
      <h2 style={{ marginBottom: "0" }}>Ferdigstilt</h2>
      <DataViewTable
        labelColWidth={"90px"}
        data={[
          {
            label: "Saksbehandler",
            value: data.fattetAvSaksbehandler,
          },
          {
            label: "Dato",
            value: dateToDDMMYYYY(data.fattetTidspunkt),
          },
        ]}
      />
    </div>
  );
}
