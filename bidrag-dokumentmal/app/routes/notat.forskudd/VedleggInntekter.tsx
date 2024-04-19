import { NotatForskuddProps, useNotat } from "~/routes/notat.forskudd/route";
import { dateToDDMMYYYY, formatPeriode } from "~/utils/date-utils";
import {
  Arbeidsforhold,
  InntekterPerRolle,
  Inntektsrapportering,
  Kilde,
  NotatInntektDto,
  Rolletype,
} from "~/types/Api";
import { erRolle } from "~/utils/visningsnavn";
import { groupBy } from "~/utils/array-utils";
import KildeIcon from "~/components/KildeIcon";
import TableGjelderBarn from "~/components/TableGjelderBarn";
import Inntektspost from "~/components/Inntekspost";
import elementIds from "~/utils/elementIds";

export default function VedleggInntekter({ data }: NotatForskuddProps) {
  const { erAvslag } = useNotat();
  if (erAvslag) return null;
  return (
    <div style={{ pageBreakBefore: "always" }}>
      <h2 id={elementIds.vedleggInntekter}>Vedlegg nr. 2: Inntekt</h2>
      <OpplysningerBidragsmottaker
        data={data.inntekter.inntekterPerRolle.find((d) =>
          erRolle(d.gjelder.rolle, Rolletype.BM),
        )}
      />
    </div>
  );
}

function OpplysningerBidragsmottaker({ data }: { data?: InntekterPerRolle }) {
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
      />
      <OffentligeInntekter
        data={data.barnetillegg}
        tittel={"2.3 Barnetillegg"}
        medBarn
      />
      <OffentligeInntekter
        data={data.utvidetBarnetrygd}
        tittel={"2.4 Utvidet barnetrygd"}
      />
      <OffentligeInntekter
        data={data.småbarnstillegg}
        tittel={"2.5 Småbarnstillegg"}
      />
      <OffentligeInntekter
        data={data.kontantstøtte}
        tittel={"2.6 Kontantstøtte"}
        medBarn
      />
    </div>
  );
}

function OffentligeInntekter({
  tittel,
  data,
  medBarn,
  medInntektsposter,
}: {
  tittel: string;
  data: NotatInntektDto[];
  medBarn?: boolean;
  medInntektsposter?: boolean;
}) {
  const offentligeInntekter = data.filter((d) => d.kilde == Kilde.OFFENTLIG);
  if (offentligeInntekter.length == 0) return null;
  return (
    <div>
      <h4>{tittel}</h4>
      {medBarn ? (
        <InntektPerBarnTable data={offentligeInntekter} />
      ) : (
        <InntektTable
          data={offentligeInntekter}
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
};

function InntektTable({
  data,
  inkluderBeskrivelse = true,
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
          .filter((d) => d.kilde == Kilde.OFFENTLIG)
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
                  <td>{d.beløp}</td>
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
                            value={d.beløp!}
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
                <col style={{ width: "50px" }} />
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
                    <tr>
                      <td>{formatPeriode(periode!.fom, periode!.til)}</td>
                      <td>
                        <KildeIcon kilde={d.kilde} />
                      </td>
                      {erBarnetillegg ? (
                        <>
                          <td>{visningsnavnInntektstype}</td>
                          <td>{Math.round(d.beløp / 12)}</td>
                          <td>{d.beløp}</td>
                        </>
                      ) : (
                        <td>{d.beløp}</td>
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
