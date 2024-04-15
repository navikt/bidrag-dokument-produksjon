import { useActionData } from "@remix-run/react";
import { ActionFunctionArgs, json } from "@remix-run/node";
import "../../style/style.css";
import { createContext, useContext } from "react";
import Soknaddetaljer from "~/routes/notat.forskudd/Soknaddetaljer";
import Virkningstidspunkt from "~/routes/notat.forskudd/Virkningstidspunkt";
import Header from "~/components/Header";
import { NotatDto } from "~/types/Api";
import Boforhold from "~/routes/notat.forskudd/Boforhold";
import Inntekter from "~/routes/notat.forskudd/Inntekter";
import Vedtak from "~/routes/notat.forskudd/Vedtak";
import VedleggBoforhold from "~/routes/notat.forskudd/VedleggBoforhold";
import VedleggInntekter from "~/routes/notat.forskudd/VedleggInntekter";
import SaksbehandlerNotat from "~/routes/notat.forskudd/SaksbehandlerNotat";

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.json();
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

interface INotatContext {
  erAvslag: boolean;
}

export const NotatContext = createContext<INotatContext | null>(null);
export function useNotat(): INotatContext {
  return useContext(NotatContext) as INotatContext;
}
export type NotatForskuddProps = { data: NotatDto };
export default function NotatForskudd() {
  const data = useActionData<NotatDto>();
  if (data === undefined) {
    return <div>Oops</div>;
  }
  return (
    <div id="forskudd_notat">
      <Header title={"Forskudd, Saksbehandlingsnotat"} />
      <div className="footer custom-footer-page-number" />
      <NotatContext.Provider
        value={{ erAvslag: data.virkningstidspunkt.avslag != null }}
      >
        <div className={"container page"}>
          <Soknaddetaljer data={data} />
          <Virkningstidspunkt data={data} />
          <Boforhold data={data} />
          <Inntekter data={data} />
          <Vedtak data={data} />
          <SaksbehandlerNotat data={data} />
          <VedleggBoforhold data={data} />
          <VedleggInntekter data={data} />
        </div>
      </NotatContext.Provider>
    </div>
  );
}
