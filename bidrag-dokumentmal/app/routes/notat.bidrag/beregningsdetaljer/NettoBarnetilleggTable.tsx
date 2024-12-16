import { DataViewTable, DataViewTableData } from "~/components/DataViewTable";
import {
  formatterBeløpForBeregning,
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
  } = useBeregningDetaljer();

  const barnetillegg = rolle == Rolletype.BP ? barnetilleggBP : barnetilleggBM;
  return (
    <div style={{ width: "600px" }}>
      <h4>{`Netto barnetillegg (${rolleTilVisningsnavn(rolle)})`}</h4>

      <CommonTable
        layoutAuto
        data={{
          headers: [
            {
              name: "Type barnetillegg",
              width: "100px",
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
                  },
                  {
                    content: formatterBeløpForBeregning(
                      barnetillegg!.sumBruttoBeløp,
                    ),
                  },
                  {
                    content: formatterBeløpForBeregning(
                      barnetillegg!.sumNettoBeløp,
                    ),
                  },
                ],
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
            value: `${formatterBeløpForBeregning(underholdskostnad.underholdskostnad)} - ${formatterBeløpForBeregning(barnetilleggBM.sumNettoBeløp)} = ${formatterBeløpForBeregning(sluttberegning.uminusNettoBarnetilleggBM)}`,
          },
          {
            label: "Foreløpig bidrag",
            textRight: false,
            value: `${formatterBeløpForBeregning(sluttberegning.bruttoBidragEtterBarnetilleggBM)}${renderResult()}`,
          },
        ].filter((d) => d != null) as DataViewTableData[]
      }
    />
  );
};
