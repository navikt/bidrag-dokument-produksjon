import { useNotatFelles } from "~/components/notat_felles/NotatContext";
import NotatBegrunnelse from "~/components/NotatBegrunnelse";
import { NotatUnderholdBarnDto } from "~/types/Api";
import { DataViewTable } from "~/components/DataViewTable";
import { CommonTable } from "~/components/CommonTable";
import { formatPeriode } from "~/utils/date-utils";
import tekster from "~/tekster";
import { formatterBeløpForBeregning } from "~/utils/visningsnavn";
import KildeIcon from "~/components/KildeIcon";

export default function Underholdskostnad() {
  const { data } = useNotatFelles();
  const underholdskostnader = data.underholdskostnader;
  if (underholdskostnader == null) return null;
  return (
    <div className={"underholdskostnad"}>
      <h2>Underholdskostnad</h2>
      <div>
        {underholdskostnader.underholdskostnaderBarn
          .filter((barn) => barn.gjelderBarn.rolle != null)
          .map((barn, i) => (
            <UnderholdskostnaderSøknadsbarn
              data={barn}
              key={i + barn.gjelderBarn.ident!}
            />
          ))}
        <UnderholdskostnaderAndreBarn
          data={underholdskostnader.underholdskostnaderBarn.filter(
            (barn) => barn.gjelderBarn.rolle == null,
          )}
        />
      </div>
    </div>
  );
}
function UnderholdskostnaderAndreBarn({
  data,
}: {
  data: NotatUnderholdBarnDto[];
}) {
  if (data.length == 0) return null;
  return (
    <div className={"mb-medium"}>
      {data.map((barn) => (
        <>
          <DataViewTable
            className={"pt-2 pb-0 mb-0"}
            gap={"5px"}
            data={[
              {
                label: "Andre barn til bidragsmottaker",
                labelBold: true,
                value: barn.gjelderBarn.navn,
              },
            ]}
          />
          <FaktiskeTilsynsutgifterTabell data={barn} />
        </>
      ))}
      <NotatBegrunnelse data={data[0].begrunnelse} />
    </div>
  );
}
function UnderholdskostnaderSøknadsbarn({
  data,
}: {
  data: NotatUnderholdBarnDto;
}) {
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
          {
            label: "Barn har tilsynsutgift",
            value: data.harTilsynsordning ? "Ja" : "Nei",
          },
        ]}
      />
      {data.harTilsynsordning && (
        <>
          <StønadTilBarnetilsynTabell data={data} />
          <FaktiskeTilsynsutgifterTabell data={data} />
          <TilleggstønadTabell data={data} />
        </>
      )}
      <UnderholdskostnaderTabell data={data} />
      <NotatBegrunnelse data={data?.begrunnelse} />
    </div>
  );
}
function TilleggstønadTabell({ data }: { data: NotatUnderholdBarnDto }) {
  return (
    <div className={"mb-medium mt-medium"}>
      <h3 style={{ margin: "0 0 5px 0", display: "inline" }}>Tilleggsstønad</h3>
      <CommonTable
        layoutAuto
        width={"270px"}
        data={{
          headers: [
            {
              name: tekster.tabell.felles.fraTilOgMed,
            },
            {
              name: tekster.tabell.underholdskostnader.tilleggsstønad.dagsats,
            },
            {
              name: tekster.tabell.underholdskostnader.faktiskeTilsynsutgifter
                .totalt,
            },
          ],
          rows: data.tilleggsstønad.map((d) => ({
            columns: [
              { content: formatPeriode(d.periode.fom, d.periode.tom) },
              { content: formatterBeløpForBeregning(d.dagsats) },
              { content: formatterBeløpForBeregning(d.total) },
            ],
          })),
        }}
      />
    </div>
  );
}

function FaktiskeTilsynsutgifterTabell({
  data,
}: {
  data: NotatUnderholdBarnDto;
}) {
  return (
    <div className={"mb-medium"}>
      <h3 style={{ margin: "0 0 5px 0", display: "inline" }}>
        Faktiske tilsynsutgifter
      </h3>
      <CommonTable
        layoutAuto
        width={"500px"}
        data={{
          headers: [
            {
              name: tekster.tabell.felles.fraTilOgMed,
            },
            {
              name: tekster.tabell.underholdskostnader.faktiskeTilsynsutgifter
                .totalTilsynsutgift,
            },
            {
              name: tekster.tabell.underholdskostnader.faktiskeTilsynsutgifter
                .kostpenger,
            },
            {
              name: tekster.tabell.underholdskostnader.faktiskeTilsynsutgifter
                .totalt,
            },
            {
              name: tekster.tabell.underholdskostnader.faktiskeTilsynsutgifter
                .kommentar,
            },
          ],
          rows: data.faktiskTilsynsutgift.map((d) => ({
            columns: [
              { content: formatPeriode(d.periode.fom, d.periode.tom) },
              { content: formatterBeløpForBeregning(d.utgift) },
              { content: formatterBeløpForBeregning(d.kostpenger) },
              { content: formatterBeløpForBeregning(d.total) },
              { content: d.kommentar },
            ],
          })),
        }}
      />
    </div>
  );
}

function StønadTilBarnetilsynTabell({ data }: { data: NotatUnderholdBarnDto }) {
  return (
    <div className={"mb-medium mt-medium"}>
      <h3 style={{ margin: "0 0 5px 0", display: "inline" }}>
        Stønad til barnetilsyn
      </h3>
      <CommonTable
        layoutAuto
        width={"350px"}
        data={{
          headers: [
            {
              name: tekster.tabell.felles.fraTilOgMed,
            },
            {
              name: tekster.tabell.underholdskostnader.stønadTilBarnetilsyn
                .stønadTilBarnetilsyn,
            },
            {
              name: tekster.tabell.underholdskostnader.stønadTilBarnetilsyn
                .omfang,
            },
            {
              name: tekster.tabell.felles.kilde,
            },
          ],
          rows: data.stønadTilBarnetilsyn.map((d) => ({
            columns: [
              { content: formatPeriode(d.periode.fom, d.periode.tom) },
              { content: d.skoleaderVisningsnavn },
              { content: d.tilsynstypeVisningsnavn },
              {
                content: <KildeIcon kilde={d.kilde} />,
              },
            ],
          })),
        }}
      />
    </div>
  );
}
function UnderholdskostnaderTabell({ data }: { data: NotatUnderholdBarnDto }) {
  return (
    <div className={"mb-medium mt-medium"}>
      <h3 style={{ margin: "0 0 5px 0", display: "inline" }}>
        Underholdskostnader
      </h3>
      <CommonTable
        layoutAuto
        data={{
          headers: [
            {
              name: tekster.tabell.felles.fraTilOgMed,
              width: "250px",
            },
            {
              name: tekster.tabell.underholdskostnader.beregning.forbruk,
              width: "80px",
            },
            {
              name: tekster.tabell.underholdskostnader.beregning.boutgifter,
              width: "80px",
            },
            {
              name: tekster.tabell.underholdskostnader.beregning
                .stønadTilBarnetilsyn,
              width: "100px",
            },
            {
              name: tekster.tabell.underholdskostnader.beregning.beregnetTilsyn,
              width: "100px",
            },
            {
              name: tekster.tabell.underholdskostnader.beregning.barnetrygd,
              width: "80px",
            },
            {
              name: tekster.tabell.underholdskostnader.beregning
                .underholdskostnad,
            },
          ],
          rows: data.underholdskostnad.map((d) => ({
            columns: [
              { content: formatPeriode(d.periode.fom, d.periode.tom) },
              { content: formatterBeløpForBeregning(d.forbruk) },
              { content: formatterBeløpForBeregning(d.boutgifter) },
              { content: formatterBeløpForBeregning(d.stønadTilBarnetilsyn) },
              { content: formatterBeløpForBeregning(d.tilsynsutgifter) },
              { content: formatterBeløpForBeregning(d.barnetrygd) },
              { content: formatterBeløpForBeregning(d.total) },
            ],
          })),
        }}
      />
    </div>
  );
}
