
interface IProps {
    nyAvtale: boolean;
    oppgjorsform: string
}

export const Oppgjør = ({ oppgjorsform, nyAvtale }: IProps) => (
    <div>
        <h2>Oppgjør</h2>
        <p className={"font-bold"}>Er dette en ny avtale?</p>
        <p>{nyAvtale ? "Ja" : "Nei"}</p>
        <p className={"font-bold"}>Hvilken oppgjørsform ønskes?</p>
        <p>{oppgjorsform}</p>
    </div>
)