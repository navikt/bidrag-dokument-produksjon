import {
  NotatResultatBidragsberegningBarnDto,
  ResultatBarnebidragsberegningPeriodeDto,
} from "~/types/Api";

export function erResutlatMedBeregning(
  data: NotatResultatBidragsberegningBarnDto,
): boolean {
  return data?.perioder.length === 1 && data.perioder[0].erDirekteAvslag;
}

export function erResultatMedIPeriode(
  data: ResultatBarnebidragsberegningPeriodeDto,
): boolean {
  return (
    data.erDirekteAvslag ||
    data.beregningsdetaljer?.sluttberegning?.barnetErSelvforsørget == true
  );
}
