import { useNotatFelles } from "~/components/notat_felles/NotatContext";
import elementIds from "~/utils/elementIds";
import { CommonTable } from "~/components/CommonTable";
import { NotatSamvaerDto, NotatSamvaersperiodeDto } from "~/types/Api";
import { DataViewTable, DataViewTableData } from "~/components/DataViewTable";
import { formatPeriode } from "~/utils/date-utils";

export default function VedleggSamvær() {
  const { data, erAvslag } = useNotatFelles();
  if (erAvslag) return null;
  return (
    <div style={{ pageBreakBefore: "always" }}>
      <h2 id={elementIds.vedleggSamvær}>Vedlegg nr. 4: Samvær</h2>
      {data.samvær.map((samværBarn, index) => (
        <div className={"flex flex-col gap-2"}>
          <SamværsberegningDetaljerBarn samværBarn={samværBarn} key={index} />
        </div>
      ))}
    </div>
  );
}

function SamværsberegningDetaljerBarn({
  samværBarn,
}: {
  samværBarn: NotatSamvaerDto;
}) {
  const samværsperioderMedBeregning = samværBarn.perioder.filter(
    (p) => p.beregning != null,
  );
  return (
    <>
      <DataViewTable
        data={
          [
            {
              label: "Barn i saken",
              labelBold: true,
              value: samværBarn.gjelderBarn.navn,
            },
          ].filter((d) => d != null) as DataViewTableData[]
        }
      />
      {samværsperioderMedBeregning.length == 0 ? (
        <p>Ingen beregnet samvær</p>
      ) : (
        samværsperioderMedBeregning.map((periode, index) => (
          <div key={index + "_" + periode.samværsklasseVisningsnavn}>
            <DataViewTable
              data={
                [
                  {
                    label: "Periode",
                    value: formatPeriode(
                      periode.periode.fom,
                      periode.periode.tom,
                    ),
                  },
                ].filter((d) => d != null) as DataViewTableData[]
              }
            />
            <SamværKalkulatorTable
              {...periode}
              beregning={periode.beregning!}
              key={`ferie_${index}_${samværBarn.gjelderBarn.navn}`}
            />
          </div>
        ))
      )}
    </>
  );
}

function SamværKalkulatorTable({
  beregning,
  samværsklasseVisningsnavn,
  gjennomsnittligSamværPerMåned,
  ferieVisningsnavnMap,
  frekvensVisningsnavnMap,
}: NotatSamvaersperiodeDto) {
  return (
    <div className={"flex flex-col gap-1 pt-2 pb-2"}>
      <DataViewTable
        title={"Regelmessig samvær"}
        data={
          [
            {
              label: "Antall netter",
              value: `${beregning!.regelmessigSamværNetter} / 14 dager`,
            },
          ].filter((d) => d != null) as DataViewTableData[]
        }
      />
      <div>
        <CommonTable
          layoutAuto
          data={{
            headers: [
              {
                name: "Ferie",
              },
              {
                name: "Bidragspliktig",
              },
              {
                name: "Bidragsmottaker",
              },
              {
                name: "Frekvens",
              },
            ],
            rows: beregning!.ferier.map((ferie) => ({
              borderBottom: true,
              columns: [
                {
                  content: ferieVisningsnavnMap[ferie.type],
                },
                {
                  content: zeroToEmpty(ferie.bidragspliktigNetter),
                },
                {
                  content: zeroToEmpty(ferie.bidragsmottakerNetter),
                },
                {
                  content: frekvensVisningsnavnMap[ferie.frekvens],
                },
              ],
            })),
          }}
        />
        <DataViewTable
          data={
            [
              {
                label: "Beregning",
                labelBold: true,
                value: `Samværsklasse ${samværsklasseVisningsnavn} (samvær per måned: ${gjennomsnittligSamværPerMåned})`,
              },
            ].filter((d) => d != null) as DataViewTableData[]
          }
        />
      </div>
    </div>
  );
}

function zeroToEmpty(value: number) {
  return value === 0 ? "" : value;
}
