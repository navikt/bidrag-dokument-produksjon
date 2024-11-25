import { DataViewTable, DataViewTableData } from "~/components/DataViewTable";
import { formatterBeløpForBeregning } from "~/utils/visningsnavn";
import { useBeregningDetaljer } from "~/routes/notat.bidrag/VedleggBeregningsDetaljer";

export const EndeligBidragTable = () => {
  const {
    deltBosted,
    sluttberegning,
    samværsfradrag: beregning,
  } = useBeregningDetaljer();

  return (
    <div style={{ width: "600px" }}>
      <h4>{`Endelig bidrag`}</h4>
      <DataViewTable
        gap={"5px"}
        data={
          [
            !deltBosted
              ? {
                  label: "Etter samværsfradraget",
                  textRight: false,
                  labelBold: true,
                  value: `${formatterBeløpForBeregning(sluttberegning.bruttoBidragEtterBarnetilleggBP)} - ${formatterBeløpForBeregning(beregning.samværsfradrag)} = ${formatterBeløpForBeregning(sluttberegning.beregnetBeløp)}`,
                }
              : null,
            {
              label: "Avrundet beløp",
              textRight: false,
              labelBold: true,
              value: `${formatterBeløpForBeregning(sluttberegning.resultatBeløp)}`,
            },
          ].filter((d) => d != null) as DataViewTableData[]
        }
      />
    </div>
  );
};
