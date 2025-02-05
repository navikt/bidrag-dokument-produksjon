import { DataViewTable, DataViewTableData } from "~/components/DataViewTable";
import { formatterBeløpForBeregning } from "~/utils/visningsnavn";
import { useBeregningDetaljer } from "~/routes/notat.bidrag/VedleggBeregningsDetaljer";

export const BeregningBegrensetRevurdering = () => {
  const { sluttberegning, samværsfradrag } = useBeregningDetaljer();

  return (
    <div style={{ width: "600px" }}>
      <h4>{`Begrenset revurdering`}</h4>
      <DataViewTable
        gap={"5px"}
        data={
          [
            {
              label: "Løpende forskudd",
              textRight: false,
              labelBold: true,
              value: `${formatterBeløpForBeregning(sluttberegning.løpendeForskudd ?? 0)}`,
            },
            {
              label: "Løpende bidrag",
              textRight: false,
              labelBold: true,
              value: `${formatterBeløpForBeregning(sluttberegning.løpendeBidrag ?? 0)}`,
            },
            {
              label: "Foreløpig bidrag",
              textRight: false,
              labelBold: true,
              value: `${formatterBeløpForBeregning(sluttberegning.løpendeForskudd ?? 0)} + ${formatterBeløpForBeregning(samværsfradrag.samværsfradrag)}`,
              result: `${formatterBeløpForBeregning(sluttberegning.bruttoBidragEtterBegrensetRevurdering)}`,
            },
          ].filter((d) => d != null) as DataViewTableData[]
        }
      />
    </div>
  );
};
