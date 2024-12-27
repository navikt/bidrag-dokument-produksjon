import elementIds from "~/utils/elementIds";
import {
  NotatResultatBidragsberegningBarnDto,
  Rolletype,
  BidragPeriodeBeregningsdetaljer,
} from "~/types/Api";
import { useNotatFelles } from "~/components/notat_felles/NotatContext";
import { DataViewTable } from "~/components/DataViewTable";
import { formatPeriode } from "~/utils/date-utils";
import HorizontalLine from "~/components/HorizontalLine";
import { BPAndelUnderholdskostnad } from "~/routes/notat.bidrag/beregningsdetaljer/BPAndelUnderholdskostnad";
import { Samværsfradrag } from "~/routes/notat.bidrag/beregningsdetaljer/Samværsfradrag";
import { NettoBarnetilleggTable } from "~/routes/notat.bidrag/beregningsdetaljer/NettoBarnetilleggTable";
import { BeregningFordeltBidragEvne } from "~/routes/notat.bidrag/beregningsdetaljer/BeregningFordeltBidragEvne";
import { createContext, useContext } from "react";
import { EndeligBidragTable } from "~/routes/notat.bidrag/beregningsdetaljer/EndeligBidrag";
import { BPsEvneTableV2 } from "~/components/vedtak/BPsEvneTableV2";
import { BarnetilleggSkattesats } from "~/routes/notat.bidrag/beregningsdetaljer/BarnetilleggSkattesats";
import { VedleggProps } from "~/types/commonTypes";

export default function VedleggBeregningsDetaljer({
  vedleggNummer,
}: VedleggProps) {
  const { erAvslag } = useNotatFelles();
  if (erAvslag) return null;
  return (
    <div>
      <h2 id={elementIds.vedleggBeregningsdetaljer}>
        Vedlegg nr. {vedleggNummer}: Beregningsdetaljer
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
                        <div className={"pb-2"}>
                          <DataViewTable
                            className={"mb-2"}
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
                        {!detaljer.deltBosted &&
                          detaljer.barnetilleggBM.barnetillegg.length > 0 && (
                            <>
                              <BarnetilleggSkattesats rolle={Rolletype.BM} />
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

                        {!detaljer.deltBosted &&
                          detaljer.barnetilleggBP.barnetillegg.length > 0 && (
                            <>
                              <BarnetilleggSkattesats rolle={Rolletype.BP} />
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
