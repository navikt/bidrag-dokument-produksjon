import {
  CalculationTabell,
  MathDivision,
  MathMultiplication,
  MathValue,
} from "./CalculationTable";
import { formatterBeløpForBeregning } from "~/utils/visningsnavn";
import tekster from "~/tekster";
import {
  NotatDelberegningBidragsevneDto,
  NotatResultatBeregningInntekterDto,
} from "~/types/Api";

export const BPsEvneTable = ({
  delberegningBidragsevne,
  inntekter,
}: {
  delberegningBidragsevne: NotatDelberegningBidragsevneDto;
  inntekter: NotatResultatBeregningInntekterDto;
}) => {
  return (
    <CalculationTabell
      title={`${tekster.begreper.bidragspliktiges} evne`}
      tableWidth={"600px"}
      data={[
        {
          label: "Inntekt",
          value: (
            <MathDivision
              top={`${formatterBeløpForBeregning(inntekter.inntektBP, true)}/år`}
              bottom={12}
            />
          ),
          result: (
            <MathValue
              value={formatterBeløpForBeregning(
                inntekter.inntektBPMånedlig,
                true,
              )}
            />
          ),
        },
        {
          label: "Skatt",
          value: (
            <MathDivision
              negativeValue
              top={`${formatterBeløpForBeregning(delberegningBidragsevne.skatt.skattAlminneligInntekt, true)}/år`}
              bottom={12}
            />
          ),
          result: (
            <MathValue
              negativeValue
              value={formatterBeløpForBeregning(
                delberegningBidragsevne.skatt.skattAlminneligInntektMånedsbeløp,
                true,
              )}
            />
          ),
        },
        {
          label: "Trygdeavgift",
          value: (
            <MathDivision
              negativeValue
              top={`${formatterBeløpForBeregning(delberegningBidragsevne.skatt.trygdeavgift, true)}/år`}
              bottom={12}
            />
          ),
          result: (
            <MathValue
              negativeValue
              value={formatterBeløpForBeregning(
                delberegningBidragsevne.skatt.trygdeavgiftMånedsbeløp,
                true,
              )}
            />
          ),
        },
        {
          label: "Trinnskatt",
          value: (
            <MathDivision
              negativeValue
              top={`${formatterBeløpForBeregning(delberegningBidragsevne.skatt.trinnskatt, true)}/år`}
              bottom={12}
            />
          ),
          result: (
            <MathValue
              negativeValue
              value={formatterBeløpForBeregning(
                delberegningBidragsevne.skatt.trinnskattMånedsbeløp,
                true,
              )}
            />
          ),
        },
        {
          label: "Underhold egne barn i husstand",
          value: (
            <MathMultiplication
              negativeValue
              left={`${formatterBeløpForBeregning(delberegningBidragsevne.underholdEgneBarnIHusstand.sjablon, true)}`}
              right={
                delberegningBidragsevne.underholdEgneBarnIHusstand
                  .antallBarnIHusstanden
              }
            />
          ),
          result: (
            <MathValue
              negativeValue
              value={formatterBeløpForBeregning(
                delberegningBidragsevne.underholdEgneBarnIHusstand.måndesbeløp,
                true,
              )}
            />
          ),
        },
        {
          label: "Boutgift",
          value: delberegningBidragsevne.utgifter.borMedAndreVoksne
            ? "Bor med andre voksne"
            : "Bor ikke med andre voksne",
          result: (
            <MathValue
              negativeValue
              value={formatterBeløpForBeregning(
                delberegningBidragsevne.utgifter.boutgiftBeløp,
                true,
              )}
            />
          ),
        },
        {
          label: "Eget underhold",
          value: delberegningBidragsevne.utgifter.borMedAndreVoksne
            ? "Bor med andre voksne"
            : "Bor ikke med andre voksne",
          result: (
            <MathValue
              negativeValue
              value={formatterBeløpForBeregning(
                delberegningBidragsevne.utgifter.underholdBeløp,
                true,
              )}
            />
          ),
        },
      ]}
      result={{
        label: "Bidragsevne",
        value: formatterBeløpForBeregning(
          delberegningBidragsevne.bidragsevne,
          true,
        ),
      }}
    />
  );
};
