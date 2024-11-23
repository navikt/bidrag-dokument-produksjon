import elementIds from "~/utils/elementIds";
import { BPsAndel } from "~/components/vedtak/BPAndelTable";
import { BPsEvneTable } from "~/components/vedtak/BPsEvneTable";
import { BPsBeregnedeTotalbidrag } from "~/components/vedtak/BPsBeregnedeTotalbidrag";
import { DataViewTable } from "~/components/DataViewTable";
import { formatterBeløp } from "~/utils/visningsnavn";
import {
  Resultatkode,
  NotatResultatSaerbidragsberegningDto,
} from "~/types/Api";
import { useNotatFelles } from "~/components/notat_felles/NotatContext";
import { erResutlatMedBeregning } from "~/routes/notat.særbidrag/SærbidragHelpers";
import tekster from "~/tekster";

export default function VedleggBeregningsDetaljer() {
  const { data } = useNotatFelles();
  if (
    !erResutlatMedBeregning(
      (data.vedtak?.resultat as NotatResultatSaerbidragsberegningDto[]) ?? [],
    )
  )
    return null;
  return (
    <div style={{ pageBreakBefore: "always" }}>
      <h2 id={elementIds.vedleggBeregningsdetaljer} className={"pb-2"}>
        Vedlegg nr. 3: Beregningsdetaljer
      </h2>
      <VedleggBeregningsDetaljerInnhold />
    </div>
  );
}

function VedleggBeregningsDetaljerInnhold() {
  const { data } = useNotatFelles();
  const resultatPerioder = data.vedtak?.resultat;
  if (resultatPerioder.length == 0) return <div>Mangler resultat</div>;

  const resultat = data.vedtak
    .resultat[0]! as NotatResultatSaerbidragsberegningDto;

  const erBeregningeAvslag =
    resultat?.resultatKode !== Resultatkode.SAeRBIDRAGINNVILGET;

  const beregnetSærbidrag = data.vedtak!
    .resultat[0] as NotatResultatSaerbidragsberegningDto;

  return (
    <>
      <BPsAndel />
      <div className={"mb-medium"} />
      <BPsEvneTable
        inntekter={beregnetSærbidrag.inntekter!}
        delberegningBidragsevne={beregnetSærbidrag.delberegningBidragsevne!}
      />
      <div className={"mb-medium"} />
      <BPsBeregnedeTotalbidrag
        delberegning={
          beregnetSærbidrag.delberegningBidragspliktigesBeregnedeTotalbidrag!
        }
      />
      <div className={"mb-medium"} />

      <DataViewTable
        title="Beregning"
        labelColWidth={"150px"}
        data={[
          {
            label: `${tekster.begreper.bidragspliktig} har evne`,
            textRight: false,
            value: !resultat.bpHarEvne
              ? "Nei, bidragsevnen er lavere enn beregnet totalbidrag"
              : "Ja, bidragsevnen er høyere enn beregnet totalbidrag",
          },
          {
            label: "Resultat",
            value: erBeregningeAvslag
              ? "Avslag"
              : formatterBeløp(resultat.resultat, true),
          },
          {
            label: `Betalt av ${tekster.begreper.bidragspliktig}`,
            value: formatterBeløp(
              resultat.beregning?.totalBeløpBetaltAvBp,
              true,
            ),
          },
          {
            label: data.medInnkreving
              ? "Beløp som innkreves"
              : "Fastsatt beløp å betale",
            value: erBeregningeAvslag
              ? "Avslag"
              : formatterBeløp(resultat.beløpSomInnkreves, true),
          },
        ].filter((d) => d)}
      />
    </>
  );
}
