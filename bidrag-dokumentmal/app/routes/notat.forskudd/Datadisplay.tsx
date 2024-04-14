import {ReactElement} from "react";

export default function Datadisplay({label, value}: { label: string, value: ReactElement | string }) {

    return (
        <dl className="datarow">
            <dt>{label}</dt>
            <dd>{value}</dd>
        </dl>
    );
}