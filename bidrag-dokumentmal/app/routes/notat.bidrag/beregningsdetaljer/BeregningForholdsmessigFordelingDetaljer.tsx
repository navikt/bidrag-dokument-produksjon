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
import { BPsBeregnedeTotalbidrag } from "~/components/notat_felles/components/BPsBeregnedeTotalbidrag";
import { NotatBeregnetBidragPerBarnDto } from "~/types/Api";

export const BeregningForholdsmessigFordeling = () => {
  const {
    sluttberegning,
    bpsAndel,
    delberegningBidragsevne,
    forholdsmessigFordelingBeregningsdetaljer: forholdsmessigFordeling,
  } = useBeregningDetaljer();

  const erFF =
    forholdsmessigFordeling &&
    forholdsmessigFordeling.andelAvSumBidragTilFordelingFaktor < 1;
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
      <ForholdsmessigFordelingBeregningSøknadsbarn />

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
            forholdsmessigFordeling.finnesBarnMedLøpendeBidragSomIkkeErSøknadsbarn && {
              label: "BPs totale underholdskostnad",
              value: `${formatterBeløpForBeregning(forholdsmessigFordeling.sumBidragTilFordelingIkkeSøknadsbarn)} + ${formatterBeløpForBeregning(forholdsmessigFordeling.sumBidragTilFordelingSøknadsbarn)}`,
              result: `${formatterBeløpForBeregning(forholdsmessigFordeling.sumBidragTilFordeling)}`,
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

  const beregningBarn = forholdsmessigFordeling.bidragTilFordelingAlle.flatMap(
    (b) => ({
      beregnetBidragPerBarn: { ...b.beregnetBidrag, gjelderBarn: b.barn.ident },
      personidentBarn: b.barn.ident,
      erSøknadsbarn: b.erSøknadsbarn,
    }),
  );
  const bpsBarnIkkeSøknadsbarn = beregningBarn.filter((b) => !b.erSøknadsbarn);
  if (bpsBarnIkkeSøknadsbarn.length === 0) return null;
  return (
    <>
      <BPsBeregnedeTotalbidrag
        bidragspliktigesBeregnedeTotalbidrag={
          forholdsmessigFordeling.sumBidragTilFordelingIkkeSøknadsbarn
        }
        delberegning={bpsBarnIkkeSøknadsbarn as NotatBeregnetBidragPerBarnDto[]}
      />
    </>
  );
};
const ForholdsmessigFordelingBeregningSøknadsbarn = () => {
  const { forholdsmessigFordelingBeregningsdetaljer: forholdsmessigFordeling } =
    useBeregningDetaljer();

  return (
    <div
      className={
        forholdsmessigFordeling.finnesBarnMedLøpendeBidragSomIkkeErSøknadsbarn
          ? "mt-2"
          : ""
      }
    >
      <h4>
        {forholdsmessigFordeling.finnesBarnMedLøpendeBidragSomIkkeErSøknadsbarn
          ? "BPs totale underholdskostnad for søknadsbarna"
          : "BPs totale underholdskostnad"}
      </h4>
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
            .filter((b) => b.erSøknadsbarn)
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
                      forholdsmessigFordeling.sumBidragTilFordelingSøknadsbarn,
                    ),
                  },
                ] as TableColumn[],
              },
            ]),
        }}
      />
    </div>
  );
};
