import {dateToDDMMYYYY} from "~/utils/date-utils";

type PersonProps = {
    navn: string,
    fødselsdato: string,
    personident?: string,
}
export default function Person({navn, fødselsdato, personident}: PersonProps){
    return <span>{navn}  /  {dateToDDMMYYYY(fødselsdato)}</span>
}