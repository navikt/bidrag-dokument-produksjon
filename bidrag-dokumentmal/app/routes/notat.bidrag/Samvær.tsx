import { useNotatFelles } from "~/components/notat_felles/NotatContext";
import { NotatSamvaerDto, NotatSamvaersperiodeDto } from "~/types/Api";
import { CommonTable } from "~/components/CommonTable";
import tekster from "~/tekster";
import { formatPeriode } from "~/utils/date-utils";
import { DataViewTable } from "~/components/DataViewTable";
import NotatBegrunnelse from "~/components/NotatBegrunnelse";
import elementIds from "~/utils/elementIds";

export default function Samvær() {
  const { data } = useNotatFelles();
  const samvær = data.samvær;
  if (samvær.length == 0) return null;
  return (
    <>
      <div className={"elements_inline section-title"}>
        <h2>Samvær</h2>
        <a href={`#${elementIds.vedleggSamvær}`}>
          se vedlegg nr. 3 for beregningsdetaljer
        </a>
      </div>
      <>
        {samvær.map((barn, i) => (
          <SamværBarn data={barn} key={i + barn.gjelderBarn.ident!} />
        ))}
      </>
    </>
  );
}

function SamværBarn({ data }: { data: NotatSamvaerDto }) {
  return (
    <div className={"mb-medium mt-medium"}>
      <DataViewTable
        gap={"5px"}
        data={[
          {
            label: "Barn i saken",
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
