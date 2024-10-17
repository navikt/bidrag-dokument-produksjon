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
import tekster from "~/tekster";

export const BPsAndel = () => {
  const { data } = useNotatFelles();

  const beregnetSærbidrag = data.vedtak!
    .resultat[0] as NotatResultatSaerbidragsberegningDto;
  const delberegningBpsAndel = beregnetSærbidrag.bpsAndel!;
  const inntekter = beregnetSærbidrag.inntekter!;
  const utgifter = beregnetSærbidrag.delberegningUtgift!;
  return (
    <div style={{ width: "600px" }}>
      <h4>{`${tekster.begreper.bidragspliktiges} andel`}</h4>
      <div>
        <CalculationTabell
          width={"55%"}
          title={"Beregning av total inntekt"}
          labelColWidth={"270px"}
          valueColWidth={"240px"}
          className={"pb-2 "}
          data={[
            {
              label: `${tekster.begreper.bidragspliktiges} inntekt`,
              result: formatterBeløpForBeregning(inntekter.inntektBP, true),
            },
            {
              label: `${tekster.begreper.bidragsmottakerens} inntekt`,
              result: formatterBeløpForBeregning(inntekter.inntektBM, true),
            },
            {
              label: `${tekster.begreper.barnets} inntekt`,
              value:
                inntekter.inntektBarn! > 0 ? (
                  <div>
                    <MathValue value={inntekter.inntektBarn!} /> ç
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
          width={"400px"}
          title={"Beregning av andel prosent"}
          style={{ marginRight: "0" }}
          valueColWidth={"0px"}
          className={"pb-2"}
          data={[
            {
              label: `${tekster.begreper.bidragspliktiges} inntekt`,
              result: formatterBeløpForBeregning(inntekter.inntektBP, true),
            },
            {
              label: "Total inntekt",
              result: (
                <div
                  style={{
                    textWrap: "nowrap",
                    whiteSpace: "nowrap",
                    whiteSpaceTrim: "discard-after",
                  }}
                >
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
            label: `${tekster.begreper.bidragspliktiges} andel`,
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
