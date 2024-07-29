import {
  DelberegningSumInntekt,
  Inntektsrapportering,
  NotatBeregnetInntektDto,
  NotatInntektDto,
  NotatMalType,
  PersonNotatDto,
  Rolletype,
} from "~/types/Api";
import { dateToDDMMYYYY, deductDays, formatPeriode } from "~/utils/date-utils";
import KildeIcon from "~/components/KildeIcon";
import { groupBy, hasValue } from "~/utils/array-utils";
import {
  formatterBeløp,
  rolleTilVisningsnavn,
  sammenlignRoller,
} from "~/utils/visningsnavn";
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
} from "~/components/inntektTableHelpers";

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
        <>
          <InntekterForRolle rolle={bidragspliktig} />
          <HorizontalLine />
        </>
      )}

      {type !== NotatMalType.FORSKUDD &&
        søknadsbarn.map((barn) => (
          <div key={barn.ident}>
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
    <div className={"mt-medium"}>
      {showRole && (
        <div className={"elements_inline"}>
          <h5 style={{ marginRight: 5, paddingRight: 0 }}>
            {rolleTilVisningsnavn(rolle.rolle!)}
          </h5>
          {rolle.rolle === Rolletype.BA && <p>{rolle.navn}</p>}
        </div>
      )}
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
      <TableTitle title={title} subtitle={subtitle} />
      <div className={"table_container"}>
        <CommonTable
          data={{
            headers: [
              { name: tekster.tabell.felles.fraTilOgMed, width: "200px" },
              inkluderBeskrivelse && {
                name: tekster.tabell.felles.beskrivelse,
                width: "250px",
              },
              { name: tekster.tabell.felles.kilde, width: "70px" },
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

  return (
    <div style={{ paddingTop: "10px" }}>
      <TableTitle title={title} subtitle={subtitle} />
      {groupBy(data, (d) => d.gjelderBarn?.ident!).map(([key, value], i) => {
        const gjelderBarn = value[0].gjelderBarn!;
        const erBarnetillegg =
          value[0].type == Inntektsrapportering.BARNETILLEGG;
        return (
          <div
            key={gjelderBarn + key + i.toString()}
            className="table_container"
          >
            <GjelderBarn gjelderBarn={gjelderBarn} />
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
                                  Math.round(d.beløp / 12),
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
  function renderTable(
    inntekter: DelberegningSumInntekt[],
    gjelderBarn?: PersonNotatDto,
  ) {
    return (
      <>
        {harFlereEnnEttSøknadsbarn && gjelderBarn && (
          <GjelderBarn gjelderBarn={gjelderBarn} />
        )}
        <CommonTable
          width={"700px"}
          data={{
            headers: [
              { name: tekster.tabell.felles.fraTilOgMed, width: "170px" },
              {
                name: columnNames.SKATTEPLIKTIG,
                width: "100px",
              },
              hasValue(inntektTableRules, InntektTableType.BARNETILLEGG) && {
                name: columnNames.BARNETILLEGG,
                width: "60px",
              },
              hasValue(
                inntektTableRules,
                InntektTableType.UTVIDET_BARNETRYGD,
              ) && {
                name: columnNames.UTVIDET_BARNETRYGD,
                width: "80px",
              },
              hasValue(inntektTableRules, InntektTableType.SMÅBARNSTILLEGG) && {
                name: columnNames.SMÅBARNSTILLEGG,
                width: "80px",
              },
              hasValue(inntektTableRules, InntektTableType.KONTANTSTØTTE) && {
                name: columnNames.KONTANTSTØTTE,
                width: "60px",
              },
              { name: columnNames.TOTAL_INNTEKTER, width: "60px" },
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

  const harInntekter = data.every((d) => d.summertInntektListe.length > 0);

  if (!harInntekter) return;
  return (
    <div className={"subsection"}>
      <TableTitle title={"Beregnet totalt"} />
      {rolle.rolle === Rolletype.BA
        ? renderTable(
            data.find((d) => d.gjelderBarn.ident == rolle.ident)
              ?.summertInntektListe ?? [],
          )
        : groupBy(data, (d) => d.gjelderBarn?.ident!).map(([key, value], i) => {
            const gjelderBarn = value[0].gjelderBarn!;
            const inntekter = value[0].summertInntektListe;
            return (
              <div
                key={gjelderBarn + key + i.toString()}
                className="table_container"
                style={{ paddingTop: "10px" }}
              >
                {renderTable(inntekter, gjelderBarn)}
              </div>
            );
          })}
    </div>
  );
}

function GjelderBarn({ gjelderBarn }: { gjelderBarn: PersonNotatDto }) {
  return (
    <dl>
      <dt>{gjelderBarn.navn}</dt>
      <dd style={{ display: "inline-table" }}>
        / {dateToDDMMYYYY(gjelderBarn.fødselsdato)}
      </dd>
    </dl>
  );
}

function TableTitle({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) {
  if (!title) return null;
  return (
    <div style={{ display: "inline-block", verticalAlign: "middle" }}>
      <h4 style={{ padding: 0, margin: "0 0 5px 0", display: "inline" }}>
        {title}
      </h4>
      {subtitle && <span>{subtitle}</span>}
    </div>
  );
}
