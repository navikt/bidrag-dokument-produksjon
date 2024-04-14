import Datadisplay from "~/routes/notat.forskudd/Datadisplay";
import {rolleTilVisningsnavn} from "~/utils/visningsnavn";

export default function Soknaddetaljer({data}: { data: any }) {
    return <div className={"soknad_detaljer"}>
        <div>
            <Datadisplay label={"Saksnummer"} value={data.saksnummer}/>
            {data.roller.filter((rolle: any) => rolle.rolle != "BARN").map((rolle: any) => (
                // @ts-ignore
                <Datadisplay key={rolle.personident} label={rolleTilVisningsnavn[rolle.rolle]}
                             value={rolle.navn + "/" + rolle.fødselsdato}/>
            ))}
            <dl className="datarow">
                <dt>{"Søknadsbarn"}</dt>
                <dd style={{display: "inline-table"}}>{data.roller.filter((rolle: any) => rolle.rolle == "BARN").map((rolle: any) => (
                    <span style={{
                        width: "100%",
                        display: "block"
                    }}>{rolle.navn + "/" + rolle.fødselsdato}</span>
                ))}</dd>
            </dl>
        </div>
    </div>

}