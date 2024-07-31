import { dateToDDMMYYYY, formatPeriode } from "~/utils/date-utils";
import {
  Arbeidsforhold,
  Inntektsrapportering,
  Kilde,
  NotatInntektDto,
  PersonNotatDto,
  NotatMalType,
} from "~/types/Api";
import { formatterBeløp, sammenlignRoller } from "~/utils/visningsnavn";
import { groupBy } from "~/utils/array-utils";
import KildeIcon from "~/components/KildeIcon";
import elementIds from "~/utils/elementIds";
import tekster from "~/tekster";
import {
  CommonTable,
  TableColumn,
  TableHeader,
} from "~/components/CommonTable";
import { getInntektTableHeaders } from "~/constants/tableHeaders";
import { useNotatFelles } from "~/components/notat_felles/NotatContext";
import Inntektsposter from "~/components/notat_felles/components/Inntektsposter";
import HorizontalLine from "~/components/HorizontalLine";
import { isHarInntekter } from "~/components/inntektTableHelpers";
import InntektTableTitle from "~/components/inntekt/InntektTableTitle";
import InntektRolle from "~/components/inntekt/InntektRolle";
import TableGjelderBarn from "~/components/TableGjelderBarn";

export default function VedleggInntekter() {
  const { erAvslag, bidragsmottaker, bidragspliktig, søknadsbarn, type } =
    useNotatFelles();
  if (erAvslag) return null;

  return (
    <div style={{ pageBreakBefore: "always" }}>
      <h2 id={elementIds.vedleggInntekter}>
        Vedlegg nr. 2: Inntekt - {tekster.fraOffentligeRegistre}
      </h2>
      <OpplysningerForRolle
        rolle={bidragsmottaker}
        showRole={type !== NotatMalType.FORSKUDD}
      />
      {type !== NotatMalType.FORSKUDD && bidragspliktig && (
        <div className={"mt-medium"}>
          <HorizontalLine />
          <OpplysningerForRolle rolle={bidragspliktig} />
          <HorizontalLine />
        </div>
      )}
      {type !== NotatMalType.FORSKUDD &&
        søknadsbarn.map((barn) => (
          <div key={barn.ident} className={"mt-medium"}>
            <OpplysningerForRolle rolle={barn} />
            <HorizontalLine />
          </div>
        ))}
    </div>
  );
}

function OpplysningerForRolle({
  rolle,
  showRole = true,
}: {
  rolle: PersonNotatDto;
  showRole?: boolean;
}) {
  const { data } = useNotatFelles();

  const inntekter = data.inntekter.offentligeInntekterPerRolle.find(
    (d) =>
      sammenlignRoller(d.gjelder.rolle, rolle.rolle) &&
      d.gjelder.ident == rolle.ident,
  );
  if (!inntekter) return null;

  return (
    <div>
      {showRole && <InntektRolle rolle={rolle} />}
      {inntekter.arbeidsforhold && inntekter.arbeidsforhold.length > 0 && (
        <div>
          <h4>2.1 Arbeidsforhold</h4>
          <ArbeidsforholdTable data={inntekter.arbeidsforhold} />
        </div>
      )}
      {!isHarInntekter(inntekter) ? (
        <p>Ingen offentlige inntekter</p>
      ) : (
        <>
          <OffentligeInntekter
            data={inntekter.årsinntekter}
            tittel={"2.2 Skattepliktige og pensjonsgivende inntekter"}
            medInntektsposter
          />
          <OffentligeInntekter
            data={inntekter.barnetillegg}
            tittel={"2.3 Barnetillegg"}
            medBarn
          />
          <OffentligeInntekter
            data={inntekter.utvidetBarnetrygd}
            tittel={"2.4 Utvidet barnetrygd"}
          />
          <OffentligeInntekter
            data={inntekter.småbarnstillegg}
            tittel={"2.5 Småbarnstillegg"}
          />
          <OffentligeInntekter
            data={inntekter.kontantstøtte}
            tittel={"2.6 Kontantstøtte"}
            medBarn
          />
        </>
      )}
    </div>
  );
}

type OffentligeInntekterProps = {
  tittel: string;
  data: NotatInntektDto[];
  medBarn?: boolean;
  medInntektsposter?: boolean;
};

function OffentligeInntekter({
  tittel,
  data,
  medBarn,
  medInntektsposter,
}: OffentligeInntekterProps) {
  if (data.length == 0) return null;
  return (
    <div className={"subsection"}>
      <InntektTableTitle title={tittel} />
      {medBarn ? (
        <InntektPerBarnTable data={data} />
      ) : (
        <InntektTable data={data} medInntektsposter={medInntektsposter} />
      )}
    </div>
  );
}

type InntektTableProps = {
  data: NotatInntektDto[];
  inkluderBeskrivelse?: boolean;
  medInntektsposter?: boolean;
};

function InntektTable({
  data,
  inkluderBeskrivelse = true,
  medInntektsposter,
}: InntektTableProps) {
  return (
    <div className={"table_container"}>
      <CommonTable
        data={{
          headers: [
            { name: tekster.tabell.felles.fraTilOgMed, width: "155px" },
            inkluderBeskrivelse && {
              name: tekster.tabell.felles.beskrivelse,
              width: "160px",
            },
            { name: tekster.tabell.inntekt.beløp },
          ].filter((d) => typeof d != "boolean") as TableHeader[],
          rows: data.map((d, i) => {
            const periode = d.opprinneligPeriode;
            return {
              columns: [
                { content: formatPeriode(periode!.fom, periode!.til) },
                inkluderBeskrivelse && { content: d.visningsnavn },
                { content: formatterBeløp(d.beløp) },
              ].filter((d) => typeof d != "boolean") as TableColumn[],
              expandableContent:
                medInntektsposter && d.inntektsposter.length > 0
                  ? [
                      {
                        content: (
                          <Inntektsposter
                            data={d}
                            periode={periode}
                            withHorizontalLine={data.length > i + 1}
                          />
                        ),
                      },
                    ]
                  : undefined,
            };
          }),
        }}
      />
    </div>
  );
}

function ArbeidsforholdTable({ data }: { data: Arbeidsforhold[] }) {
  if (data.length === 0) return null;

  return (
    <CommonTable
      width={"450px"}
      data={{
        headers: [
          { name: tekster.tabell.felles.periode, width: "100px" },
          { name: tekster.tabell.arbeidsforhold.arbeidsgiver, width: "140px" },
          { name: tekster.tabell.arbeidsforhold.stilling, width: "40px" },
          { name: tekster.tabell.arbeidsforhold.lønnsendring, width: "40px" },
        ],
        rows: data.map((d) => ({
          columns: [
            { content: formatPeriode(d.periode.fom, d.periode.til) },
            { content: d.arbeidsgiver },
            {
              content:
                d.stillingProsent != undefined ? d.stillingProsent + "%" : "0%",
            },
            { content: dateToDDMMYYYY(d.lønnsendringDato) },
          ],
        })),
      }}
    />
  );
}
function InntektPerBarnTable({ data }: InntektTableProps) {
  if (data.length == 0) return null;
  return (
    <div>
      {groupBy(data, (d) => d.gjelderBarn?.ident!).map(([key, value], i) => {
        const gjelderBarn = value[0].gjelderBarn!;
        const erBarnetillegg =
          value[0].type == Inntektsrapportering.BARNETILLEGG;
        return (
          <div key={key + i.toString()} className="table_container">
            <TableGjelderBarn gjelderBarn={gjelderBarn} />
            <CommonTable
              width={"580px"}
              data={{
                headers: getInntektTableHeaders(erBarnetillegg),
                rows: data
                  .filter((d) => d.kilde == Kilde.OFFENTLIG)
                  .map((d) => {
                    const periode = d.periode ?? d.opprinneligPeriode;
                    const visningsnavnInntektstype =
                      d.inntektsposter.length > 0
                        ? d.inntektsposter[0].visningsnavn
                        : "";
                    return {
                      columns: [
                        { content: formatPeriode(periode!.fom, periode!.til) },
                        { content: <KildeIcon kilde={d.kilde} /> },
                        erBarnetillegg
                          ? [
                              { content: visningsnavnInntektstype },
                              {
                                content: formatterBeløp(
                                  Math.round(d.beløp / 12),
                                ),
                              },
                              { content: formatterBeløp(d.beløp) },
                            ]
                          : { content: formatterBeløp(d.beløp) },
                      ].flatMap((d) => d),
                    };
                  }),
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
