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
import Inntektspost from "~/components/Inntekspost";
import elementIds from "~/utils/elementIds";
import tekster from "~/utils/tekster";

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
    <div>
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
    <div className={"background_section"}>
      <table className="table ">
        <tr>
          <th>Fra og med - Til og med</th>
          {inkluderBeskrivelse && <th>Beskrivelse</th>}
          <th>Beløp</th>
        </tr>
        {data
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
            return (
              <>
                <tr>
                  <td style={{ width: "300px" }}>
                    {formatPeriode(periode!.fom, periode!.til)}
                  </td>
                  {inkluderBeskrivelse && (
                    <td style={{ width: "250px" }}>{d.visningsnavn}</td>
                  )}
                  <td>{formatterBeløp(d.beløp)}</td>
                </tr>
                {medInntektsposter && d.inntektsposter.length > 0 && (
                  <tr>
                    <td colSpan={3}>
                      <div
                        style={{
                          width: "700px",
                          borderBottom: "1px solid black",
                        }}
                      >
                        <Inntektspost
                          label={"Periode"}
                          value={formatPeriode(periode!.fom, periode!.til)}
                        />
                        {d.inntektsposter.map((d, i) => (
                          <Inntektspost
                            key={d.kode + i.toString()}
                            label={d.visningsnavn!}
                            value={formatterBeløp(d.beløp)}
                          />
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            );
          })}
      </table>
    </div>
  );
}

function ArbeidsforholdTable({ data }: { data: Arbeidsforhold[] }) {
  if (data.length === 0) return null;
  return (
    <table className="table" style={{ width: "500px" }}>
      <tr>
        <th style={{ width: "100px" }}>Periode</th>
        <th style={{ width: "100px" }}>Arbeidsgiver</th>
        <th style={{ width: "50px" }}>Stilling</th>
        <th style={{ width: "100px" }}>Lønnsendring</th>
      </tr>
      {data.map((d, i) => (
        <tr key={"arbeidsforhold" + d.periode.fom + i.toString()}>
          <td>{formatPeriode(d.periode.fom, d.periode.til)}</td>
          <td>{d.arbeidsgiver}</td>
          <td>
            {d.stillingProsent != undefined ? d.stillingProsent + "%" : "0%"}
          </td>
          <td>{dateToDDMMYYYY(d.lønnsendringDato)}</td>
        </tr>
      ))}
    </table>
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
          <div key={key + i.toString()} className="background_section">
            <TableGjelderBarn gjelderBarn={gjelderBarn} />
            <table className="table" style={{ width: "580px" }}>
              <colgroup>
                <col style={{ width: "200px" }} />
                <col style={{ width: "70px" }} />
                {erBarnetillegg ? (
                  <>
                    <col style={{ width: "150px" }} />
                    <col style={{ width: "100px" }} />
                    <col style={{ width: "120px" }} />
                  </>
                ) : (
                  <col style={{ width: "100px" }} />
                )}
              </colgroup>
              <tr>
                <th>Fra og med - Til og med</th>
                <th>Kilde</th>
                {erBarnetillegg ? (
                  <>
                    <th>Type</th>
                    <th>Beløp (mnd)</th>
                    <th>Beløp (12mnd)</th>
                  </>
                ) : (
                  <th>Beløp</th>
                )}
              </tr>
              {data
                .filter((d) => d.kilde == Kilde.OFFENTLIG)
                .map((d) => {
                  const periode = d.periode ?? d.opprinneligPeriode;
                  const visningsnavnInntektstype =
                    d.inntektsposter.length > 0
                      ? d.inntektsposter[0].visningsnavn
                      : "";
                  return (
                    <tr key={d.type + d.opprinneligPeriode?.fom}>
                      <td>{formatPeriode(periode!.fom, periode!.til)}</td>
                      <td>
                        <KildeIcon kilde={d.kilde} />
                      </td>
                      {erBarnetillegg ? (
                        <>
                          <td>{visningsnavnInntektstype}</td>
                          <td>{formatterBeløp(Math.round(d.beløp / 12))}</td>
                          <td>{formatterBeløp(d.beløp)}</td>
                        </>
                      ) : (
                        <td>{formatterBeløp(d.beløp)}</td>
                      )}
                    </tr>
                  );
                })}
            </table>
          </div>
        );
      })}
    </div>
  );
}
