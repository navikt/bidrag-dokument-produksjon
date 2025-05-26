import {PropsWithChildren} from "react";
import {IBidragsmottaker} from "~/routes/bidragskalkulator.privatavtale/route";


interface IProps extends PropsWithChildren {
    bidragsmottaker: IBidragsmottaker
}

export const OpplysningerBidragsmottaker = ({ bidragsmottaker }: IProps) => (
        <div>
            <h2>Opplysninger om bidragsmottaker</h2>
            <p className={"font-bold"}>Fornavn</p>
            <p>{bidragsmottaker.fornavn}</p>
            <p className={"font-bold"}>Etternavn</p>
            <p>{bidragsmottaker.etternavn}</p>
            <p className={"font-bold"}>Har bidragsmottaker norsk fødselsnummer eller D-nummer?</p>
            <p>{bidragsmottaker.fodselsnummer ? "Ja" : "Nei"}</p>

            {bidragsmottaker.fodselsnummer && (
                <div>
                    <p className={"font-bold"}>Fødselsnummer</p>
                    <p>{bidragsmottaker.fodselsnummer}</p>
                </div>)}
        </div>
);