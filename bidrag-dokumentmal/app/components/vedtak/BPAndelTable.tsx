import {
  CalculationTabell,
  MathMultiplication,
  MathValue,
} from "./CalculationTable";
import { useNotatFelles } from "~/components/notat_felles/NotatContext";
import { NotatResultatSaerbidragsberegningDto } from "~/types/Api";
import {
  formatterBeløpForBeregning,
  formatterProsent,
} from "~/utils/visningsnavn";

export const BPsAndel = () => {
  const { data } = useNotatFelles();

  const beregnetSærbidrag = data.vedtak!
    .resultat[0] as NotatResultatSaerbidragsberegningDto;
  const delberegningBpsAndel = beregnetSærbidrag.bpsAndel!;
  const inntekter = beregnetSærbidrag.inntekter!;
  const utgifter = beregnetSærbidrag.delberegningUtgift!;
  return (
    <div style={{ width: "600px" }}>
      <h3>{"BPs andel"}</h3>
      <div>
        <CalculationTabell
          width={"46%"}
          className={"two_column_view_v2 pb-2"}
          data={[
            {
              label: "BPs inntekt",
              result: formatterBeløpForBeregning(inntekter.inntektBP, true),
            },
            {
              label: "BMs inntekt",
              result: formatterBeløpForBeregning(inntekter.inntektBM, true),
            },
            {
              label: "BAs inntekt",
              value:
                inntekter.inntektBarn! > 0 ? (
                  <div>
                    <MathValue value={inntekter.inntektBarn!} /> -{" "}
                    <MathMultiplication
                      left="30"
                      right={beregnetSærbidrag.forskuddssats!}
                    />
                  </div>
                ) : undefined,
              result: formatterBeløpForBeregning(
                inntekter.barnEndeligInntekt,
                true,
              ),
            },
          ]}
          result={{
            label: "Total inntekt",
            value: formatterBeløpForBeregning(
              inntekter.totalEndeligInntekt,
              true,
            ),
          }}
        />
        <CalculationTabell
          width={"50%"}
          style={{ marginRight: "0" }}
          className={"two_column_view_v2"}
          data={[
            {
              label: "BPs inntekt",
              result: formatterBeløpForBeregning(inntekter.inntektBP, true),
            },
            {
              label: "Total inntekt",
              result: (
                <div>
                  &#247;{" "}
                  {formatterBeløpForBeregning(
                    inntekter.totalEndeligInntekt,
                    true,
                  )}
                </div>
              ),
            },
          ]}
          result={{
            label: "BPs andel",
            value: formatterProsent(delberegningBpsAndel.beregnetAndelFaktor),
          }}
          message={
            delberegningBpsAndel.endeligAndelFaktor !==
            delberegningBpsAndel.beregnetAndelFaktor ? (
              <div className="text-red-500" style={{ width: "200px" }}>
                Andel begrenset til{" "}
                {formatterProsent(delberegningBpsAndel.endeligAndelFaktor)}
              </div>
            ) : undefined
          }
        />
      </div>

      <div>
        Andel utgifter:{" "}
        <MathMultiplication
          left={`${formatterBeløpForBeregning(utgifter.sumGodkjent, true)}`}
          right={formatterProsent(delberegningBpsAndel.endeligAndelFaktor)}
        />{" "}
        = {formatterBeløpForBeregning(delberegningBpsAndel.andelBeløp, true)}
      </div>
    </div>
  );
};
