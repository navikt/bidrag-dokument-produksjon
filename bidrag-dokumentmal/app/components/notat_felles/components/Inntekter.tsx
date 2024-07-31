import {
  DelberegningSumInntekt,
  Inntektsrapportering,
  NotatBeregnetInntektDto,
  NotatInntektDto,
  NotatMalType,
  PersonNotatDto,
  Rolletype,
} from "~/types/Api";
import { deductDays, formatPeriode } from "~/utils/date-utils";
import KildeIcon from "~/components/KildeIcon";
import { groupBy, hasValue } from "~/utils/array-utils";
import { formatterBeløp, sammenlignRoller } from "~/utils/visningsnavn";
import Notat from "~/components/Notat";
import elementIds from "~/utils/elementIds";
import {
  CommonTable,
  TableColumn,
  TableHeader,
} from "~/components/CommonTable";
import tekster from "~/tekster";
import { getInntektTableHeaders } from "~/constants/tableHeaders";
import { useNotatFelles } from "~/components/notat_felles/NotatContext";
import Inntektsposter from "~/components/notat_felles/components/Inntektsposter";
import HorizontalLine from "~/components/HorizontalLine";
import {
  BehandlingRolletype,
  inntekterTablesViewRules,
  InntektTableType,
  isHarInntekter,
  beregnetInntekterColumnNames,
  beregnetInntekterColumnWidth,
} from "~/components/inntektTableHelpers";
import InntektTableTitle from "~/components/inntekt/InntektTableTitle";
import InntektRolle from "~/components/inntekt/InntektRolle";
import TableGjelderBarn from "~/components/TableGjelderBarn";

export default function Inntekter() {
  const { erAvslag, data, bidragsmottaker, bidragspliktig, søknadsbarn, type } =
    useNotatFelles();
  if (erAvslag) return null;
  return (
    <div className="soknad_parter section">
      <div className={"elements_inline"}>
        <h2>Inntekter</h2>
        <a href={`#${elementIds.vedleggInntekter}`}>
          se vedlegg nr. 2 for opplysninger fra offentlige registre
        </a>
      </div>
      <InntekterForRolle
        rolle={bidragsmottaker}
        showRole={type !== NotatMalType.FORSKUDD}
      />
      <HorizontalLine />
      {type !== NotatMalType.FORSKUDD && bidragspliktig && (
        <div className={"mt-large"}>
          <InntekterForRolle rolle={bidragspliktig} />
          <HorizontalLine />
        </div>
      )}

      {type !== NotatMalType.FORSKUDD &&
        søknadsbarn.map((barn) => (
          <div key={barn.ident} className={"mt-large"}>
            <InntekterForRolle rolle={barn} />
            <HorizontalLine />
          </div>
        ))}
      <Notat data={data.inntekter.notat} />
    </div>
  );
}

function InntekterForRolle({
  rolle,
  showRole = true,
}: {
  rolle: PersonNotatDto;
  showRole?: boolean;
}) {
  const { data } = useNotatFelles();

  const inntekter = data.inntekter.inntekterPerRolle.find(
    (d) =>
      sammenlignRoller(d.gjelder.rolle, rolle.rolle) &&
      d.gjelder.ident == rolle.ident,
  );
  if (inntekter == null) return null;
  return (
    <div>
      {showRole && <InntektRolle rolle={rolle} />}
      {!isHarInntekter(inntekter) ? (
        <p>Ingen inntekter</p>
      ) : (
        <div style={{ marginTop: "-10px" }}>
          <InntektTable
            data={inntekter.årsinntekter}
            title={"Skattepliktige og pensjonsgivende inntekt"}
          />
          <InntektPerBarnTable
            data={inntekter.barnetillegg}
            title={"Barnetillegg"}
          />
          <InntektTable
            data={inntekter.utvidetBarnetrygd}
            title={"Utvidet barnetrygd"}
            inkluderBeskrivelse={false}
          />
          <InntektTable
            data={inntekter.småbarnstillegg}
            title={"Småbarnstillegg"}
            inkluderBeskrivelse={false}
          />
          <InntektPerBarnTable
            data={inntekter.kontantstøtte}
            title={"Kontantstøtte"}
          />
          <HorizontalLine />
          <BeregnetInntektTable
            data={inntekter.beregnetInntekter}
            rolle={rolle}
          />
        </div>
      )}
    </div>
  );
}

type InntektTableProps = {
  data: NotatInntektDto[];
  title?: string;
  subtitle?: string;
  inkluderBeskrivelse?: boolean;
  bareMedIBeregning?: boolean;
};

function InntektTable({
  data,
  title,
  subtitle,
  bareMedIBeregning = true,
  inkluderBeskrivelse = true,
}: InntektTableProps) {
  const inntekter = data.filter((d) => !bareMedIBeregning || d.medIBeregning);
  if (inntekter.length == 0) return null;
  return (
    <div className={"subsection"}>
      <InntektTableTitle title={title} subtitle={subtitle} />
      <CommonTable
        data={{
          headers: [
            { name: tekster.tabell.felles.fraTilOgMed, width: "170px" },
            inkluderBeskrivelse && {
              name: tekster.tabell.felles.beskrivelse,
              width: "230px",
            },
            {
              name: tekster.tabell.felles.kilde,
              width: inkluderBeskrivelse ? "80px" : "230px",
            },
            { name: tekster.tabell.inntekt.beløp },
          ].filter((d) => typeof d != "boolean") as TableHeader[],
          rows: inntekter
            .sort((a, b) =>
              a.periode?.fom && b.periode?.fom
                ? a.periode?.fom.localeCompare(b.periode?.fom)
                : 1,
            )
            .map((d, i) => {
              const periode = d.periode ?? d.opprinneligPeriode;
              return {
                columns: [
                  { content: formatPeriode(periode!.fom, periode!.til) },
                  inkluderBeskrivelse && { content: d.visningsnavn },
                  { content: <KildeIcon kilde={d.kilde} /> },
                  { content: formatterBeløp(d.beløp) },
                ].filter((d) => typeof d != "boolean") as TableColumn[],
                expandableContent:
                  d.inntektsposter.length > 0
                    ? [
                        {
                          content: (
                            <Inntektsposter
                              data={d}
                              periode={periode}
                              withHorizontalLine={inntekter.length > i + 1}
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

function InntektPerBarnTable({
  data,
  title,
  subtitle,
  bareMedIBeregning = true,
}: InntektTableProps) {
  const inntekter = data.filter((d) => !bareMedIBeregning || d.medIBeregning);
  if (inntekter.length == 0) return null;

  const inntekterBarn = groupBy(data, (d) => d.gjelderBarn?.ident!);
  return (
    <div style={{ marginTop: "16px" }}>
      <InntektTableTitle title={title} subtitle={subtitle} />
      {inntekterBarn.map(([key, value], i) => {
        const gjelderBarn = value[0].gjelderBarn!;
        const erBarnetillegg =
          value[0].type == Inntektsrapportering.BARNETILLEGG;
        const addMargin = inntekterBarn.length > i + 1;
        return (
          <div
            key={gjelderBarn + key + i.toString()}
            className="table_container"
            style={{
              marginBottom: addMargin ? "16px" : "0px",
            }}
          >
            <TableGjelderBarn gjelderBarn={gjelderBarn} />
            <CommonTable
              width={"580px"}
              data={{
                headers: getInntektTableHeaders(erBarnetillegg),
                rows: value
                  .filter((d) => !bareMedIBeregning || d.medIBeregning)
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
                                  formatterBeløp(d.beløp / 12),
                                ),
                              },
                              { content: formatterBeløp(d.beløp) },
                            ]
                          : [{ content: formatterBeløp(d.beløp) }],
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

type BeregnetInntektTableProps = {
  data: NotatBeregnetInntektDto[];
  rolle: PersonNotatDto;
};

function BeregnetInntektTable({ data, rolle }: BeregnetInntektTableProps) {
  const { type, harFlereEnnEttSøknadsbarn } = useNotatFelles();
  const inntektTableRules =
    inntekterTablesViewRules[type][rolle.rolle as BehandlingRolletype];

  const columnNames =
    beregnetInntekterColumnNames[type][rolle.rolle as BehandlingRolletype];

  const columnWidth =
    beregnetInntekterColumnWidth[type][rolle.rolle as BehandlingRolletype];
  function renderTable(
    inntekter: DelberegningSumInntekt[],
    gjelderBarn?: PersonNotatDto,
  ) {
    return (
      <>
        {harFlereEnnEttSøknadsbarn && gjelderBarn && (
          <TableGjelderBarn gjelderBarn={gjelderBarn} />
        )}
        <CommonTable
          width={"580px"}
          data={{
            headers: [
              {
                name: tekster.tabell.felles.fraTilOgMed,
                width: columnWidth[tekster.tabell.felles.fraTilOgMed],
              },
              {
                name: columnNames.SKATTEPLIKTIG,
                width: columnWidth[columnNames.SKATTEPLIKTIG as string],
              },
              hasValue(inntektTableRules, InntektTableType.BARNETILLEGG) && {
                name: columnNames.BARNETILLEGG,
                width: columnWidth[columnNames.BARNETILLEGG as string],
              },
              hasValue(
                inntektTableRules,
                InntektTableType.UTVIDET_BARNETRYGD,
              ) && {
                name: columnNames.UTVIDET_BARNETRYGD,
                width: columnWidth[columnNames.UTVIDET_BARNETRYGD as string],
              },
              hasValue(inntektTableRules, InntektTableType.SMÅBARNSTILLEGG) && {
                name: columnNames.SMÅBARNSTILLEGG,
                width: columnWidth[columnNames.SMÅBARNSTILLEGG as string],
              },
              hasValue(inntektTableRules, InntektTableType.KONTANTSTØTTE) && {
                name: columnNames.KONTANTSTØTTE,
                width: columnWidth[columnNames.KONTANTSTØTTE as string],
              },
              {
                name: columnNames.TOTAL_INNTEKTER,
                width: columnWidth[columnNames.TOTAL_INNTEKTER as string],
              },
            ].filter((d) => typeof d != "boolean") as TableHeader[],
            rows: inntekter.map((d) => ({
              columns: [
                {
                  content: formatPeriode(
                    d.periode!.fom,
                    deductDays(d.periode!.til, 1),
                  ),
                },
                { content: formatterBeløp(d.skattepliktigInntekt ?? 0) },
                hasValue(inntektTableRules, InntektTableType.BARNETILLEGG) && {
                  content: formatterBeløp(d.barnetillegg ?? 0),
                },
                hasValue(
                  inntektTableRules,
                  InntektTableType.UTVIDET_BARNETRYGD,
                ) && { content: formatterBeløp(d.utvidetBarnetrygd ?? 0) },
                hasValue(
                  inntektTableRules,
                  InntektTableType.SMÅBARNSTILLEGG,
                ) && { content: formatterBeløp(d.småbarnstillegg ?? 0) },
                hasValue(inntektTableRules, InntektTableType.KONTANTSTØTTE) && {
                  content: formatterBeløp(d.kontantstøtte ?? 0),
                },
                { content: formatterBeløp(d.totalinntekt ?? 0) },
              ].filter((d) => typeof d != "boolean") as TableColumn[],
            })),
          }}
        />
      </>
    );
  }

  function renderForAllChildren() {
    const inntekterBarn = groupBy(data, (d) => d.gjelderBarn?.ident!);
    return inntekterBarn.map(([key, value], i) => {
      const gjelderBarn = value[0].gjelderBarn!;
      const inntekter = value[0].summertInntektListe;
      const addMargin = i != 0;
      return (
        <div
          key={gjelderBarn + key + i.toString()}
          className="table_container"
          style={{ marginTop: addMargin ? "16px" : "0px" }}
        >
          {renderTable(inntekter, gjelderBarn)}
        </div>
      );
    });
  }

  const harInntekter = data.every((d) => d.summertInntektListe.length > 0);

  if (!harInntekter) return;
  return (
    <div className={"subsection"}>
      <InntektTableTitle title={"Beregnet totalt"} />
      {rolle.rolle === Rolletype.BA
        ? renderTable(
            data.find((d) => d.gjelderBarn.ident == rolle.ident)
              ?.summertInntektListe ?? [],
          )
        : renderForAllChildren()}
    </div>
  );
}
