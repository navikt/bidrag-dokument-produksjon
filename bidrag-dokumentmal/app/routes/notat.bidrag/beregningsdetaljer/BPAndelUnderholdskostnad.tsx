import {
  formatterBeløpForBeregning,
  formatterProsent,
} from "~/utils/visningsnavn";
import tekster from "~/tekster";
import { DataViewTable, DataViewTableData } from "~/components/DataViewTable";
import BPsAndelInntekterTable from "~/components/vedtak/BPsAndelInntekterTable";
import { useBeregningDetaljer } from "~/routes/notat.bidrag/VedleggBeregningsDetaljer";

export const BPAndelUnderholdskostnad = () => {
  const {
    sluttberegning,
    deltBosted,
    inntekter,
    delberegningUnderholdskostnad,
    forskuddssats,
    bpsAndel,
  } = useBeregningDetaljer();
  return (
    <div style={{ width: "600px" }}>
      <h4>{`${tekster.begreper.bidragspliktiges} andel`}</h4>
      <div>
        <BPsAndelInntekterTable
          inntekter={inntekter!}
          forskuddssats={forskuddssats}
        />
        <DataViewTable
          gap={"5px"}
          data={
            [
              {
                label: "BP's andel av underholdskostnad (i prosent)",
                value: `${formatterBeløpForBeregning(inntekter.inntektBP)} / ${formatterBeløpForBeregning(inntekter.totalEndeligInntekt)} = ${formatterProsent(bpsAndel.beregnetAndelFaktor)}`,
              },
              {
                label: "Andel underholdskostnad",
                value: `${formatterBeløpForBeregning(delberegningUnderholdskostnad.underholdskostnad)} x ${formatterProsent(bpsAndel.endeligAndelFaktor)} = ${formatterBeløpForBeregning(bpsAndel.andelBeløp)}`,
              },
              deltBosted
                ? {
                    label: "Etter fratrekk delt bosted",
                    textRight: false,
                    value: `${formatterBeløpForBeregning(bpsAndel.andelBeløp, true)} - ${formatterBeløpForBeregning(delberegningUnderholdskostnad.underholdskostnad)} x ${formatterProsent(0.5)} = ${formatterBeløpForBeregning(sluttberegning.bpAndelAvUVedDeltBostedBeløp)}`,
                  }
                : null,
            ].filter((d) => d != null) as DataViewTableData[]
          }
        />
      </div>
    </div>
  );
};
