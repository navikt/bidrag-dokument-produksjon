import {
  NotatResultatSaerbidragsberegningDto,
  Resultatkode,
} from "~/types/Api";
import {
  formatterBeløp,
  formatterProsent,
  formatterBeløpForBeregning,
} from "~/utils/visningsnavn";
import { useNotatFelles } from "~/components/notat_felles/NotatContext";
import { DataViewTable, DataViewTableData } from "~/components/DataViewTable";
import { VedtakFattetDetaljer } from "~/components/notat_felles/components/VedtakFattetDetaljer";
import tekster from "~/tekster";
import { dateToDDMMYYYY } from "~/utils/date-utils";
import elementIds from "~/utils/elementIds";
import { erResutlatMedBeregning } from "~/routes/notat.særbidrag/SærbidragHelpers";
import { calculationTableBottomBorder } from "~/utils/stylingUtils";

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
        <div className={"elements_inline"}>
          <h2>Vedtak</h2>
          {erResutlatMedBeregning(
            (data.vedtak?.resultat as NotatResultatSaerbidragsberegningDto[]) ??
              [],
          ) && (
            <a href={`#${elementIds.vedleggBeregningsdetaljer}`}>
              se vedlegg nr. 3 for beregningsdetaljer
            </a>
          )}
        </div>
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
        <UtgifsposterTabell />
        <DataViewTable
          labelColWidth={"90px"}
          key={"inntekter"}
          data={
            [
              {
                label: "Årsak",
                value: resultat.resultatVisningsnavn,
              },
              resultat.resultatKode ==
              Resultatkode.GODKJENTBELOPERLAVEREENNFORSKUDDSSATS
                ? {
                    label: "Forskuddssaats",
                    value: formatterBeløp(resultat.forskuddssats, true),
                  }
                : null,
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
            ].filter((d) => d != null) as DataViewTableData[]
          }
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
        <UtgifsposterTabell />
        <DataViewTable
          title="Inntekter"
          className={"two_column_view_v2"}
          labelColWidth={"140px"}
          width={"35%"}
          key={"inntekter"}
          data={[
            {
              label: `Inntekt ${tekster.begreper.bidragsmottaker}`,
              value: formatterBeløp(resultat.inntekter!.inntektBM, true),
            },
            {
              label: `Inntekt ${tekster.begreper.bidragspliktig}`,
              value: formatterBeløp(resultat.inntekter!.inntektBP, true),
            },
            {
              label: `Inntekt ${tekster.begreper.barn}`,
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
              label: "Maks godkjent beløp",
              value: formatterBeløp(resultat.maksGodkjentBeløp, true),
            },
            {
              label: `${tekster.begreper.bidragspliktiges} andel`,
              value: formatterProsent(resultat.bpsAndel?.endeligAndelFaktor),
            },
            {
              label: `${tekster.begreper.bidragspliktig} har evne`,
              value: !resultat.bpHarEvne ? "Nei" : "Ja",
            },
            {
              label: "Resultat",
              value: erBeregningeAvslag
                ? "Avslag"
                : formatterBeløp(resultat.resultat, true),
            },
            {
              label: `Betalt av ${tekster.begreper.bidragspliktig}`,
              value: formatterBeløp(
                resultat.beregning?.totalBeløpBetaltAvBp,
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
function UtgifsposterTabell() {
  const { data } = useNotatFelles();
  const utgifstposter = data.utgift?.utgifter ?? [];
  const beregnetSærbidrag = data.utgift?.beregning!;
  return (
    <div className={"mb-medium"}>
      <h4>{"Utgiftene lagt til grunn"}</h4>
      <table
        className={"border-collapse"}
        style={{
          textAlign: "left",
          tableLayout: "auto",
          width: "450px",
          marginLeft: "-2px",
        }}
      >
        <thead>
          <tr>
            <th style={{ width: "50px" }}>
              {tekster.tabell.utgifter.betaltAvBp}
            </th>
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
              <td style={{ width: "100px" }}>
                {utgifspost.betaltAvBp ? "Ja" : "Nei"}
              </td>
              <td style={{}}>{dateToDDMMYYYY(utgifspost.dato)}</td>
              <td style={{}}>{utgifspost.utgiftstypeVisningsnavn}</td>
              <td style={{ textAlign: "right" }}>
                {formatterBeløpForBeregning(utgifspost.kravbeløp, true)}
              </td>
              <td style={{ textAlign: "right" }}>
                {formatterBeløpForBeregning(utgifspost.godkjentBeløp, true)}
              </td>
            </tr>
          ))}
          <tr>
            <td className={`text-left ${calculationTableBottomBorder}`}>Sum</td>
            <td className={`text-right ${calculationTableBottomBorder}`} />
            <td className={`text-right ${calculationTableBottomBorder}`} />
            <td className={`text-right ${calculationTableBottomBorder}`}>
              {formatterBeløpForBeregning(
                beregnetSærbidrag.totalKravbeløp,
                true,
              )}
            </td>
            <td className={`text-right ${calculationTableBottomBorder}`}>
              {formatterBeløpForBeregning(
                beregnetSærbidrag.totalGodkjentBeløp,
                true,
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
