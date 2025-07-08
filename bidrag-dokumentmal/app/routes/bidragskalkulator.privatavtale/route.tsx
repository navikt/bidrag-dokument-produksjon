import {useActionData} from "@remix-run/react";
import "../../style/style.css";

import {parseRequestAction} from "~/routes/common";
import {ActionFunctionArgs} from "@remix-run/node";
import HeaderFooter from "~/routes/bidragskalkulator.privatavtale/HeaderFooterKalkulator";
import NavLogo from "~/components/NavLogo";
import {OpplysningerBidragspliktig} from "~/routes/bidragskalkulator.privatavtale/OpplysningerBidragspliktig";
import {OpplysningerBidragsmottaker} from "~/routes/bidragskalkulator.privatavtale/OpplysningerBidragsmottaker";
import {OpplysningerBarnOgBidrag} from "~/routes/bidragskalkulator.privatavtale/OpplysningerBarnOgBidrag";
import {SignaturBoks} from "~/routes/bidragskalkulator.privatavtale/SignaturBoks";
import {Oppgjør} from "~/routes/bidragskalkulator.privatavtale/Oppgjør";
import {AndreBestemmelser} from "~/routes/bidragskalkulator.privatavtale/AndreBestemmelser";

export async function action(args: ActionFunctionArgs) {
    return await parseRequestAction(args);
}

interface IPerson {
    fulltNavn: string,
    ident: string,
}

export interface IBidragsmottaker extends IPerson {
}

export interface IBidragspliktig extends IPerson {
}

export interface IBarn extends IPerson {
    sumBidrag: number; // Beløp i kroner
}

interface PrivatAvtaleDto {
        innhold: string;
        bidragsmottaker: IBidragsmottaker;
        bidragspliktig: IBidragspliktig;
        barn: IBarn[];
        fraDato: string;
        nyAvtale: boolean;
        oppgjorsform: string; // TODO: Dette bør være en enum
}

export function meta() {
    return [
        {title: "Privat avtale bidragskalkulator"},
        {name: "description", content: "Privat avtale bidragskalkulator"},
        {property: "author", content: "bidrag-dokument-produksjon"},
        {property: "subject", content: "Privat avtale bidragskalkulator"},
    ];
}

const mockIfDev = (): PrivatAvtaleDto => {
    return {
            innhold: "Dette er en mock av data fra bidragskalkulatoren",
            bidragsmottaker: {
                fulltNavn: "Kristian",
                ident: "12345678901",
            },
            bidragspliktig: {
                fulltNavn: "Kristine",
                ident: "12345678901",
            },
            barn: [{
                fulltNavn: "Ola",
                ident: "12345678901",
                sumBidrag: 5000,
            }],
            fraDato: "2022-01-01",
            nyAvtale: true,
            oppgjorsform: "Privat",
        }
}

export default function PrivatAvtaleBidragskalkulator() {
    const response = useActionData<{ data: PrivatAvtaleDto }>();
    //const response = process.env.NODE_ENV === "development" ? mockIfDev() : useActionData<{ data: PrivatAvtaleDto }>();
    if (response === undefined) {
        return <div>Oops</div>;
    }
    const { data } = response;

    return (
        <div id="privat_avtale">
            <HeaderFooter/>
            <div className={"container page"}>
                <NavLogo/>
                <h1>Privat avtale om barnebidrag</h1>
                <div>{data.innhold}</div>
                <OpplysningerBidragsmottaker bidragsmottaker={data.bidragsmottaker}/>
                <OpplysningerBidragspliktig bidragspliktig={data.bidragspliktig}/>
                <OpplysningerBarnOgBidrag gjeldendeBarn={data.barn}  fraDato={data.fraDato} />
                <Oppgjør nyAvtale={data.nyAvtale} oppgjorsform={data.oppgjorsform} />
                <AndreBestemmelser />

                <h2>Underskrifter</h2>
                <SignaturBoks title={"Bidragsmottaker"} />
                <SignaturBoks title={"Bidragspliktige"} />
            </div>
        </div>
    );
}
