import { Vedtak as VedtakDto } from "~/types/Api";
import DataDescription from "~/components/DataDescription";
import { dateToDDMMYYYY } from "~/utils/date-utils";

export function VedtakFattetDetaljer({ data }: { data: VedtakDto }) {
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
