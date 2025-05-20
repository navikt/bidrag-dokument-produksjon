import { useActionData } from "@remix-run/react";
import "../../style/style.css";

import { parseRequestAction } from "~/routes/common";
import { ActionFunctionArgs } from "@remix-run/node";

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
      <h2>Privat avtale</h2>
      <div>{data.innhold}</div>
    </div>
  );
}
