import {IBarn} from "~/routes/bidragskalkulator.privatavtale/route";
import {PropsWithChildren } from "react";

interface IProps extends PropsWithChildren {
    gjeldendeBarn: IBarn
    fraDato: string;
}

export const OpplysningerBarnOgBidrag =
    ({ gjeldendeBarn, fraDato }: IProps) => (
        <div>
            <h2>Opplysninger om barn og bidrag</h2>
            <div>
                <p className={"font-bold"}>Fornavn</p>
                <p>{gjeldendeBarn.fornavn}</p>
                <p className={"font-bold"}>Etternavn</p>
                <p>{gjeldendeBarn.etternavn}</p>
                <p className={"font-bold"}>Fødselsnummer eller D-nummer</p>
                <p>{gjeldendeBarn.fodselsnummer}</p>
                <p className={"font-bold"}>Beløp barnebidrag</p>
                <p>{gjeldendeBarn.sumBidrag},-</p>
                <p className={"font-bold"}>Fra dato (dd.mm.åååå)</p>
                <p>{fraDato}</p>
            </div>
        </div>
    )