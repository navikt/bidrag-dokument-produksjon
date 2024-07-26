import {
  Vedtak as VedtakDto,
  NotatResultatSaerbidragsberegningDto,
  Resultatkode,
} from "~/types/Api";
import { dateToDDMMYYYY } from "~/utils/date-utils";
import DataDescription from "~/components/DataDescription";
import { formatterBeløp, formatterProsent } from "~/utils/visningsnavn";
import { useNotatFelles } from "~/components/notat_felles/NotatContext";
import { DataViewTable } from "~/components/DataViewTable";

export default function Vedtak() {
  const { erAvslag, data } = useNotatFelles();
  return (
    <div
      className={"section"}
      style={{
        pageBreakBefore: erAvslag ? "auto" : "always",
        display: "inline-block",
      }}
    >
      <h2>Vedtak</h2>
      <VedtakTable
        data={data.vedtak.resultat as NotatResultatSaerbidragsberegningDto[]}
      />
      <VedtakFattetDetaljer data={data.vedtak} />
    </div>
  );
}

function VedtakFattetDetaljer({ data }: { data: VedtakDto }) {
  if (!data.erFattet) return null;
  return (
    <div>
      <h4 style={{ marginBottom: "0" }}>Ferdigstilt</h4>
      <DataDescription
        label={"Saksbehandler"}
        value={data.fattetAvSaksbehandler}
      />
      <DataDescription
        label={"Dato"}
        value={dateToDDMMYYYY(data.fattetTidspunkt)}
      />
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
  const erBeregningeAvslag =
    resultat?.resultatKode !== Resultatkode.SAeRBIDRAGINNVILGET;
  if (erDirekteAvslag) {
    return (
      <div>
        <h2>Avslag</h2>
        <p>
          <dl className="bd_datadisplay">
            <dt>Årsak</dt>
            <dd>{resultat.resultatVisningsnavn}</dd>
          </dl>
        </p>
      </div>
    );
  }
  return (
    <div style={{ paddingTop: "10px" }}>
      {erBeregningeAvslag ? (
        <h3>Avslag: {resultat.resultatVisningsnavn}</h3>
      ) : (
        <h3>Særbidrag innvilget</h3>
      )}
      <div>
        <DataViewTable
          title="Inntekter"
          labelColWidth={"85px"}
          width={"34%"}
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
          width={"45%"}
          labelColWidth={"175px"}
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
          labelColWidth={"150px"}
          width={"100%"}
          key={"Beregning"}
          data={[
            {
              label: "Godkjent beløp",
              value: formatterBeløp(
                resultat.beregning?.totalGodkjentBeløp,
                true,
              ),
            },
            {
              label: "BP's andel",
              value: formatterProsent(resultat.bpsAndel?.andelProsent),
            },
            {
              label: "Resultat",
              value: erBeregningeAvslag
                ? "Avslag"
                : formatterBeløp(resultat.resultat, true),
            },
            {
              label: "Direkte betalt av BP",
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
    </div>
  );
}
