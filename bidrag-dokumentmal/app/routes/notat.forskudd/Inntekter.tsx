import {NotatForskuddProps} from "~/routes/notat.forskudd/route";
import {
    InntekterPerRolle,
    Inntektsrapportering,
    NotatBeregnetInntektDto,
    NotatInntektDto,
    PersonNotatDto,
    Rolletype
} from "~/types/Api";
import {dateToDDMMYYYY, formatPeriode} from "~/utils/date-utils";
import React from "react";
import KildeIcon from "~/components/KildeIcon";
import {groupBy} from "~/utils/array-utils";
import {erRolle} from "~/utils/visningsnavn";


export default function Inntekter({data}: NotatForskuddProps) {

    return <div className="soknad_parter">
        <h2>Inntekter</h2>
        <InntekterBidragsmottaker
            data={data.inntekter.inntekterPerRolle.find((d) => erRolle(d.gjelder.rolle, Rolletype.BM))}/>
    </div>
}

function InntekterBidragsmottaker({data}: { data?: InntekterPerRolle }) {
    if (data == null) return null
    return <div>
        <div style={{marginTop: "-10px"}}>
            <InntektTable data={data.årsinntekter} title={"Skattepliktige og pensjonsgivende inntekt"}/>
            <InntektPerBarnTable data={data.barnetillegg} title={"Barnetillegg"}/>
            <InntektTable data={data.utvidetBarnetrygd} title={"Utvidet barnetrygd"} inkluderBeskrivelse={false}/>
            <InntektTable data={data.småbarnstillegg} title={"Småbarnstillegg"} inkluderBeskrivelse={false}/>
            <InntektPerBarnTable data={data.kontantstøtte} title={"Kontantstøtte"}/>
            <BeregnetInntektTable data={data.beregnetInntekter}/>
        </div>
    </div>
}


type InntektTableProps = {
    data: NotatInntektDto[],
    title?: string
    subtitle?: string,
    inkluderBeskrivelse?: boolean
    bareMedIBeregning?: boolean
}

function InntektTable({
                          data,
                          title,
                          subtitle,
                          bareMedIBeregning = true,
                          inkluderBeskrivelse = true
                      }: InntektTableProps) {
    if (data.length == 0) return null
    return <div style={{paddingTop: "10px"}}>
        <TableTitle title={title} subtitle={subtitle}/>
        <div className={"background_section"}>
            <table className="table ">
                <tr>
                    <th style={{width: "200px"}}>Fra og med - Til og med</th>
                    {inkluderBeskrivelse && <th style={{width: "250px"}}>Beskrivelse</th>}
                    <th style={{width: "50px"}}>Kilde</th>
                    <th>Beløp</th>
                </tr>
                {data.filter((d) => !bareMedIBeregning || d.medIBeregning).map((d) => {
                    const periode = d.periode ?? d.opprinneligPeriode
                    return (
                        <tr>
                            <td>{formatPeriode(periode!!.fom, periode!!.til)}</td>
                            {inkluderBeskrivelse && <td>{d.visningsnavn}</td>}
                            <td><KildeIcon kilde={d.kilde}/></td>
                            <td>{d.beløp}</td>
                        </tr>
                    )
                })}

            </table>
        </div>
    </div>
}

function InntektPerBarnTable({data, title, subtitle, bareMedIBeregning = true}: InntektTableProps) {
    if (data.length == null) return null
    return <div style={{paddingTop: "10px"}}>
        <TableTitle title={title} subtitle={subtitle}/>
        {groupBy(data, (d) => d.gjelderBarn?.ident!!).map(([key, value]) => {
            const gjelderBarn = value[0].gjelderBarn!!
            const erBarnetillegg = value[0].type == Inntektsrapportering.BARNETILLEGG
            return <div className="background_section">
                <GjelderBarn gjelderBarn={gjelderBarn}/>
                <table className="table" style={{width: "580px"}}>
                    <colgroup>
                        <col style={{width: "200px"}}/>
                        <col style={{width: "50px"}}/>
                        {erBarnetillegg ? <>
                            <col style={{width: "150px"}}/>
                            <col style={{width: "100px"}}/>
                            <col style={{width: "120px"}}/>
                        </> : <col style={{width: "100px"}}/>
                        }

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
                        ) : <th>Beløp</th>}

                    </tr>
                    {data.filter((d) => !bareMedIBeregning || d.medIBeregning).map((d) => {
                        const periode = d.periode ?? d.opprinneligPeriode
                        const visningsnavnInntektstype = d.inntektsposter.length > 0 ? d.inntektsposter[0].visningsnavn : ""
                        return (
                            <tr>
                                <td>{formatPeriode(periode!!.fom, periode!!.til)}</td>
                                <td><KildeIcon kilde={d.kilde}/></td>
                                {erBarnetillegg ? (
                                    <>
                                        <td>{visningsnavnInntektstype}</td>
                                        <td>{Math.round(d.beløp / 12)}</td>
                                        <td>{d.beløp}</td>
                                    </>
                                ) : <td>{d.beløp}</td>}
                            </tr>
                        )
                    })}

                </table>
            </div>
        })}
    </div>
}

type BeregnetInntektTableProps = {
    data: NotatBeregnetInntektDto[],
}

function BeregnetInntektTable({data}: BeregnetInntektTableProps) {
    return <div>
        <TableTitle title={"Beregnet totalt"}/>
        {groupBy(data, (d) => d.gjelderBarn?.ident!!).map(([key, value]) => {
            const gjelderBarn = value[0].gjelderBarn!!
            const inntekter = value[0].summertInntektListe
            return <div className="background_section" style={{paddingTop: "10px"}}>
                <GjelderBarn gjelderBarn={gjelderBarn}/>
                <table className="table" style={{width: "700px"}}>
                    <tr>
                        <th style={{width: "170px"}}>Fra og med - Til og med</th>
                        <th style={{width: "100px"}}>Skattepliktige- inntekter</th>
                        <th style={{width: "60px"}}>Barne- tillegg</th>
                        <th style={{width: "80px"}}>Utvidet- barnetrygd</th>
                        <th style={{width: "80px"}}>Småbarns- tillegg</th>
                        <th style={{width: "60px"}}>Kontant- støtte</th>
                        <th style={{width: "60px"}}>Totalt</th>
                    </tr>
                    {inntekter.map((d) => {
                        return (
                            <tr>
                                <td>{formatPeriode(d.periode!!.fom, d.periode!!.til)}</td>
                                <td>{d.skattepliktigInntekt ?? 0}</td>
                                <td>{d.barnetillegg ?? 0}</td>
                                <td>{d.utvidetBarnetrygd ?? 0}</td>
                                <td>{d.småbarnstillegg ?? 0}</td>
                                <td>{d.kontantstøtte ?? 0}</td>
                                <td>{d.totalinntekt ?? 0}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        })}
    </div>

}

function GjelderBarn({gjelderBarn}: { gjelderBarn: PersonNotatDto }) {
    // return <div style={{display: "inline-block"}}><BaTag/><Person navn={gjelderBarn.navn!!} fødselsdato={gjelderBarn.fødselsdato!!}/></div>
    return <dl>
        <dt>{gjelderBarn.navn}</dt>
        <dd style={{display: "inline-table"}}>
            / {dateToDDMMYYYY(gjelderBarn.fødselsdato)}
        </dd>
    </dl>
}

function BaTag() {
    return <div style={{
        display: "inline-block",
        border: "1px solid black",
        width: "1rem",
        borderRadius: "0.25rem",
        backgroundColor: "#e0d8e9",
        padding: "0 0.375rem",
        marginRight: "0.25rem",
        alignItems: "center"
    }}>BA</div>
}

function TableTitle({title, subtitle}: { title?: string, subtitle?: string }) {
    if (!title) return null
    return <div style={{display: "inline-block", verticalAlign: "middle"}}>
        <h4 style={{padding: 0, margin: "0 0 5px 0", display: "inline"}}>{title}</h4>
        {subtitle && <span>{subtitle}</span>}
    </div>
}
