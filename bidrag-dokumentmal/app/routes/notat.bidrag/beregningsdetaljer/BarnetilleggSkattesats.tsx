import { Rolletype } from "~/types/Api";
import { useBeregningDetaljer } from "~/routes/notat.bidrag/VedleggBeregningsDetaljer";
import { CalculationTabell } from "~/components/vedtak/CalculationTable";
import {
  formatterBeløpForBeregning,
  formatterProsent,
  rolleTilVisningsnavn,
} from "~/utils/visningsnavn";
import { DataViewTable } from "~/components/DataViewTable";

export const BarnetilleggSkattesats = ({ rolle }: { rolle: Rolletype }) => {
  const { barnetilleggBP, barnetilleggBM } = useBeregningDetaljer();

  const barnetillegg = rolle == Rolletype.BP ? barnetilleggBP : barnetilleggBM;
  const barnetilleggSkattesats = barnetillegg.delberegningSkattesats;

  if (barnetilleggSkattesats == null) return null;
  return (
    <div className={"mb-2"}>
      <h4>{`Beregning av skatteprosent (${rolleTilVisningsnavn(rolle)})`}</h4>
      <CalculationTabell
        data={[
          {
            label: "Skatt",
            result: formatterBeløpForBeregning(
              barnetilleggSkattesats.skattAlminneligInntekt,
              true,
            ),
          },
          {
            label: "Trygdeavgift",
            result: formatterBeløpForBeregning(
              barnetilleggSkattesats.trygdeavgift,
              true,
            ),
          },
          {
            label: "Trinnskatt",
            result: formatterBeløpForBeregning(
              barnetilleggSkattesats.trinnskatt,
              true,
            ),
          },
        ]}
        result={{
          label: "Sum skatt",
          value: formatterBeløpForBeregning(
            barnetilleggSkattesats.sumSkatt,
            true,
          ),
        }}
      />
      <DataViewTable
        data={[
          {
            label: "Inntekt",
            textRight: false,
            labelBold: true,
            value: formatterBeløpForBeregning(
              barnetilleggSkattesats.sumInntekt,
            ),
          },
          {
            label: "Skatteprosent",
            textRight: false,
            labelBold: true,
            value: `${formatterBeløpForBeregning(barnetilleggSkattesats.sumSkatt, true)} / ${formatterBeløpForBeregning(barnetilleggSkattesats.sumInntekt)} = ${formatterProsent(barnetilleggSkattesats.skattFaktor)}`,
          },
        ].filter((d) => d)}
      />
    </div>
  );
};
