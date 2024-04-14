import {Kilde} from "~/types/Api";
import {Buldings2Icon, PersonIcon} from "@navikt/aksel-icons";

export default function KildeIcon({kilde}: { kilde: Kilde }) {
    return <>{kilde == Kilde.OFFENTLIG ? <Buldings2Icon style={{scale: "1.2"}} title={"Offentlig"}/> : <PersonIcon style={{scale: "1.2"}} title={"Manuell"}/>}</>
}