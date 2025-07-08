import {PropsWithChildren} from "react";
import {IBidragsmottaker} from "~/routes/bidragskalkulator.privatavtale/route";


interface IProps extends PropsWithChildren {
    bidragsmottaker: IBidragsmottaker
}

export const OpplysningerBidragsmottaker = ({ bidragsmottaker }: IProps) => (
        <div>
            <h2>Opplysninger om bidragsmottaker</h2>
            <p className={"font-bold"}>Fullt navn</p>
            <p>{bidragsmottaker.fulltNavn}</p>
            <p className={"font-bold"}>Har bidragsmottaker norsk fødselsnummer eller D-nummer?</p>
            <p>{bidragsmottaker.ident ? "Ja" : "Nei"}</p>

            {bidragsmottaker.ident && (
                <div>
                    <p className={"font-bold"}>Fødselsnummer</p>
                    <p>{bidragsmottaker.ident}</p>
                </div>)}
        </div>
);