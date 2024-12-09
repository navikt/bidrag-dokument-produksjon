import { useNotatFelles } from "~/components/notat_felles/NotatContext";
import elementIds from "~/utils/elementIds";
import { NotatOffentligeOpplysningerUnderhold } from "~/types/Api";
import { DataViewTable, DataViewTableData } from "~/components/DataViewTable";
import GjelderPerson from "~/components/GjelderPerson";
import { CommonTable } from "~/components/CommonTable";
import tekster from "~/tekster";
import { formatPeriode } from "~/utils/date-utils";

export default function VedleggUnderholdskostnader() {
  const { data, erAvslag } = useNotatFelles();
  if (erAvslag) return null;
  return (
    <div style={{ pageBreakBefore: "always" }}>
      <h2 id={elementIds.vedleggUnderholdskostnader}>
        Vedlegg nr. 3: Underholdskostnader
      </h2>
      {data.underholdskostnader?.offentligeOpplysninger.map(
        (offentligOpplysningBarn, index) => (
          <InnhentetBarnetilsynTable
            opplysninger={offentligOpplysningBarn}
            key={index}
          />
        ),
      )}
    </div>
  );
}

function InnhentetBarnetilsynTable({
  opplysninger,
}: {
  opplysninger: NotatOffentligeOpplysningerUnderhold;
}) {
  return (
    <>
      <h4>4.1 Barnetilsyn</h4>
      <GjelderPerson rolle={opplysninger.gjelderBarn!} />
      {opplysninger.barnetilsyn.length == 0 ? (
        <p>Ingen offentlig barnetilsyn</p>
      ) : (
        <CommonTable
          layoutAuto
          data={{
            headers: [
              {
                name: tekster.tabell.felles.fraTilOgMed,
                width: "150px",
              },
            ],
            rows: opplysninger.barnetilsyn.map((periode) => ({
              columns: [
                {
                  content: formatPeriode(
                    periode.periode.fom,
                    periode.periode.til,
                  ),
                },
              ],
            })),
          }}
        />
      )}
      <h4 className={"mt-3"}>4.2 Tilleggsstønad</h4>
      <GjelderPerson rolle={opplysninger.gjelder!} />
      <DataViewTable
        className={"pt-2 pb-2"}
        data={
          [
            {
              label: "Har innvilget tilleggsstønad",
              value: opplysninger.harTilleggsstønad ? "Ja" : "Nei",
            },
          ].filter((d) => d != null) as DataViewTableData[]
        }
      />
    </>
  );
}
