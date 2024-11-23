import { DataViewTable, DataViewTableData } from "~/components/DataViewTable";
import {
  formatterBeløpForBeregning,
  formatterProsent,
  rolleTilVisningsnavn,
} from "~/utils/visningsnavn";
import {
  DelberegningUnderholdskostnad,
  NotatDelberegningBarnetilleggDto,
  Rolletype,
  SluttberegningBarnebidrag,
} from "~/types/Api";
import { CommonTable } from "~/components/CommonTable";
import { useBeregningDetaljer } from "~/routes/notat.bidrag/VedleggBeregningsDetaljer";

export const NettoBarnetilleggTable = ({ rolle }: { rolle: Rolletype }) => {
  const {
    sluttberegning,
    delberegningUnderholdskostnad: underholdskostnad,
    barnetilleggBP,
    barnetilleggBM,
    inntekter,
  } = useBeregningDetaljer();

  const barnetillegg = rolle == Rolletype.BP ? barnetilleggBP : barnetilleggBM;
  const inntekt =
    rolle == Rolletype.BP ? inntekter?.inntektBP : inntekter?.inntektBM;
  return (
    <div style={{ width: "600px" }}>
      <h4>{`Netto barnetillegg (${rolleTilVisningsnavn(rolle)})`}</h4>
      <DataViewTable
        gap={"5px"}
        data={
          [
            {
              label: "Skatteprosent",
              labelBold: true,
              value: formatterProsent(barnetillegg.skattFaktor),
            },
            {
              label: "Inntekt siste 12 mnd",
              labelBold: true,
              value: formatterBeløpForBeregning(inntekt),
            },
          ].filter((d) => d != null) as DataViewTableData[]
        }
      />
      <CommonTable
        layoutAuto
        data={{
          headers: [
            {
              name: "Type barnetillegg",
              width: "250px",
            },
            {
              name: "Brutto",
              width: "50px",
            },
            {
              name: "Netto",
              width: "50px",
            },
          ],
          rows: barnetillegg.barnetillegg
            .map((bt) => ({
              borderBottom: true,
              columns: [
                {
                  content: bt.visningsnavn,
                  colSpan: 1,
                },
                {
                  content: formatterBeløpForBeregning(bt.bruttoBeløp, true),
                },
                {
                  content: formatterBeløpForBeregning(bt.nettoBeløp, true),
                },
              ],
            }))
            .concat([
              {
                columns: [
                  {
                    content: "Resultat",
                    colSpan: 2,
                  },
                  {
                    content: formatterBeløpForBeregning(
                      barnetillegg!.nettoBeløp,
                    ),
                  },
                ],
                borderBottom: true,
              },
            ]),
        }}
      />
      {rolle == Rolletype.BP ? (
        <BeregningJusterBPsBarnetillegg sluttberegning={sluttberegning!} />
      ) : (
        <BeregningJusterBMsBarnetillegg
          sluttberegning={sluttberegning!}
          underholdskostnad={underholdskostnad!}
          barnetilleggBM={barnetillegg}
        />
      )}
    </div>
  );
};
export const BeregningJusterBPsBarnetillegg = ({
  sluttberegning,
}: {
  sluttberegning: SluttberegningBarnebidrag;
}) => {
  function renderResult() {
    if (sluttberegning.bidragJustertForNettoBarnetilleggBP) {
      return ` (justert opp til BPs netto barnetillegg)`;
    }
    return "";
  }
  function hentForeløpigBidrag() {
    if (sluttberegning.bidragJustertForNettoBarnetilleggBP)
      return formatterBeløpForBeregning(
        sluttberegning.bruttoBidragEtterBarnetilleggBP,
      );
    return formatterBeløpForBeregning(
      sluttberegning.bruttoBidragJustertForEvneOg25Prosent,
    );
  }
  return (
    <DataViewTable
      gap={"5px"}
      data={
        [
          {
            label: "Foreløpig bidrag",
            labelBold: true,
            value: `${hentForeløpigBidrag()}${renderResult()}`,
          },
        ].filter((d) => d != null) as DataViewTableData[]
      }
    />
  );
};
export const BeregningJusterBMsBarnetillegg = ({
  barnetilleggBM,
  sluttberegning,
  underholdskostnad,
}: {
  underholdskostnad: DelberegningUnderholdskostnad;
  sluttberegning: SluttberegningBarnebidrag;
  barnetilleggBM: NotatDelberegningBarnetilleggDto;
}) => {
  function renderResult() {
    if (sluttberegning.bidragJustertForNettoBarnetilleggBM) {
      return ` (justert til U - BMs netto barnetillegg + samværsfradrag)`;
    }
    return "";
  }

  return (
    <DataViewTable
      gap={"5px"}
      data={
        [
          {
            label: "U - BMs netto barnetillegg",
            labelBold: true,
            value: `${formatterBeløpForBeregning(underholdskostnad.underholdskostnad)} - ${formatterBeløpForBeregning(barnetilleggBM.nettoBeløp)} = ${formatterBeløpForBeregning(sluttberegning.uminusNettoBarnetilleggBM)}`,
          },
          {
            label: "Foreløpig bidrag",
            textRight: false,
            labelBold: true,
            value: `${formatterBeløpForBeregning(sluttberegning.bruttoBidragEtterBarnetilleggBM)}${renderResult()}`,
          },
        ].filter((d) => d != null) as DataViewTableData[]
      }
    />
  );
};
