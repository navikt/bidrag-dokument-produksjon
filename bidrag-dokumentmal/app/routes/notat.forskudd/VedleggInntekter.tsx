import {NotatForskuddProps} from "~/routes/notat.forskudd/route";
import {dateToDDMMYYYY, formatPeriode} from "~/utils/date-utils";
import React from "react";
import {Arbeidsforhold, InntekterPerRolle, Kilde, NotatInntektDto, Rolletype} from "~/types/Api";
import {erRolle} from "~/utils/visningsnavn";

export default function VedleggInntekter({data}: NotatForskuddProps) {

    return <div style={{pageBreakBefore: "always"}}>
        <h2>Vedlegg nr. 2: Inntekt</h2>
        <OpplysningerBidragsmottaker
            data={data.inntekter.inntekterPerRolle.find((d) => erRolle(d.gjelder.rolle, Rolletype.BM))}/>
    </div>
}

function OpplysningerBidragsmottaker({data}: { data?: InntekterPerRolle }) {

    if (!data) return null
    return <div>
        <div>
            <h4>2.1 Arbeidsforhold</h4>
            <ArbeidsforholdTable data={data.arbeidsforhold}/>
        </div>
        <div>
            <h4>2.2 Skattepliktige og pensjonsgivende inntekter</h4>
            <InntektTable data={data.årsinntekter}/>
        </div>
    </div>
}

type InntektTableProps = {
    data: NotatInntektDto[],
    inkluderBeskrivelse?: boolean
}

function InntektTable({data, inkluderBeskrivelse = true}: InntektTableProps) {
    return <div className={"background_section"}>
        <table className="table ">
            <tr>
                <th>Fra og med - Til og med</th>
                {inkluderBeskrivelse && <th >Beskrivelse</th>}
                <th>Beløp</th>
            </tr>
            {data.filter((d) => d.kilde == Kilde.OFFENTLIG).map((d) => {
                const periode = d.opprinneligPeriode
                return (
                    <>
                        <tr>
                            <td  style={{width: "300px"}}>{formatPeriode(periode!!.fom, periode!!.til)}</td>
                            {inkluderBeskrivelse && <td style={{width: "250px"}}>{d.visningsnavn}</td>}
                            <td>{d.beløp}</td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <div style={{paddingLeft: "10px", paddingBottom: "10px", width: "700px", borderBottom: "1px solid black"}}>
                                    <Inntektspost label={"Periode"}
                                                  value={formatPeriode(periode!!.fom, periode!!.til)}/>
                                    {d.inntektsposter.map((d) => (
                                        <Inntektspost label={d.visningsnavn!!} value={d.beløp!!}/>
                                    ))}
                                </div>
                            </td>
                        </tr>
                    </>
                )
            })}

        </table>
    </div>
}

function Inntektspost({label, value}: { label?: string, value?: string | number }) {
    return (
        <dl>
            <dt style={{fontWeight: "normal"}}>{label}:</dt>
            <dd>{value}</dd>
        </dl>
    );
}

function ArbeidsforholdTable({data}: { data: Arbeidsforhold[] }) {
    if (data.length === 0) return null
    return <table className="table">
        <tr>
            <th style={{width: "100px"}}>Periode</th>
            <th style={{width: "100px"}}>Arbeidsgiver</th>
            <th style={{width: "50px"}}>Stilling</th>
            <th style={{width: "100px"}}>Lønnsendring</th>
        </tr>
        {data.map((d) => (
            <tr>
                <td>{formatPeriode(d.periode.fom, d.periode.til)}</td>
                <td>{d.arbeidsgiver}</td>
                <td>{d.stillingProsent != undefined ? d.stillingProsent + "%" : "0%"}</td>
                <td>{dateToDDMMYYYY(d.lønnsendringDato)}</td>
            </tr>
        ))}

    </table>
}