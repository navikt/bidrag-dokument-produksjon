import elementIds from "~/utils/elementIds";
import { BPsAndel } from "~/components/vedtak/BPAndelTable";
import { BPsEvneTable } from "~/components/vedtak/BPsEvneTable";
import { SumLøpendeBidragTable } from "~/components/vedtak/SumLøpendeBidragTable";
import { DataViewTable } from "~/components/DataViewTable";
import { formatterBeløp } from "~/utils/visningsnavn";
import {
  Resultatkode,
  NotatResultatSaerbidragsberegningDto,
} from "~/types/Api";
import { useNotatFelles } from "~/components/notat_felles/NotatContext";
import { erResutlatMedBeregning } from "~/routes/notat.særbidrag/SærbidragHelpers";

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
      <h2 id={elementIds.vedleggBeregningsdetaljer}>
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
  return (
    <>
      <BPsAndel />
      <div className={"mb-medium"} />
      <BPsEvneTable />
      <div className={"mb-medium"} />
      <SumLøpendeBidragTable />
      <div className={"mb-medium"} />

      <DataViewTable
        title="Beregning"
        labelColWidth={"150px"}
        data={[
          {
            label: "BP har evne",
            textRight: false,
            value: !resultat.bpHarEvne
              ? "Nei, sum løpende bidrag er høyere enn BPs bidragsevne"
              : "Ja, sum løpende bidrag er lavere enn BPs bidragsevne",
          },
          {
            label: "Resultat",
            value: erBeregningeAvslag
              ? "Avslag"
              : formatterBeløp(resultat.resultat, true),
          },
          {
            label: "Betalt av BP",
            value: formatterBeløp(
              resultat.beregning?.totalBeløpBetaltAvBp,
              true,
            ),
          },
          {
            label: "Beløp som innkreves",
            value: erBeregningeAvslag
              ? "Avslag"
              : formatterBeløp(resultat.beløpSomInnkreves, true),
          },
        ].filter((d) => d)}
      />
    </>
  );
}
