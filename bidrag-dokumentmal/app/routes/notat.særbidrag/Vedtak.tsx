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
import React from "react";
import {VedtakFattetDetaljer} from "~/components/notat_felles/components/VedtakFattetDetaljer";

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
        <VedtakFattetDetaljer data={data.vedtak}/>

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
  const erGodkjentBeløpLavereEnnForskuddssats =
      resultat.resultatKode === Resultatkode.GODKJENTBELOPERLAVEREENNFORSKUDDSSATS;
  const erBeregningeAvslag =
    resultat?.resultatKode !== Resultatkode.SAeRBIDRAGINNVILGET;
  if (erDirekteAvslag) {
    return (
      <div>
        <h3 style={{ marginTop: 0 }}>Avslag</h3>
        <p>
          <dl className="bd_datadisplay">
            <dt>Årsak</dt>
            <dd>{resultat.resultatVisningsnavn}</dd>
          </dl>
        </p>
      </div>
    );
  }
  if (erGodkjentBeløpLavereEnnForskuddssats) {
    return (
        <div>
          <h3 style={{marginTop: 0}}>Avslag</h3>
          <DataViewTable
              labelColWidth={"90px"}
              key={"inntekter"}
              data={[
                {
                  label: "Årsak",
                  value: resultat.resultatVisningsnavn,
                },
                {
                  label: "Godkjent beløp",
                  value: formatterBeløp(resultat.beregning?.totalGodkjentBeløp, true),
                },

              ]}
          />
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
          className={"three_column_view"}
          labelColWidth={"75px"}
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
          className={"three_column_view"}
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
          className={"three_column_view mt-medium"}
          labelColWidth={"130px"}
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
              label: "BP har evne",
              value: !resultat.bpHarEvne ? "Nei" : "Ja"
            },
         /*   {
              label: "Direkte betalt av BP",
              value: formatterBeløp(
                resultat.beregning?.beløpDirekteBetaltAvBp,
                true,
              ),
            },*/
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
