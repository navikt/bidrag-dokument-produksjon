import {erRolle, rolleTilVisningsnavn} from "~/utils/visningsnavn";
import {NotatDto, PersonNotatDto, Rolletype} from "~/types/Api";
import Datadisplay from "~/components/Datadisplay";
import {dateToDDMMYYYY} from "~/utils/date-utils";

export default function Soknaddetaljer({data}: { data: NotatDto }) {
    console.log(data.roller)
    const rollerIkkeBarn = data.roller.filter((rolle) => !erRolle(rolle.rolle, Rolletype.BA))
    const rollerBarn = data.roller.filter((rolle) => erRolle(rolle.rolle, Rolletype.BA))
    return <div className={"soknad_detaljer"}>
        <div>
            <Datadisplay label={"Saksnummer"} value={data.saksnummer}/>
            {rollerIkkeBarn.map((rolle) => (
                // @ts-ignore
                <Datadisplay key={rolle.personident} label={rolleTilVisningsnavn[rolle.rolle]}
                             value={rolle.navn + " / " + rolle.fødselsdato}/>
            ))}
            <RollerBarn rollerBarn={rollerBarn}/>
        </div>
    </div>

}

function RollerBarn({rollerBarn}: {rollerBarn: PersonNotatDto[]}) {
    return <dl className="datarow">
        <dt>{"Søknadsbarn"}</dt>
        <dd style={{display: "inline-table"}}>{rollerBarn.map((rolle) => (
            <span key={rolle.ident} style={{
                width: "100%",
                display: "block"
            }}>{rolle.navn + " / " + dateToDDMMYYYY(rolle.fødselsdato)}</span>
        ))}</dd>
    </dl>
}