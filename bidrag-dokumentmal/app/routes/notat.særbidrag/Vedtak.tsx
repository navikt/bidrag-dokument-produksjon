import {
  NotatResultatSaerbidragsberegningDto,
  Resultatkode,
} from "~/types/Api";
import { formatterBeløp, formatterProsent } from "~/utils/visningsnavn";
import { useNotatFelles } from "~/components/notat_felles/NotatContext";
import { DataViewTable } from "~/components/DataViewTable";
import { VedtakFattetDetaljer } from "~/components/notat_felles/components/VedtakFattetDetaljer";
import tekster from "~/tekster";
import { dateToDDMMYYYY } from "~/utils/date-utils";

export default function Vedtak() {
  const { erAvslag, data } = useNotatFelles();
  return (
    <div>
      <div
        style={{
          pageBreakBefore: erAvslag ? "auto" : "always",
          display: "inline-block",
        }}
      >
        <h2>Vedtak</h2>
        <VedtakTable
          data={data.vedtak.resultat as NotatResultatSaerbidragsberegningDto[]}
        />
      </div>
      <VedtakFattetDetaljer data={data.vedtak} />
    </div>
  );
}

function VedtakTable({
  data,
}: {
  data: NotatResultatSaerbidragsberegningDto[];
}) {
  if (data.length == 0) return <div>Mangler resultat</div>;
  const resultat = data[0]!;
  const erDirekteAvslag = resultat?.erDirekteAvslag;
  const erAvslagSomInneholderUtgifter = [
    Resultatkode.GODKJENTBELOPERLAVEREENNFORSKUDDSSATS,
    Resultatkode.ALLE_UTGIFTER_ER_FORELDET,
  ].includes(resultat.resultatKode);
  const erBeregningeAvslag =
    resultat?.resultatKode !== Resultatkode.SAeRBIDRAGINNVILGET;
  if (erDirekteAvslag) {
    return (
      <div>
        <h3 style={{ marginTop: 0 }}>Avslag</h3>
        <p>
          <dl className="bd_datadisplay">
            <dt>Årsak: </dt>
            <dd>{resultat.resultatVisningsnavn}</dd>
          </dl>
        </p>
      </div>
    );
  }
  if (erAvslagSomInneholderUtgifter) {
    return (
      <div>
        <h3 style={{ marginTop: 0 }}>Avslag</h3>
        <DataViewTable
          labelColWidth={"90px"}
          key={"inntekter"}
          data={[
            {
              label: "Årsak",
              value: resultat.resultatVisningsnavn,
            },
            {
              label: "Kravbeløp",
              value: formatterBeløp(resultat.beregning?.totalKravbeløp, true),
            },
            {
              label: "Godkjent beløp",
              value: formatterBeløp(
                resultat.beregning?.totalGodkjentBeløp,
                true,
              ),
            },
          ]}
        />
        <UtgifsposterTabell />
      </div>
    );
  }
  return (
    <div style={{ paddingTop: "0px" }}>
      {erBeregningeAvslag ? (
        <h3 style={{ marginTop: 0 }}>
          Avslag: {resultat.resultatVisningsnavn}
        </h3>
      ) : (
        <h3 style={{ marginTop: 0 }}>Særbidrag innvilget</h3>
      )}
      <div>
        <DataViewTable
          title="Inntekter"
          className={"two_column_view_v2"}
          labelColWidth={"75px"}
          width={"28%"}
          key={"inntekter"}
          data={[
            {
              label: "Inntekt BM",
              value: formatterBeløp(resultat.inntekter!.inntektBM, true),
            },
            {
              label: "Inntekt BP",
              value: formatterBeløp(resultat.inntekter!.inntektBP, true),
            },
            {
              label: "Inntekt BA",
              value: formatterBeløp(resultat.inntekter!.inntektBarn, true),
            },
          ]}
        />

        <DataViewTable
          title="Boforhold"
          className={"two_column_view_v2"}
          width={"45%"}
          labelColWidth={"145px"}
          key={"Boforhold"}
          data={[
            {
              label: "Antall barn i husstanden",
              value: resultat.antallBarnIHusstanden,
            },
            {
              label: "Voksne i husstanden",
              value: resultat.voksenIHusstanden
                ? resultat.enesteVoksenIHusstandenErEgetBarn
                  ? "Ja (barn over 18 år)"
                  : "Ja"
                : "Nei",
            },
          ]}
        />
        <DataViewTable
          title="Beregning"
          className={"two_column_view_v2 mt-medium"}
          labelColWidth={"130px"}
          width={"100%"}
          key={"Beregning"}
          data={[
            {
              label: "Kravbeløp",
              value: formatterBeløp(resultat.beregning?.totalKravbeløp, true),
            },
            {
              label: "Godkjent beløp",
              value: formatterBeløp(
                resultat.beregning?.totalGodkjentBeløp,
                true,
              ),
            },
            {
              label: "BP's andel",
              value: formatterProsent(resultat.bpsAndel?.andelFaktor),
            },
            {
              label: "BP har evne",
              value: !resultat.bpHarEvne ? "Nei" : "Ja",
            },
            {
              label: "Resultat",
              value: erBeregningeAvslag
                ? "Avslag"
                : formatterBeløp(resultat.resultat, true),
            },
            {
              label: "Betalt av BP",
              value: formatterBeløp(
                resultat.beregning?.beløpDirekteBetaltAvBp,
                true,
              ),
            },
            {
              label: "Beløp som innkreves",
              value: erBeregningeAvslag
                ? "Avslag"
                : formatterBeløp(resultat.beløpSomInnkreves, true),
            },
          ]}
        />
      </div>
      <UtgifsposterTabell />
    </div>
  );
}
function UtgifsposterTabell() {
  const { data } = useNotatFelles();
  const utgifstposter = data.utgift?.utgifter ?? [];
  return (
    <div className={"mt-medium"}>
      <h4>{"Utgiftene lagt til grunn"}</h4>
      <table
        style={{
          textAlign: "left",
          tableLayout: "auto",
          width: "350px",
          marginLeft: "-2px",
        }}
      >
        <thead>
          <tr>
            <th>{tekster.tabell.utgifter.dato}</th>
            <th>{tekster.tabell.utgifter.utgift}</th>
            <th style={{ textAlign: "right" }}>
              {tekster.tabell.utgifter.kravbeløp}
            </th>
            <th style={{ textAlign: "right" }}>
              {tekster.tabell.utgifter.godkjentBeløp}
            </th>
          </tr>
        </thead>
        <tbody>
          {utgifstposter.map((utgifspost, rowIndex) => (
            <tr key={rowIndex}>
              <td style={{}}>{dateToDDMMYYYY(utgifspost.dato)}</td>
              <td style={{}}>{utgifspost.utgiftstypeVisningsnavn}</td>
              <td style={{ textAlign: "right" }}>
                {formatterBeløp(utgifspost.kravbeløp, true)}
              </td>
              <td style={{ textAlign: "right" }}>
                {formatterBeløp(utgifspost.godkjentBeløp, true)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
