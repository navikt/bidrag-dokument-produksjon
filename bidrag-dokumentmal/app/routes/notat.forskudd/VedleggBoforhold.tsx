import { NotatForskuddProps, useNotat } from "~/routes/notat.forskudd/route";
import { formatPeriode } from "~/utils/date-utils";
import {
  OpplysningerFraFolkeregisteretBostatuskode,
  OpplysningerFraFolkeregisteretSivilstandskodePDL,
} from "~/types/Api";
import { groupBy } from "~/utils/array-utils";
import DataDescription from "~/components/DataDescription";
import Person from "~/components/Person";
import elementIds from "~/utils/elementIds";
import tekster from "~/tekster";
import { CommonTable } from "~/components/CommonTable";

export default function VedleggBoforhold({ data }: NotatForskuddProps) {
  const { erAvslag } = useNotat();
  if (erAvslag) return null;
  return (
    <div style={{ pageBreakBefore: "always" }}>
      <h2 id={elementIds.vedleggBoforhold}>
        Vedlegg nr. 1: Boforhold - {tekster.fraOffentligeRegistre}
      </h2>
      {groupBy(
        data.boforhold.barn
          .filter((d) => d.opplysningerFraFolkeregisteret.length > 0)
          .sort((d) => (d.medIBehandling ? -1 : 1)),
        (d) => d.gjelder.ident ?? d.gjelder.fødselsdato!,
      ).map(([key, value]) => {
        const gjelderBarn = value[0].gjelder!;
        const barn = value[0];
        return (
          <div key={key} className="table_container">
            <DataDescription
              label={
                barn.medIBehandling ? "Søknadsbarn" : "Eget barn i husstanden"
              }
              value={
                <Person
                  fødselsdato={gjelderBarn.fødselsdato!}
                  navn={gjelderBarn.navn!}
                />
              }
            />
            <BoforholdTable data={barn.opplysningerFraFolkeregisteret} />
            <div
              className="horizontal-line"
              style={{
                pageBreakAfter: "avoid",
                marginBottom: "24px",
              }}
            ></div>
          </div>
        );
      })}
      <div>
        <h3>Sivilstand</h3>
        <div className="table_container">
          <BoforholdTable
            sivilstand
            data={data.boforhold.sivilstand.opplysningerFraFolkeregisteret}
          />
        </div>
      </div>
    </div>
  );
}

export function BoforholdTable({
  data,
  sivilstand = false,
}: {
  sivilstand?: boolean;
  data:
    | OpplysningerFraFolkeregisteretBostatuskode[]
    | OpplysningerFraFolkeregisteretSivilstandskodePDL[];
}) {
  if (data.length === 0) return null;

  return (
    <CommonTable
      data={{
        headers: [
          {
            name: sivilstand
              ? tekster.tabell.felles.fraDato
              : tekster.tabell.felles.periode,
            width: "190px",
          },
          { name: tekster.tabell.felles.status },
        ],
        rows: data.map((d) => ({
          columns: [
            { content: formatPeriode(d.periode.fom, d.periode.til) },
            { content: d.statusVisningsnavn },
          ],
        })),
      }}
    />
  );
}
