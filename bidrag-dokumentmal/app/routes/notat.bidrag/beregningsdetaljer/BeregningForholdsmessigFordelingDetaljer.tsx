import { useBeregningDetaljer } from "~/routes/notat.bidrag/VedleggBeregningsDetaljer";
import {
  formatterBeløpForBeregning,
  formatterProsent,
  formatterBeløp,
} from "~/utils/visningsnavn";
import { DataViewTable, DataViewTableData } from "~/components/DataViewTable";
import {
  CommonTable,
  TableHeader,
  TableColumn,
} from "~/components/CommonTable";
import Person from "~/components/Person";
import { BeregningBarn } from "~/types/commonTypes";
import { BeregnetBidragBarnDto } from "~/types/Api";

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

  const finnesPriorierteBidrag =
    forholdsmessigFordeling.sumBidragSomIkkeKanFordeles > 0;

  const bidragTilFordelingMinusUtlandsbidrag =
    forholdsmessigFordeling.sumBidragTilFordeling -
    forholdsmessigFordeling.sumBidragSomIkkeKanFordeles;
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
              value: `${formatterBeløpForBeregning(andelFordeltTilBarnet)} / ${formatterBeløpForBeregning(bidragTilFordelingMinusUtlandsbidrag)}`,
              result: `${formatterProsent(bpAndelAvUVedForholdsmessigFordelingFaktor)}`,
            },
            finnesPriorierteBidrag && {
              label: "BPs evne som kan fordeles",
              textRight: false,
              labelBold: false,
              value: `${formatterBeløpForBeregning(delberegningBidragsevne.bidragsevne)} - ${formatterBeløpForBeregning(forholdsmessigFordeling.sumPrioriterteBidragTilFordeling)}`,
              result: `${formatterBeløpForBeregning(forholdsmessigFordeling.evneJustertForPrioriterteBidrag)}`,
            },
            {
              label: "Barnets andel etter forholdsmessig fordeling",
              textRight: false,
              labelBold: false,
              value: `${formatterProsent(bpAndelAvUVedForholdsmessigFordelingFaktor)} x ${formatterBeløpForBeregning(forholdsmessigFordeling.evneJustertForPrioriterteBidrag)}`,
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

  const beregningBarn: BeregningBarn[] =
    forholdsmessigFordeling.bidragTilFordelingAlle.flatMap((b) => ({
      beregnetBidragPerBarn: {
        ...b.beregnetBidrag,
        gjelderBarn: b.barn.ident,
      } as BeregnetBidragBarnDto,
      barn: b.barn,
      erSøknadsbarn: b.erSøknadsbarn,
      privatAvtale: b.privatAvtale,
      erBidragIkkeTilFordeling: b.erBidragSomIkkeKanFordeles,
      oppfostringsbidrag: b.oppfostringsbidrag,
      bidragTilFordeling: b.bidragTilFordeling,
      utenlandskbidrag: b.utenlandskbidrag,
    }));
  const bpsBarnIkkeSøknadsbarn = beregningBarn.filter((b) => !b.erSøknadsbarn);

  const bpsBarnSøknadsbarn = beregningBarn.filter((b) => b.erSøknadsbarn);
  return (
    <>
      <BpsPrivatAvtalerTabellIkkeTilFordeling
        beregning={bpsBarnIkkeSøknadsbarn}
        sumBidrag={forholdsmessigFordeling.sumBidragSomIkkeKanFordeles}
      />
      <h4>BPs totale underholdskostnad for søknadsbarna</h4>
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
          rows: bpsBarnSøknadsbarn
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

export const BpsPrivatAvtalerTabellIkkeTilFordeling = ({
  beregning,
  sumBidrag,
}: {
  beregning: BeregningBarn[];
  sumBidrag: number;
}) => {
  if (!beregning.some((b) => b.erBidragIkkeTilFordeling)) return null;
  const bidragIkkeTilFordeling = beregning.filter(
    (b) => b.erBidragIkkeTilFordeling,
  );
  if (bidragIkkeTilFordeling.length === 0) return null;

  const løperIUtlandskValuta = bidragIkkeTilFordeling.some(
    (b) => b.beregnetBidragPerBarn.valutakode !== "NOK",
  );
  const inneholderUtenlandsk = bidragIkkeTilFordeling.some(
    (b) => b.utenlandskbidrag,
  );
  const finnesIndeksregulering = bidragIkkeTilFordeling.some(
    (b) =>
      b.beregnetBidragPerBarn.indeksreguleringFaktor &&
      b.beregnetBidragPerBarn.indeksreguleringFaktor > 0,
  );

  function renderTablePrivatAvtale() {
    return (
      <CommonTable
        layoutAuto
        data={{
          headers: [
            {
              name: "Barn",
              width: "500px",
            },
            finnesIndeksregulering && {
              name: "Indeks",
              width: "50px",
            },
            inneholderUtenlandsk && {
              name: "Avtalebeløp",
              width: "50px",
            },
            inneholderUtenlandsk && {
              name: "Valutakurs",
              width: "50px",
            },
            inneholderUtenlandsk && {
              name: "Avtalebeløp (NOK)",
              width: "50px",
            },
            inneholderUtenlandsk && {
              name: "Samvær",
              width: "50px",
            },
            {
              name: "Beløp",
              width: "50px",
            },
          ].filter((h) => h != null) as TableHeader[],
          rows: bidragIkkeTilFordeling
            .map(({ beregnetBidragPerBarn: row, barn }, rowIndex) => ({
              columns: [
                {
                  content: (
                    <Person
                      fødselsdato={barn.fødselsdato!}
                      navn={barn.navn!}
                      erBeskyttet={barn.erBeskyttet}
                    />
                  ),
                  colSpan: 1,
                },
                finnesIndeksregulering && {
                  content: formatterProsent(row.indeksreguleringFaktor),
                },
                inneholderUtenlandsk && {
                  content:
                    row.valutakode === "NOK"
                      ? formatterBeløpForBeregning(row.løpendeBeløp)
                      : `${formatterBeløpForBeregning(row.løpendeBeløp)} (${row.valutakode})`,
                },
                løperIUtlandskValuta && {
                  content: formatterBeløp(row.valutakurs),
                },
                inneholderUtenlandsk && {
                  content: formatterBeløpForBeregning(row.beregnetBeløp),
                },
                inneholderUtenlandsk && {
                  content: formatterBeløpForBeregning(row.samværsfradrag),
                },
                {
                  content: formatterBeløpForBeregning(row.beregnetBidrag, true),
                },
              ].filter((d) => d != null) as TableColumn[],
            }))
            .concat([
              {
                columns: [
                  {
                    content: "Sum" as string,
                    labelBold: true,
                    colSpanNegative: 1,
                  },
                  {
                    content: formatterBeløpForBeregning(sumBidrag),
                  },
                ] as TableColumn[],
              },
            ]),
        }}
      />
    );
  }

  return (
    <div className={"mb-2"}>
      <div>
        <h4 className="inline-block align-middle">
          {"BP's bidrag som ikke kan fordeles"}
        </h4>

        {renderTablePrivatAvtale()}
      </div>
    </div>
  );
};
