import { useActionData } from "@remix-run/react";
import {ActionFunctionArgs, json, LinksFunction, redirect} from "@remix-run/node";
import "../../style/style.css";
import { cssBundleHref } from "@remix-run/css-bundle";
import {renderToString} from "react-dom/server";
import {Layout} from "~/root";
import { html } from "remix-utils/responses";
import {Heading} from "@navikt/ds-react";
import React, {ReactElement} from "react";
import Soknaddetaljer from "~/routes/notat.forskudd/Soknaddetaljer";
import Virkningstidspunkt from "~/routes/notat.forskudd/Virkningstidspunkt";
import {CoffeeFillIcon} from "@navikt/aksel-icons";
import Header from "~/components/Header";
import {NotatDto} from "~/types/Api";
import Boforhold from "~/routes/notat.forskudd/Boforhold";
import Inntekter from "~/routes/notat.forskudd/Inntekter";
import Vedtak from "~/routes/notat.forskudd/Vedtak";
import VedleggBoforhold from "~/routes/notat.forskudd/VedleggBoforhold";
import VedleggInntekter from "~/routes/notat.forskudd/VedleggInntekter";

export async function action({request}: ActionFunctionArgs) {
    const body = await request.json();
    console.log("asd", body)
    return json(body);
}
export function meta() {
    return [
        { title: "Forskudd, Saksbehandlingsnotat" },
        { name: "description", content: "Forskudd, Saksbehandlingsnotat" },
        { property: "author", content: "bidrag-dokument-produksjon" },
        { property: "subject", content: "Forskudd, Saksbehandlingsnotat" },
    ];
}

export type NotatForskuddProps = { data: NotatDto }
export default function NotatForskudd() {
    const data = useActionData<NotatDto>();
    if (data === undefined) {
        return <div>Oops</div>;
    }
    return (
        <div id="contact">
            <Header title={"Forskudd, Saksbehandlingsnotat"}/>
            <div className='footer custom-footer-page-number'/>
            <div className={"container page"}>
                <Soknaddetaljer data={data}/>
                <Virkningstidspunkt data={data}/>
                <Boforhold data={data}/>
                <Inntekter data={data}/>
                <Vedtak data={data}/>
                <VedleggBoforhold data={data}/>
                <VedleggInntekter data={data}/>
            </div>

        </div>
    );
}


