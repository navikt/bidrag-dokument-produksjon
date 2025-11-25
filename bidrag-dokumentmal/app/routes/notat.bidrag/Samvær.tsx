import { useNotatFelles } from "~/components/notat_felles/NotatContext";
import { NotatSamvaerDto, NotatSamvaersperiodeDto } from "~/types/Api";
import { CommonTable } from "~/components/CommonTable";
import tekster from "~/tekster";
import { formatPeriode, sortByAge } from "~/utils/date-utils";
import { DataViewTable } from "~/components/DataViewTable";
import NotatBegrunnelse from "~/components/NotatBegrunnelse";
import elementIds from "~/utils/elementIds";
import { VedleggProps } from "~/types/commonTypes";
import { rolleTilVisningsnavnV2 } from "~/utils/visningsnavn";

export default function Samvær({ vedleggNummer }: VedleggProps) {
  const { data, erAvslag } = useNotatFelles();
  if (erAvslag) return null;
  const samvær = data.samvær;
  if (samvær.length == 0) return null;
  return (
    <div>
      <div className={"elements_inline section-title"}>
        <h2>Samvær</h2>
        <a href={`#${elementIds.vedleggSamvær}`}>
          se vedlegg nr. {vedleggNummer} for beregningsdetaljer
        </a>
      </div>
      <>
        {samvær
          .sort((a, b) => sortByAge(a.gjelderBarn, b.gjelderBarn))
          .map((barn, i) => (
            <SamværBarn data={barn} key={i + barn.gjelderBarn.ident!} />
          ))}
      </>
    </div>
  );
}

function SamværBarn({ data }: { data: NotatSamvaerDto }) {
  return (
    <div className={"mb-medium"}>
      <DataViewTable
        gap={"5px"}
        data={[
          {
            label: rolleTilVisningsnavnV2(data.gjelderBarn),
            labelBold: true,
            value: data.gjelderBarn.navn,
          },
        ]}
      />
      <SamværTabell data={data.perioder} />
      <NotatBegrunnelse data={data?.begrunnelse} />
    </div>
  );
}
function SamværTabell({ data }: { data: NotatSamvaersperiodeDto[] }) {
  return (
    <CommonTable
      layoutAuto
      width={"350px"}
      data={{
        headers: [
          {
            name: tekster.tabell.felles.fraTilOgMed,
          },
          {
            name: tekster.tabell.samvær.samværsklasse,
          },
        ],
        rows: data.map((d) => ({
          columns: [
            { content: formatPeriode(d.periode.fom, d.periode.tom) },
            { content: d.samværsklasseVisningsnavn },
          ],
        })),
      }}
    />
  );
}
