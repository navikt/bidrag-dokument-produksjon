import { NotatForskuddProps, useNotat } from "~/routes/notat.forskudd/route";
import {
  dateOrNull,
  dateToDDMMYYYY,
  formatPeriode,
  isAfterEqualsDate,
} from "~/utils/date-utils";
import {
  Arbeidsforhold,
  InntekterPerRolle,
  Inntektsrapportering,
  Kilde,
  NotatInntektDto,
  Rolletype,
} from "~/types/Api";
import { erRolle, formatterBeløp } from "~/utils/visningsnavn";
import { groupBy } from "~/utils/array-utils";
import KildeIcon from "~/components/KildeIcon";
import TableGjelderBarn from "~/components/TableGjelderBarn";
import elementIds from "~/utils/elementIds";
import tekster from "~/tekster";
import {
  CommonTable,
  TableColumn,
  TableHeader,
} from "~/components/CommonTable";
import { getInntektTableHeaders } from "~/constants/tableHeaders";
import Inntektsposter from "~/routes/notat.forskudd/Inntektsposter";

export default function VedleggInntekter({ data }: NotatForskuddProps) {
  const { erAvslag } = useNotat();
  if (erAvslag) return null;
  const virkningstidspunkt = dateOrNull(
    data.virkningstidspunkt.virkningstidspunkt,
  );
  return (
    <div style={{ pageBreakBefore: "always" }}>
      <h2 id={elementIds.vedleggInntekter}>
        Vedlegg nr. 2: Inntekt - {tekster.fraOffentligeRegistre}
      </h2>
      <OpplysningerBidragsmottaker
        virkningstidspunkt={virkningstidspunkt}
        data={data.inntekter.inntekterPerRolle.find((d) =>
          erRolle(d.gjelder.rolle, Rolletype.BM),
        )}
      />
    </div>
  );
}

function OpplysningerBidragsmottaker({
  data,
  virkningstidspunkt,
}: {
  data?: InntekterPerRolle;
  virkningstidspunkt?: Date | null;
}) {
  if (!data) return null;
  return (
    <div>
      <div>
        <h4>2.1 Arbeidsforhold</h4>
        <ArbeidsforholdTable data={data.arbeidsforhold} />
      </div>
      <OffentligeInntekter
        data={data.årsinntekter}
        tittel={"2.2 Skattepliktige og pensjonsgivende inntekter"}
        medInntektsposter
        sorterEtterOpprinneligPeriode={false}
      />
      <OffentligeInntekter
        data={data.barnetillegg}
        tittel={"2.3 Barnetillegg"}
        filtrerInntekterSomIkkeInkludererDato={virkningstidspunkt}
        medBarn
      />
      <OffentligeInntekter
        data={data.utvidetBarnetrygd}
        filtrerInntekterSomIkkeInkludererDato={virkningstidspunkt}
        tittel={"2.4 Utvidet barnetrygd"}
      />
      <OffentligeInntekter
        data={data.småbarnstillegg}
        filtrerInntekterSomIkkeInkludererDato={virkningstidspunkt}
        tittel={"2.5 Småbarnstillegg"}
      />
      <OffentligeInntekter
        data={data.kontantstøtte}
        filtrerInntekterSomIkkeInkludererDato={virkningstidspunkt}
        tittel={"2.6 Kontantstøtte"}
        medBarn
      />
    </div>
  );
}
type OffentligeInntekterProps = {
  tittel: string;
  data: NotatInntektDto[];
  medBarn?: boolean;
  medInntektsposter?: boolean;
  sorterEtterOpprinneligPeriode?: boolean;
  filtrerInntekterSomIkkeInkludererDato?: Date | null;
};

function OffentligeInntekter({
  tittel,
  data,
  medBarn,
  medInntektsposter,
  sorterEtterOpprinneligPeriode,
  filtrerInntekterSomIkkeInkludererDato,
}: OffentligeInntekterProps) {
  const offentligeInntekter = data.filter(
    (d) =>
      d.kilde == Kilde.OFFENTLIG &&
      (filtrerInntekterSomIkkeInkludererDato == null ||
        isAfterEqualsDate(
          d.opprinneligPeriode?.til,
          filtrerInntekterSomIkkeInkludererDato,
        )),
  );
  if (offentligeInntekter.length == 0) return null;
  return (
    <div className={"subsection"}>
      <h4>{tittel}</h4>
      {medBarn ? (
        <InntektPerBarnTable data={offentligeInntekter} />
      ) : (
        <InntektTable
          data={offentligeInntekter}
          sorterEtterOpprinneligPeriode={sorterEtterOpprinneligPeriode}
          medInntektsposter={medInntektsposter}
        />
      )}
    </div>
  );
}

type InntektTableProps = {
  data: NotatInntektDto[];
  inkluderBeskrivelse?: boolean;
  medInntektsposter?: boolean;
  sorterEtterOpprinneligPeriode?: boolean;
};

function InntektTable({
  data,
  inkluderBeskrivelse = true,
  sorterEtterOpprinneligPeriode = false,
  medInntektsposter,
}: InntektTableProps) {
  return (
    <div className={"table_container"}>
      <CommonTable
        data={{
          headers: [
            { name: tekster.tabell.felles.fraTilOgMed, width: "200px" },
            inkluderBeskrivelse && {
              name: tekster.tabell.felles.beskrivelse,
              width: "200px",
            },
            { name: tekster.tabell.inntekt.beløp },
          ].filter((d) => typeof d != "boolean") as TableHeader[],
          rows: data
            .sort((a, b) =>
              !sorterEtterOpprinneligPeriode ||
              a.opprinneligPeriode == null ||
              b.opprinneligPeriode == null
                ? 0
                : a.opprinneligPeriode.fom.localeCompare(
                    b.opprinneligPeriode.fom,
                  ),
            )
            .map((d) => {
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
  );
}

function ArbeidsforholdTable({ data }: { data: Arbeidsforhold[] }) {
  if (data.length === 0) return null;

  return (
    <CommonTable
      width={"500px"}
      data={{
        headers: [
          { name: tekster.tabell.felles.periode, width: "100px" },
          { name: tekster.tabell.arbeidsforhold.arbeidsgiver, width: "100px" },
          { name: tekster.tabell.arbeidsforhold.stilling, width: "50px" },
          { name: tekster.tabell.arbeidsforhold.lønnsendring, width: "100px" },
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
