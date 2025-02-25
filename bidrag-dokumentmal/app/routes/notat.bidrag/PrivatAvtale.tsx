import { useNotatFelles } from "~/components/notat_felles/NotatContext";
import {
  NotatPrivatAvtaleDto,
  NotatPrivatAvtalePeriodeDto,
  NotatBeregnetPrivatAvtalePeriodeDto,
} from "~/types/Api";
import { CommonTable } from "~/components/CommonTable";
import tekster from "~/tekster";
import { formatPeriode } from "~/utils/date-utils";
import { DataViewTable } from "~/components/DataViewTable";
import NotatBegrunnelse from "~/components/NotatBegrunnelse";
import { formatterBeløp, formatterProsent } from "~/utils/visningsnavn";

export default function PrivatAvtale() {
  const { data, erAvslag } = useNotatFelles();
  if (erAvslag) return null;
  const privatAvtale = data.privatavtale;
  if (privatAvtale.length == 0) return null;
  return (
    <div>
      <div className={"elements_inline section-title"}>
        <h2>Privat avtale</h2>
      </div>
      <>
        {privatAvtale.map((barn, i) => (
          <>
            <PrivatAvtaleBarn data={barn} key={i + barn.gjelderBarn.ident!} />
          </>
        ))}
      </>
    </div>
  );
}

function PrivatAvtaleBarn({ data }: { data: NotatPrivatAvtaleDto }) {
  return (
    <div className={"mb-medium"}>
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
      <PrivatAvtaleTabell data={data.perioder} />
      <PrivatAvtaleBeregnetTabell data={data.beregnetPrivatAvtalePerioder} />
      <NotatBegrunnelse data={data?.begrunnelse} />
    </div>
  );
}
function PrivatAvtaleTabell({ data }: { data: NotatPrivatAvtalePeriodeDto[] }) {
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
            name: tekster.tabell.felles.beløp,
          },
        ],
        rows: data.map((d) => ({
          columns: [
            { content: formatPeriode(d.periode.fom, d.periode.tom) },
            { content: formatterBeløp(d.beløp) },
          ],
        })),
      }}
    />
  );
}

function PrivatAvtaleBeregnetTabell({
  data,
}: {
  data?: NotatBeregnetPrivatAvtalePeriodeDto[];
}) {
  if (!data || data.length == 0) return null;
  const perioder = data;
  return (
    <div>
      <h4 className={"mb-1 mt-4"}>Beregnet privat avtale</h4>
      <CommonTable
        layoutAuto
        width={"350px"}
        data={{
          headers: [
            {
              name: tekster.tabell.felles.fraTilOgMed,
            },
            {
              name: "Indeksprosent",
            },
            {
              name: tekster.tabell.felles.beløp,
            },
          ],
          rows: perioder.map((d) => ({
            columns: [
              { content: formatPeriode(d.periode.fom, d.periode.tom) },
              { content: formatterProsent(d.indeksfaktor) },
              { content: formatterBeløp(d.beløp) },
            ],
          })),
        }}
      />
    </div>
  );
}
