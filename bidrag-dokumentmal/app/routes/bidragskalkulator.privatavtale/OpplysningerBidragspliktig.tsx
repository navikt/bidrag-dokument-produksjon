import {IBidragspliktig} from "~/routes/bidragskalkulator.privatavtale/route";
import {PropsWithChildren } from "react";

interface IProps extends PropsWithChildren {
    bidragspliktig: IBidragspliktig
}

export const OpplysningerBidragspliktig = ({ bidragspliktig }: IProps) => (
        <div>
            <h2>Opplysninger om bidragspliktige</h2>
            <p className={"font-bold"}>Fornavn</p>
            <p>{bidragspliktig.fornavn}</p>
            <p className={"font-bold"}>Etternavn</p>
            <p>{bidragspliktig.etternavn}</p>
            <p className={"font-bold"}>Har bidragsmottaker norsk fødselsnummer eller D-nummer?</p>
            <p>{bidragspliktig.ident ? "Ja" : "Nei"}</p>

            {bidragspliktig.ident && (
                <div>
                    <p className={"font-bold"}>Fødselsnummer</p>
                    <p>{bidragspliktig.ident}</p>
                </div>)}
        </div>
    )