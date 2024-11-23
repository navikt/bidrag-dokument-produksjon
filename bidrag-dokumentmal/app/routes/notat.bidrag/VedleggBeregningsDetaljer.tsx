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
import { BPsEvneTable } from "~/components/vedtak/BPsEvneTable";
import { BeregningFordeltBidragEvne } from "~/routes/notat.bidrag/beregningsdetaljer/BeregningFordeltBidragEvne";
import { createContext, useContext } from "react";
import { EndeligBidragTable } from "~/routes/notat.bidrag/beregningsdetaljer/EndeligBidrag";

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
                    <DataViewTable
                      className={"pt-2 pt-2 mb-0"}
                      gap={"5px"}
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
                    <BidragBeregningContext.Provider value={{ ...detaljer }}>
                      <div className={"flex flex-col gap-4"}>
                        <BPAndelUnderholdskostnad />
                        {!detaljer.deltBosted && <Samværsfradrag />}
                        {!detaljer.deltBosted && (
                          <NettoBarnetilleggTable rolle={Rolletype.BM} />
                        )}
                        <div>
                          <BPsEvneTable
                            inntekter={detaljer!.inntekter!}
                            delberegningBidragsevne={
                              detaljer!.delberegningBidragsevne!
                            }
                          />
                          <BeregningFordeltBidragEvne />
                        </div>

                        {!detaljer.deltBosted && (
                          <NettoBarnetilleggTable rolle={Rolletype.BP} />
                        )}
                        <EndeligBidragTable />
                      </div>
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
