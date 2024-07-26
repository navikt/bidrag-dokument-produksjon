import { Rolletype, NotatMalType } from "~/types/Api";

export enum InntektTableType {
  SKATTEPLIKTIG = "SKATTEPLIKTIG",
  UTVIDET_BARNETRYGD = "UTVIDET_BARNETRYGD",
  SMÅBARNSTILLEGG = "SMÅBARNSTILLEGG",
  KONTANTSTØTTE = "KONTANTSTØTTE",
  BARNETILLEGG = "BARNETILLEGG",
  BEREGNET_INNTEKTER = "BEREGNET_INNTEKTER",
  TOTAL_INNTEKTER = "TOTAL_INNTEKTER",
}
export type BehandlingRolletype = Rolletype.BP | Rolletype.BM | Rolletype.BA;
export const inntekterTablesViewRules: {
  [key in NotatMalType]: {
    [key in BehandlingRolletype]: InntektTableType[];
  };
} = {
  [NotatMalType.SAeRBIDRAG]: {
    [Rolletype.BM]: [
      InntektTableType.SKATTEPLIKTIG,
      InntektTableType.BARNETILLEGG,
      InntektTableType.UTVIDET_BARNETRYGD,
      InntektTableType.SMÅBARNSTILLEGG,
      InntektTableType.KONTANTSTØTTE,
      InntektTableType.BEREGNET_INNTEKTER,
    ],
    [Rolletype.BP]: [
      InntektTableType.SKATTEPLIKTIG,
      InntektTableType.BARNETILLEGG,
      InntektTableType.BEREGNET_INNTEKTER,
    ],
    [Rolletype.BA]: [
      InntektTableType.SKATTEPLIKTIG,
      InntektTableType.BEREGNET_INNTEKTER,
    ],
  },
  [NotatMalType.BIDRAG]: {
    [Rolletype.BM]: [
      InntektTableType.SKATTEPLIKTIG,
      InntektTableType.BARNETILLEGG,
      InntektTableType.UTVIDET_BARNETRYGD,
      InntektTableType.SMÅBARNSTILLEGG,
      InntektTableType.KONTANTSTØTTE,
      InntektTableType.BEREGNET_INNTEKTER,
    ],
    [Rolletype.BP]: [
      InntektTableType.SKATTEPLIKTIG,
      InntektTableType.BARNETILLEGG,
      InntektTableType.BEREGNET_INNTEKTER,
    ],
    [Rolletype.BA]: [
      InntektTableType.SKATTEPLIKTIG,
      InntektTableType.BEREGNET_INNTEKTER,
    ],
  },
  [NotatMalType.FORSKUDD]: {
    [Rolletype.BM]: [
      InntektTableType.SKATTEPLIKTIG,
      InntektTableType.BARNETILLEGG,
      InntektTableType.UTVIDET_BARNETRYGD,
      InntektTableType.SMÅBARNSTILLEGG,
      InntektTableType.KONTANTSTØTTE,
      InntektTableType.BEREGNET_INNTEKTER,
    ],
    [Rolletype.BP]: [],
    [Rolletype.BA]: [InntektTableType.SKATTEPLIKTIG],
  },
};
