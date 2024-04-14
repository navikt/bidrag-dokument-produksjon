import {NotatForskuddProps} from "~/routes/notat.forskudd/route";
import {formatPeriode} from "~/utils/date-utils";
import React from "react";
import {
    Kilde,
    OpplysningerFraFolkeregisteretBostatuskode,
    OpplysningerFraFolkeregisteretSivilstandskodePDL
} from "~/types/Api";
import {groupBy} from "~/utils/array-utils";
import Datadisplay from "~/components/Datadisplay";
import Person from "~/components/Person";

export default function VedleggBoforhold({data}: NotatForskuddProps) {

    return <div style={{pageBreakBefore: "always"}}>
        <h2>Vedlegg nr. 1: Boforhold</h2>
        <h3>Opplysninger fra folkeregisteret</h3>
        {groupBy(data.boforhold.barn.filter((d)=>d.opplysningerFraFolkeregisteret.length > 0).sort((d) => d.medIBehandling ? -1 : 1)
            , (d) => d.gjelder.ident ?? d.gjelder.fødselsdato!!).map(([key, value]) => {
            const gjelderBarn = value[0].gjelder!!
            const barn = value[0]
            return <div className="background_section">
                <Datadisplay label={barn.medIBehandling ? "Søknadsbarn" : "Eget barn i husstanden"}
                             value={<Person fødselsdato={gjelderBarn.fødselsdato!!} navn={gjelderBarn.navn!!}/>}/>
                <BoforholdTable data={barn.opplysningerFraFolkeregisteret}/>
            </div>
        })}
        <div>
            <h3>Sivilstand</h3>
            <div className="background_section">
                <BoforholdTable sivilstand data={data.boforhold.sivilstand.opplysningerFraFolkeregisteret}/>
            </div>
        </div>
    </div>
}

export function BoforholdTable({data, sivilstand = false}: {
    sivilstand?: boolean,
    data: OpplysningerFraFolkeregisteretBostatuskode[] | OpplysningerFraFolkeregisteretSivilstandskodePDL[]
}) {
    if (data.length === 0) return null
    return <table className="table">
        <tr>
            <th style={{width: "150px"}}>{sivilstand ? "Fra dato" : "Periode"}</th>
            <th style={{width: "100px"}}>Status</th>
        </tr>
        {data.map((d) => (
            <tr>
                <td>{formatPeriode(d.periode.fom, d.periode.til)}</td>
                <td>{d.statusVisningsnavn}</td>
            </tr>
        ))}

    </table>
}