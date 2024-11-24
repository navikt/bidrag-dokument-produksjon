import elementIds from "~/utils/elementIds";
import {
  NotatResultatBidragsberegningBarnDto,
  NotatResultatSaerbidragsberegningDto,
  Rolletype,
  BidragPeriodeBeregningsdetaljer,
} from "~/types/Api";
import { useNotatFelles } from "~/components/notat_felles/NotatContext";
import { erResutlatMedBeregning } from "~/routes/notat.særbidrag/SærbidragHelpers";
import { DataViewTable } from "~/components/DataViewTable";
import { formatPeriode } from "~/utils/date-utils";
import HorizontalLine from "~/components/HorizontalLine";
import { BPAndelUnderholdskostnad } from "~/routes/notat.bidrag/BPAndelUnderholdskostnad";
import { Samværsfradrag } from "~/routes/notat.bidrag/beregningsdetaljer/Samværsfradrag";
import { NettoBarnetilleggTable } from "~/routes/notat.bidrag/beregningsdetaljer/NettoBarnetilleggTable";
import { BeregningFordeltBidragEvne } from "~/routes/notat.bidrag/beregningsdetaljer/BeregningFordeltBidragEvne";
import { createContext, useContext } from "react";
import { EndeligBidragTable } from "~/routes/notat.bidrag/beregningsdetaljer/EndeligBidrag";
import { BPsEvneTableV2 } from "~/components/vedtak/BPsEvneTableV2";

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
        Vedlegg nr. 4: Beregningsdetaljer
      </h2>
      <VedleggBeregningsDetaljerInnhold />
    </div>
  );
}

export const BidragBeregningContext =
  createContext<BidragPeriodeBeregningsdetaljer | null>(null);

export function useBeregningDetaljer(): Required<BidragPeriodeBeregningsdetaljer> {
  return useContext(
    BidragBeregningContext,
  ) as Required<BidragPeriodeBeregningsdetaljer>;
}
function VedleggBeregningsDetaljerInnhold() {
  const { data } = useNotatFelles();
  const resultatPerioder = data.vedtak
    ?.resultat as NotatResultatBidragsberegningBarnDto[];
  if (resultatPerioder.length == 0) return <div>Mangler resultat</div>;

  return (
    <>
      {resultatPerioder?.map(
        (resultat: NotatResultatBidragsberegningBarnDto) => (
          <>
            <DataViewTable
              className={"pt-2 pb-0 mb-0"}
              gap={"5px"}
              data={[
                {
                  label: "Barn i saken",
                  labelBold: true,
                  value: resultat.barn.navn,
                },
              ]}
            />
            {resultat.perioder
              .filter(
                (d) =>
                  d.beregningsdetaljer?.sluttberegning &&
                  !d.beregningsdetaljer.sluttberegning.barnetErSelvforsørget,
              )
              .map((periode) => {
                const detaljer = periode.beregningsdetaljer!;
                return (
                  <>
                    <BidragBeregningContext.Provider value={{ ...detaljer }}>
                      <>
                        <div className={"pt-2 pb-2"}>
                          <DataViewTable
                            className={"mt-medium mb-2"}
                            data={[
                              {
                                label: "Periode",
                                labelBold: true,
                                value: formatPeriode(
                                  periode.periode.fom,
                                  periode.periode.til,
                                ),
                              },
                            ]}
                          />
                          <BPAndelUnderholdskostnad />
                        </div>
                        {!detaljer.deltBosted && (
                          <>
                            <Samværsfradrag />
                            <div className={"pt-2 pb-2"} />
                          </>
                        )}
                        {!detaljer.deltBosted && (
                          <>
                            <NettoBarnetilleggTable rolle={Rolletype.BM} />
                            <div className={"pt-2 pb-2"} />
                          </>
                        )}
                        <div className={"pt-2 pb-2"}>
                          <BPsEvneTableV2
                            inntekter={detaljer!.inntekter!}
                            delberegningBidragsevne={
                              detaljer!.delberegningBidragsevne!
                            }
                          />
                          <BeregningFordeltBidragEvne />
                        </div>

                        {!detaljer.deltBosted && (
                          <>
                            <NettoBarnetilleggTable rolle={Rolletype.BP} />
                            <div className={"pt-2 pb-2"} />
                          </>
                        )}
                        <EndeligBidragTable />
                      </>
                    </BidragBeregningContext.Provider>
                    <HorizontalLine />
                  </>
                );
              })}
          </>
        ),
      )}
    </>
  );
}
