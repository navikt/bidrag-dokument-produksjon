import { NotatForskuddProps, useNotat } from "~/routes/notat.forskudd/route";
import {
  InntekterPerRolle,
  Inntektsrapportering,
  NotatBeregnetInntektDto,
  NotatInntektDto,
  PersonNotatDto,
  Rolletype,
} from "~/types/Api";
import { dateToDDMMYYYY, deductDays, formatPeriode } from "~/utils/date-utils";
import KildeIcon from "~/components/KildeIcon";
import { groupBy } from "~/utils/array-utils";
import { erRolle, formatterBeløp } from "~/utils/visningsnavn";
import Notat from "~/components/Notat";
import elementIds from "~/utils/elementIds";
import {
  CommonTable,
  TableColumn,
  TableHeader,
} from "~/components/CommonTable";
import tekster from "~/tekster";
import { getInntektTableHeaders } from "~/constants/tableHeaders";
import Inntektsposter from "~/routes/notat.forskudd/Inntektsposter";

export default function Inntekter({ data }: NotatForskuddProps) {
  const { erAvslag } = useNotat();
  if (erAvslag) return null;
  return (
    <div className="soknad_parter section">
      <div className={"elements_inline"}>
        <h2>Inntekter</h2>
        <a href={`#${elementIds.vedleggInntekter}`}>
          se vedlegg nr. 2 for opplysninger fra offentlige registre
        </a>
      </div>
      <InntekterBidragsmottaker
        data={data.inntekter.inntekterPerRolle.find((d) =>
          erRolle(d.gjelder.rolle, Rolletype.BM),
        )}
      />
      <Notat data={data.inntekter.notat} />
    </div>
  );
}

function InntekterBidragsmottaker({ data }: { data?: InntekterPerRolle }) {
  if (data == null) return null;
  return (
    <div>
      <div style={{ marginTop: "-10px" }}>
        <InntektTable
          data={data.årsinntekter}
          title={"Skattepliktige og pensjonsgivende inntekt"}
        />
        <InntektPerBarnTable data={data.barnetillegg} title={"Barnetillegg"} />
        <InntektTable
          data={data.utvidetBarnetrygd}
          title={"Utvidet barnetrygd"}
          inkluderBeskrivelse={false}
        />
        <InntektTable
          data={data.småbarnstillegg}
          title={"Småbarnstillegg"}
          inkluderBeskrivelse={false}
        />
        <InntektPerBarnTable
          data={data.kontantstøtte}
          title={"Kontantstøtte"}
        />
        <div
          className="horizontal-line"
          style={{
            pageBreakAfter: "avoid",
          }}
        ></div>
        <BeregnetInntektTable data={data.beregnetInntekter} />
      </div>
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
              .map((d) => {
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
                              <Inntektsposter data={d} periode={periode} />
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
};

function BeregnetInntektTable({ data }: BeregnetInntektTableProps) {
  return (
    <div className={"subsection"}>
      <TableTitle title={"Beregnet totalt"} />
      {groupBy(data, (d) => d.gjelderBarn?.ident!).map(([key, value], i) => {
        const gjelderBarn = value[0].gjelderBarn!;
        const inntekter = value[0].summertInntektListe;
        return (
          <div
            key={gjelderBarn + key + i.toString()}
            className="table_container"
            style={{ paddingTop: "10px" }}
          >
            <GjelderBarn gjelderBarn={gjelderBarn} />
            <CommonTable
              width={"700px"}
              data={{
                headers: [
                  { name: tekster.tabell.felles.fraTilOgMed, width: "170px" },
                  {
                    name: tekster.tabell.beregnet.skattepliktigInntekt,
                    width: "100px",
                  },
                  { name: tekster.tabell.beregnet.barnetillegg, width: "60px" },
                  {
                    name: tekster.tabell.beregnet.utvidetBarnetrygd,
                    width: "80px",
                  },
                  {
                    name: tekster.tabell.beregnet.småbarnstillegg,
                    width: "80px",
                  },
                  {
                    name: tekster.tabell.beregnet.kontantstøtte,
                    width: "60px",
                  },
                  { name: tekster.tabell.beregnet.total, width: "60px" },
                ],
                rows: inntekter.map((d) => ({
                  columns: [
                    {
                      content: formatPeriode(
                        d.periode!.fom,
                        deductDays(d.periode!.til, 1),
                      ),
                    },
                    { content: formatterBeløp(d.skattepliktigInntekt ?? 0) },
                    { content: formatterBeløp(d.barnetillegg ?? 0) },
                    { content: formatterBeløp(d.utvidetBarnetrygd ?? 0) },
                    { content: formatterBeløp(d.småbarnstillegg ?? 0) },
                    { content: formatterBeløp(d.kontantstøtte ?? 0) },
                    { content: formatterBeløp(d.totalinntekt ?? 0) },
                  ],
                })),
              }}
            />
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
