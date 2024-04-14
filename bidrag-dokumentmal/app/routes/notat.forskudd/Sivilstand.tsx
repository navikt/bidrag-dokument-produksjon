import {NotatForskuddProps} from "~/routes/notat.forskudd/route";
import Datadisplay from "~/components/Datadisplay";
import {BoforholdBarn, Kilde, TypeArManedsperiode} from "~/types/Api";
import Person from "~/components/Person";
import {formatPeriode} from "~/utils/date-utils";
import React from "react";
import KildeIcon from "~/components/KildeIcon";
import {SimpleTable} from "~/components/SimpleTable";


export default function Sivilstand({data}: NotatForskuddProps) {

    return <div style={{ pageBreakBefore: "always"}}>
        <h3>Sivilstand</h3>
        <div>
            <SimpleTable data={data.boforhold.sivilstand.opplysningerBruktTilBeregning}/>
        </div>
    </div>
}

