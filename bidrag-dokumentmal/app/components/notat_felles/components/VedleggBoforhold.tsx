import {
  dateOrNull,
  DateToDDMMYYYYString,
  formatPeriode,
} from "~/utils/date-utils";
import {
  AndreVoksneIHusstandenDetaljerDto,
  Bostatuskode,
  NotatMalType,
  OpplysningerFraFolkeregisteretMedDetaljerBostatuskodeUnit,
  OpplysningerFraFolkeregisteretMedDetaljerSivilstandskodePDLUnit,
  OpplysningerFraFolkeregisteretMedDetaljerBostatuskodeAndreVoksneIHusstandenDetaljerDto,
} from "~/types/Api";
import { groupBy } from "~/utils/array-utils";
import DataDescription from "~/components/DataDescription";
import Person from "~/components/Person";
import elementIds from "~/utils/elementIds";
import tekster from "~/tekster";
import { CommonTable } from "~/components/CommonTable";
import { useNotatFelles } from "~/components/notat_felles/NotatContext";

export default function VedleggBoforhold() {
  const { erAvslag, data, type } = useNotatFelles();
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
              style={{ marginBottom: "0px" }}
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
              }}
            ></div>
          </div>
        );
      })}
      {type !== NotatMalType.FORSKUDD &&
        data.boforhold.andreVoksneIHusstanden
          ?.opplysningerFraFolkeregisteret && (
          <div>
            <h3>Andre voksne i husstanden</h3>
            <div className="table_container">
              <BoforholdTable
                data={
                  data.boforhold.andreVoksneIHusstanden
                    .opplysningerFraFolkeregisteret
                }
              />
            </div>
          </div>
        )}
      {type == NotatMalType.FORSKUDD && (
        <div>
          <h3>Sivilstand</h3>
          <div className="table_container">
            <BoforholdTable
              data={data.boforhold.sivilstand.opplysningerFraFolkeregisteret}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function BoforholdTable({
  data,
}: {
  data:
    | OpplysningerFraFolkeregisteretMedDetaljerBostatuskodeUnit[]
    | OpplysningerFraFolkeregisteretMedDetaljerBostatuskodeAndreVoksneIHusstandenDetaljerDto[]
    | OpplysningerFraFolkeregisteretMedDetaljerSivilstandskodePDLUnit[];
}) {
  if (data.length === 0) return null;

  const erSivilstand = isSivilstand(data);
  return (
    <CommonTable
      data={{
        headers: [
          {
            name: erSivilstand
              ? tekster.tabell.felles.fraDato
              : tekster.tabell.felles.periode,
            width: "80px",
          },
          { name: tekster.tabell.felles.status },
        ],
        rows: data.map((d) => ({
          columns: [
            { content: formatPeriode(d.periode.fom, d.periode.til) },
            {
              content:
                isAndreVoksneIHusstanden(d) &&
                d.status == Bostatuskode.BOR_MED_ANDRE_VOKSNE
                  ? `${d.statusVisningsnavn} (${d.detaljer?.totalAntallHusstandsmedlemmer})`
                  : d.statusVisningsnavn,
            },
          ],
          expandableContent:
            isAndreVoksneIHusstanden(d) &&
            d.status == Bostatuskode.BOR_MED_ANDRE_VOKSNE
              ? [
                  {
                    content: (
                      <AndreVoksneiHusstandenDetaljer
                        andreVoksneIHusstandenDetaljer={d.detaljer!}
                      />
                    ),
                  },
                ]
              : undefined,
        })),
      }}
    />
  );
}

function AndreVoksneiHusstandenDetaljer({
  andreVoksneIHusstandenDetaljer,
}: {
  andreVoksneIHusstandenDetaljer: AndreVoksneIHusstandenDetaljerDto;
}) {
  return (
    <>
      <h3 style={{ width: "200px" }}>Hvem bor på adresse?</h3>
      <ul
        style={{
          listStyleType: "decimal",
          width: "300px",
          marginTop: "-2px",
          marginLeft: "-10px",
        }}
      >
        {andreVoksneIHusstandenDetaljer.husstandsmedlemmer.map(
          (husstandsmedlem, index) => {
            return (
              <li key={husstandsmedlem.navn + "-" + index}>
                {DateToDDMMYYYYString(dateOrNull(husstandsmedlem.fødselsdato)!)}
                {husstandsmedlem.harRelasjonTilBp &&
                  " (Relasjon til Bidragspliktig)"}
              </li>
            );
          },
        )}
      </ul>
    </>
  );
}
function isSivilstand(
  data:
    | OpplysningerFraFolkeregisteretMedDetaljerBostatuskodeUnit[]
    | OpplysningerFraFolkeregisteretMedDetaljerBostatuskodeAndreVoksneIHusstandenDetaljerDto[]
    | OpplysningerFraFolkeregisteretMedDetaljerSivilstandskodePDLUnit[],
): data is OpplysningerFraFolkeregisteretMedDetaljerSivilstandskodePDLUnit[] {
  return data && data.length > 0 && data[0].periode !== undefined;
}
function isAndreVoksneIHusstandenListe(
  data: (
    | OpplysningerFraFolkeregisteretMedDetaljerBostatuskodeUnit
    | OpplysningerFraFolkeregisteretMedDetaljerBostatuskodeAndreVoksneIHusstandenDetaljerDto
    | OpplysningerFraFolkeregisteretMedDetaljerSivilstandskodePDLUnit
  )[],
): data is OpplysningerFraFolkeregisteretMedDetaljerBostatuskodeAndreVoksneIHusstandenDetaljerDto[] {
  return (
    data &&
    data.length > 0 &&
    [
      Bostatuskode.BOR_IKKE_MED_ANDRE_VOKSNE,
      Bostatuskode.BOR_MED_ANDRE_VOKSNE,
    ].includes(data[0].status as Bostatuskode)
  );
}

function isAndreVoksneIHusstanden(
  data:
    | OpplysningerFraFolkeregisteretMedDetaljerBostatuskodeUnit
    | OpplysningerFraFolkeregisteretMedDetaljerBostatuskodeAndreVoksneIHusstandenDetaljerDto
    | OpplysningerFraFolkeregisteretMedDetaljerSivilstandskodePDLUnit,
): data is OpplysningerFraFolkeregisteretMedDetaljerBostatuskodeAndreVoksneIHusstandenDetaljerDto {
  return isAndreVoksneIHusstandenListe([data]);
}
