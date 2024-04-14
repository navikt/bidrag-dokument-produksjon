import Datadisplay from "~/routes/notat.forskudd/Datadisplay";
import {rolleTilVisningsnavn} from "~/utils/visningsnavn";

export default function Virkningstidspunkt({data}: { data: any }) {
    const virkningstidspunkt = data.virkningstidspunkt;
    return <div className={"virkningstidspunkt"}>
        <h2>Virkningstidspunkt</h2>
        <div>
            <Datadisplay label={"Søknadstype"} value={virkningstidspunkt.søknadstype}/>
            <Datadisplay label={"Søkt fra"} value={virkningstidspunkt.søktAv}/>
        </div>
    </div>

}