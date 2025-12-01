import { useBeregningDetaljer } from "~/routes/notat.bidrag/VedleggBeregningsDetaljer";
import {
  formatterBeløpForBeregning,
  formatterProsent,
} from "~/utils/visningsnavn";
import { DataViewTable, DataViewTableData } from "~/components/DataViewTable";
import {
  CommonTable,
  TableHeader,
  TableColumn,
} from "~/components/CommonTable";
import Person from "~/components/Person";

export const BeregningForholdsmessigFordeling = () => {
  const {
    sluttberegning,
    bpsAndel,
    delberegningBidragsevne,
    forholdsmessigFordelingBeregningsdetaljer: forholdsmessigFordeling,
  } = useBeregningDetaljer();

  const erFF =
    (sluttberegning.bpAndelAvUVedForholdsmessigFordelingFaktor &&
      sluttberegning.bpAndelAvUVedForholdsmessigFordelingFaktor < 1) ||
    forholdsmessigFordeling?.erForholdsmessigFordelt;
  if (!erFF) return null;
  function renderResult() {
    if (sluttberegning.bidragJustertNedTil25ProsentAvInntekt) {
      return ` (redusert ned til 25% av inntekt)`;
    } else if (sluttberegning.bidragJustertNedTilEvne) {
      return ` (redusert ned til evne)`;
    }
    return "";
  }
  const bpAndelAvUVedForholdsmessigFordelingFaktor =
    sluttberegning.bpAndelAvUVedForholdsmessigFordelingFaktor ??
    forholdsmessigFordeling?.andelAvSumBidragTilFordelingFaktor;
  const bpEvneVedForholdsmessigFordeling =
    forholdsmessigFordeling?.andelAvEvneBeløp ??
    sluttberegning.bpEvneVedForholdsmessigFordeling;
  const bidragTilFordelingForBarnet = Math.min(
    delberegningBidragsevne.bidragsevne,
    delberegningBidragsevne.sumInntekt25Prosent,
  );
  const foreløpigBidrag =
    forholdsmessigFordeling?.bidragEtterFordeling ??
    sluttberegning.bruttoBidragJustertForEvneOg25Prosent ??
    0;
  const bpsSumAndelAvU =
    forholdsmessigFordeling?.sumBidragTilFordeling ??
    sluttberegning.bpSumAndelAvU ??
    0;
  const andelFordeltTilBarnet =
    forholdsmessigFordeling?.bidragTilFordelingForBarnet ??
    bpsAndel.andelBeløp ??
    0;
  return (
    <div className={"mt-2"}>
      <ForholdsmessigFordelingBeregningAndreBarn />

      <DataViewTable
        className={"mt-2"}
        title="Forholdsmessig fordeling"
        data={
          [
            !forholdsmessigFordeling && {
              label: "BPs totale underholdskostnad",
              textRight: false,
              labelBold: false,
              value: `${formatterBeløpForBeregning(bpsSumAndelAvU)}`,
            },
            {
              label: "Barnets andel av underholdskostnad",
              textRight: false,
              labelBold: false,
              value: `${formatterBeløpForBeregning(andelFordeltTilBarnet)} / ${formatterBeløpForBeregning(bpsSumAndelAvU)}`,
              result: `${formatterProsent(bpAndelAvUVedForholdsmessigFordelingFaktor)}`,
            },
            {
              label: "Barnets andel etter forholdsmessig fordeling",
              textRight: false,
              labelBold: false,
              value: `${formatterProsent(bpAndelAvUVedForholdsmessigFordelingFaktor)} x ${formatterBeløpForBeregning(bidragTilFordelingForBarnet)}`,
              result: `${formatterBeløpForBeregning(bpEvneVedForholdsmessigFordeling)}`,
            },
            {
              label: "Foreløpig bidrag",
              textRight: false,
              labelBold: false,
              value: ` ${formatterBeløpForBeregning(foreløpigBidrag)}${renderResult()}`,
            },
          ].filter((d) => d != null) as DataViewTableData[]
        }
      />
    </div>
  );
};

const ForholdsmessigFordelingBeregningAndreBarn = () => {
  const { forholdsmessigFordelingBeregningsdetaljer: forholdsmessigFordeling } =
    useBeregningDetaljer();

  if (
    !forholdsmessigFordeling ||
    forholdsmessigFordeling?.bidragTilFordelingAlle?.length === 0
  )
    return null;
  return (
    <>
      <h4>BPs totale underholdskostnad</h4>
      <CommonTable
        layoutAuto
        data={{
          headers: [
            {
              name: "Barn",
              width: "500px",
            },
            {
              name: "Andel U",
              width: "50px",
            },
          ].filter((h) => h != null) as TableHeader[],
          rows: forholdsmessigFordeling.bidragTilFordelingAlle
            .map((bt) => ({
              columns: [
                {
                  content: (
                    <Person
                      fødselsdato={bt.barn.fødselsdato!}
                      navn={bt.barn.navn!}
                      erBeskyttet={bt.barn.erBeskyttet}
                    />
                  ),
                  colSpan: 1,
                },
                {
                  content: formatterBeløpForBeregning(
                    bt.bidragTilFordeling,
                    true,
                  ),
                },
              ].filter((d) => d != null) as TableColumn[],
            }))
            .concat([
              {
                columns: [
                  {
                    content: "Totalt" as string,
                    labelBold: true,
                  },
                  {
                    content: formatterBeløpForBeregning(
                      forholdsmessigFordeling.sumBidragTilFordeling,
                    ),
                  },
                ] as TableColumn[],
              },
            ]),
        }}
      />
    </>
  );
};
