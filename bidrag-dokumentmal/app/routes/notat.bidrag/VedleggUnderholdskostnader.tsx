import { useNotatFelles } from "~/components/notat_felles/NotatContext";
import elementIds from "~/utils/elementIds";
import {
  NotatOffentligeOpplysningerUnderhold,
  DatoperiodeDto,
  NotatUnderholdskostnadPeriodeBeregningsdetaljer,
} from "~/types/Api";
import { DataViewTable, DataViewTableData } from "~/components/DataViewTable";
import GjelderPerson from "~/components/GjelderPerson";
import { CommonTable } from "~/components/CommonTable";
import tekster from "~/tekster";
import { formatPeriode } from "~/utils/date-utils";
import {
  formatterBeløpForBeregning,
  formatterProsent,
} from "~/utils/visningsnavn";
import CalculationTable from "~/components/notat_felles/CalculationTable";

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
      <>
        <h4 className={"mt-2"}>3.3 Beregningsdetaljer tilsynsutgifter</h4>
        {data.underholdskostnader?.underholdskostnaderBarn?.flatMap((uBarn) =>
          uBarn.underholdskostnad.map((underholdskostnader, index) => (
            <div className={"mt-4"}>
              <UnderholdskostnaderBeregningsdetaljerTabell
                detaljer={underholdskostnader.beregningsdetaljer}
                periode={underholdskostnader.periode}
                key={index}
              />
            </div>
          )),
        )}
      </>
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
      <h4>3.1 Barnetilsyn</h4>
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
      <h4 className={"mt-3"}>3.2 Tilleggsstønad</h4>
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
function UnderholdskostnaderBeregningsdetaljerTabell({
  detaljer,
  periode,
}: {
  detaljer?: NotatUnderholdskostnadPeriodeBeregningsdetaljer;
  periode: DatoperiodeDto;
}) {
  return (
    <>
      <DataViewTable
        className={"mb-2"}
        data={[
          {
            label: "Periode",
            value: formatPeriode(periode.fom, periode.tom),
          },
        ]}
      />
      <div className={"flex flex-col gap-3"}>
        <UnderholdskostnadBeregningsdetaljer detaljer={detaljer} />
      </div>
    </>
  );
}

function UnderholdskostnadBeregningsdetaljer({
  detaljer,
}: {
  detaljer?: NotatUnderholdskostnadPeriodeBeregningsdetaljer;
}) {
  if (!detaljer) return <div>Ingen beregningsdetaljer</div>;
  return (
    <>
      <CalculationTable
        title="Tilsynsutgifter"
        data={[
          ...(detaljer.tilsynsutgifterBarn?.flatMap((b) => [
            {
              label: b.gjelderBarn.navn,
              value: `(${formatterBeløpForBeregning(b.totalTilsynsutgift)} - ${formatterBeløpForBeregning(b.kostpenger)}${b.tilleggsstønad ? " - " + formatterBeløpForBeregning(b.tilleggsstønad) : ""}) x 11/12`,
              result: formatterBeløpForBeregning(b.beløp),
            },
          ]) ?? []),
          {
            label: "Total",
            labelBold: true,
            result: `${formatterBeløpForBeregning(detaljer.sumTilsynsutgifter)}`,
          },
        ].filter((d) => d)}
      />

      {detaljer.erBegrensetAvMaksTilsyn && (
        <DataViewTable
          data={[
            {
              label: "Totalbeløp begrenset av maks tilsynsutgift",
              textRight: false,
              labelBold: true,
              value: `${formatterBeløpForBeregning(detaljer.totalTilsynsutgift)}`,
            },
            {
              label: "Andel søknadsbarn",
              textRight: false,
              labelBold: true,
              value: `${formatterBeløpForBeregning(detaljer.faktiskTilsynsutgift)} / ${formatterBeløpForBeregning(detaljer.sumTilsynsutgifter)} = ${formatterProsent(detaljer.fordelingFaktor)}`,
            },
          ].filter((d) => d)}
        />
      )}
      <CalculationTable
        title="Skattefradrag"
        data={[
          {
            label: "Maksfradrag",
            calculation: `${formatterBeløpForBeregning(detaljer.sjablonMaksFradrag)} x ${formatterProsent(detaljer.skattesatsFaktor)}`,
            result: formatterBeløpForBeregning(
              detaljer.skattefradragMaksFradrag,
            ),
          },
          {
            label: "Total tilsynsutgift",
            calculation: `${formatterBeløpForBeregning(detaljer.totalTilsynsutgift)} x ${formatterProsent(detaljer.skattesatsFaktor)}`,
            result: formatterBeløpForBeregning(
              detaljer.skattefradragTotalTilsynsutgift,
            ),
          },
          {
            label: "Skattefradrag (laveste verdi)",
            labelBold: true,
            result: `${formatterBeløpForBeregning(detaljer.skattefradrag)}`,
          },
        ].filter((d) => d)}
      />
      <CalculationTable
        title="Beregnet tilsynsutgifter"
        data={[
          {
            label: "Brutto beløp",
            calculation: detaljer.erBegrensetAvMaksTilsyn
              ? `${formatterBeløpForBeregning(detaljer.totalTilsynsutgift)} x ${formatterProsent(detaljer.fordelingFaktor)}`
              : undefined,
            result: `${formatterBeløpForBeregning(detaljer.bruttoTilsynsutgift)}`,
          },
          {
            label: "Skattefradrag (per barn)",
            calculation: `${formatterBeløpForBeregning(detaljer.skattefradrag)} / ${formatterBeløpForBeregning(detaljer.antallBarn)}`,
            result: `- ${formatterBeløpForBeregning(detaljer.skattefradragPerBarn)}`,
          },
          {
            label: "Resultat",
            labelBold: true,
            result: `${formatterBeløpForBeregning(detaljer.nettoTilsynsutgift)}`,
          },
        ].filter((d) => d)}
      />
    </>
  );
}
