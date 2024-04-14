import {NotatForskuddProps} from "~/routes/notat.forskudd/route";
import Datadisplay from "~/components/Datadisplay";
import {BoforholdBarn, Kilde, TypeArManedsperiode} from "~/types/Api";
import Person from "~/components/Person";
import {formatPeriode} from "~/utils/date-utils";
import React from "react";
import KildeIcon from "~/components/KildeIcon";
import {SimpleTable} from "~/components/SimpleTable";
import Sivilstand from "~/routes/notat.forskudd/Sivilstand";
import {Checkbox} from "@navikt/ds-react";


export default function Boforhold({data}: NotatForskuddProps) {

    return <div className="soknad_parter">
        <h2>Boforhold</h2>
        <div>
            {data.boforhold.barn.sort((d)=>d.medIBehandling ? -1 : 1).map((b) => <BoforholdHusstandsmedlem data={b}/>)}
            <Sivilstand data={data}/>
        </div>
    </div>
}

function BoforholdHusstandsmedlem({data}: { data: BoforholdBarn }) {

    return <div>
        <Datadisplay label={data.medIBehandling ? "Søknadsbarn" : "Eget barn i husstanden"}
                     value={<Person fødselsdato={data.gjelder.fødselsdato!!} navn={data.gjelder.navn!!}/>}/>
        <SimpleTable data={data.opplysningerBruktTilBeregning}/>
        <div className="horizontal-line" style={{pageBreakAfter: "avoid"}}></div>
    </div>
}
