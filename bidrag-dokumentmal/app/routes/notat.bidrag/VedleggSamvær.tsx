import { useNotatFelles } from "~/components/notat_felles/NotatContext";
import elementIds from "~/utils/elementIds";
import { CommonTable } from "~/components/CommonTable";
import { NotatSamvaerDto, NotatSamvaersperiodeDto } from "~/types/Api";
import { DataViewTable, DataViewTableData } from "~/components/DataViewTable";
import { formatPeriode } from "~/utils/date-utils";

export default function VedleggSamvær() {
  const { data } = useNotatFelles();

  return (
    <div style={{ pageBreakBefore: "always" }}>
      <h2 id={elementIds.vedleggSamvær} className={"pb-2"}>
        Vedlegg nr. 3: Samvær
      </h2>
      {data.samvær.map((samværBarn, index) => (
        <SamværsberegningDetaljerBarn samværBarn={samværBarn} key={index} />
      ))}
    </div>
  );
}

function SamværsberegningDetaljerBarn({
  samværBarn,
}: {
  samværBarn: NotatSamvaerDto;
}) {
  return (
    <div className={"flex flex-col gap-4"}>
      <DataViewTable
        gap={"5px"}
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
      {samværBarn.perioder
        .filter((p) => p.beregning != null)
        .map((periode, index) => (
          <>
            <DataViewTable
              gap={"5px"}
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
          </>
        ))}
    </div>
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
    <div className={"flex flex-col gap-1"}>
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
