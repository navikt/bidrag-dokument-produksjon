import "../../style/style.css";

import { parseRequestAction } from "~/routes/common";
import { ActionFunctionArgs } from "@remix-run/node";
import HeaderFooter from "~/routes/bidragskalkulator.privatavtale/HeaderFooterKalkulator";
import NavLogo from "~/components/NavLogo";
import { OpplysningerBarnOgBidrag } from "~/routes/bidragskalkulator.privatavtale/OpplysningerBarnOgBidrag";
import { SignaturBoks } from "~/routes/bidragskalkulator.privatavtale/SignaturBoks";
import { Oppgjør } from "~/routes/bidragskalkulator.privatavtale/Oppgjør";
import { AndreBestemmelser } from "~/routes/bidragskalkulator.privatavtale/AndreBestemmelser";
import { OpplysningerPerson } from "~/features/bidragskalkulator/OpplysningerPerson";
import { useActionData } from "@remix-run/react";

const mockRequest: PrivatAvtaleDto = {
  innhold: "Dette er en mock av data fra bidragskalkulatoren",
  bidragsmottaker: {
    fulltNavn: "Kristian",
    fodselsnummer: "12345678901",
  },
  bidragspliktig: {
    fulltNavn: "Kristine",
    fodselsnummer: "12345678901",
  },
  barn: [
    {
      fulltNavn: "Ola",
      fodselsnummer: "12345678901",
      sumBidrag: 5000,
    },
  ],
  fraDato: "01.01.2025",
  nyAvtale: true,
  oppgjorsform: "Privat",
};

export async function action(args: ActionFunctionArgs) {
  return await parseRequestAction(args);
}

export interface IPerson {
  fulltNavn: string;
  fodselsnummer: string;
}

export interface IBidragsmottaker extends IPerson {}

export interface IBidragspliktig extends IPerson {}

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
    { title: "Privat avtale bidragskalkulator" },
    { name: "description", content: "Privat avtale bidragskalkulator" },
    { property: "author", content: "bidrag-dokument-produksjon" },
    { property: "subject", content: "Privat avtale bidragskalkulator" },
  ];
}

export default function PrivatAvtaleBidragskalkulator() {
  const actionData = useActionData<{ data: PrivatAvtaleDto }>();
  const response =
    process.env.NODE_ENV === "development" ? { data: mockRequest } : actionData;

  if (response === undefined) {
    return <div>Oops</div>;
  }
  const { data } = response;

  return (
    <div id="privat_avtale">
      <HeaderFooter />
      <div className={"container page"}>
        <NavLogo />
        <h1>Privat avtale om barnebidrag</h1>
        <div>{data.innhold}</div>
        <OpplysningerPerson
          bidragstype="MOTTAKER"
          person={data.bidragsmottaker}
        />
        <OpplysningerPerson
          bidragstype="PLIKTIG"
          person={data.bidragspliktig}
        />
        <OpplysningerBarnOgBidrag
          gjeldendeBarn={data.barn}
          fraDato={data.fraDato}
        />
        <Oppgjør nyAvtale={data.nyAvtale} oppgjorsform={data.oppgjorsform} />
        <AndreBestemmelser />

        <h2>Underskrifter</h2>
        <SignaturBoks title={"Bidragsmottaker"} />
        <SignaturBoks title={"Bidragspliktige"} />
      </div>
    </div>
  );
}
