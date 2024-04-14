import {NotatForskuddProps} from "~/routes/notat.forskudd/route";
import {groupBy} from "~/utils/array-utils";
import {Inntektsrapportering, NotatResultatBeregningBarnDto,} from "~/types/Api";
import {formatPeriode} from "~/utils/date-utils";
import KildeIcon from "~/components/KildeIcon";
import React from "react";
import TableGjelderBarn from "~/components/TableGjelderBarn";

export default function Vedtak({data}: NotatForskuddProps){

    return <div style={{pageBreakBefore: "always"}}>
        <h2>Vedtak</h2>
        <VedtakTable data={data.vedtak.resultat}/>
    </div>
}

function VedtakTable({data}: {data: NotatResultatBeregningBarnDto[]}){
    if (data.length == 0) return <div>Mangler resultat</div>
    return <div style={{paddingTop: "10px"}}>
        {groupBy(data, (d) => d.barn?.ident!!).map(([key, value]) => {
            const gjelderBarn = value[0].barn!!
            const perioder = value[0].perioder
            return <div className="background_section">
                <TableGjelderBarn gjelderBarn={gjelderBarn}/>
                <table className="table" style={{width: "710px"}}>
                    <tr>
                        <th style={{width: "170px"}}>Periode</th>
                        <th>Inntekt</th>
                        <th style={{width: "140px"}}>Sivilstand</th>
                        <th style={{width: "80px"}}>Antall barn i husstand</th>
                        <th style={{width: "80px"}}>Forskudd</th>
                        <th style={{width: "150px"}}>Resultat</th>
                    </tr>
                    {perioder.map((d) => {
                        return (
                            <tr>
                                <td>{formatPeriode(d.periode!!.fom, d.periode!!.til)}</td>
                                <td>{d.inntekt}</td>
                                <td>{d.sivilstandVisningsnavn}</td>
                                <td>{d.antallBarnIHusstanden}</td>
                                <td>{d.beløp}</td>
                                <td>{d.resultatKodeVisningsnavn}</td>
                            </tr>
                        )
                    })}

                </table>
            </div>
        })}
    </div>
}