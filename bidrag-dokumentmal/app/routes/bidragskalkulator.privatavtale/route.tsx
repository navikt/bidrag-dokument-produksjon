import { useActionData } from "@remix-run/react";
import "../../style/style.css";

import { parseRequestAction } from "~/routes/common";
import { ActionFunctionArgs } from "@remix-run/node";
import HeaderFooter from "~/routes/bidragskalkulator.privatavtale/HeaderFooterKalkulator";
import NavLogo from "~/components/NavLogo";

export async function action(args: ActionFunctionArgs) {
  return await parseRequestAction(args);
}

interface PrivatAvtaleDto {
  data: {
    innhold: string;
  };
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
  const response = useActionData<PrivatAvtaleDto>();
  if (response === undefined) {
    return <div>Oops</div>;
  }

  console.log(response);
  const data = response.data;
  return (
    <div id="privat_avtale">
      <HeaderFooter />
      <div className={"container page"}>
        <NavLogo />
        <h1>Privat avtale</h1>
        <div>{data.innhold}</div>
      </div>
    </div>
  );
}
