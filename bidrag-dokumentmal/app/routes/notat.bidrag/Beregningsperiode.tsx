import { dateToDDMMYYYY, deductDays } from "~/utils/date-utils";
import { useNotatFelles } from "~/components/notat_felles/NotatContext";
import { DataViewTable } from "~/components/DataViewTable";
import { BeregnTil, NotatMalType, Vedtakstype } from "~/types/Api";

export default function Beregningsperiode() {
  const { data, type } = useNotatFelles();
  const virkningstidspunkt = data.virkningstidspunkt;
  const skalViseBeregningsperiode =
    type == NotatMalType.BIDRAG && data.erOrkestrertVedtak;
  if (!skalViseBeregningsperiode) return null;
  const erKlage = data.behandling.vedtakstype === Vedtakstype.KLAGE;
  function beregningsperiodeVisningsnavn() {
    switch (virkningstidspunkt.beregnTil) {
      case BeregnTil.ETTERFOLGENDEMANUELLVEDTAK:
        return `Til etterfølgende vedtak med virkningstidspunkt ${dateToDDMMYYYY(virkningstidspunkt.etterfølgendeVedtakVirkningstidspunkt as string)}`;
      case BeregnTil.INNEVAeRENDEMANED:
        return "Ut inneværende måned";
      case BeregnTil.OMGJORT_VEDTAK_VEDTAKSTIDSPUNKT:
        return `Ut måneden ${erKlage ? "påklagd" : "omgjort"} vedtak ble fattet`;
      case BeregnTil.OPPRINNELIG_VEDTAKSTIDSPUNKT:
        return `Ut måneden opprinnelig vedtak ble fattet`;
    }
  }
  return (
    <div className={"virkningstidspunkt pt-1"}>
      <div>
        <div className={"flex flex-row justify-between w-[500px]"}>
          <DataViewTable
            labelColWidth={"140px"}
            data={[
              {
                label: "Periode vedtaket vurderes",
                value: beregningsperiodeVisningsnavn(),
              },
              {
                label: "Beregningsperiode",
                value: `${dateToDDMMYYYY(virkningstidspunkt.virkningstidspunkt as string)} - ${dateToDDMMYYYY(deductDays(virkningstidspunkt.beregnTilDato as string, 1))}`,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
