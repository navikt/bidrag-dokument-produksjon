import { useActionData } from "@remix-run/react";
import { ActionFunctionArgs, json } from "@remix-run/node";
import "../../style/style.css";
import { createContext, useContext } from "react";
import Soknaddetaljer from "~/routes/notat.forskudd/Soknaddetaljer";
import Virkningstidspunkt from "~/routes/notat.forskudd/Virkningstidspunkt";
import Header from "~/components/Header";
import { NotatDto, Vedtakstype } from "~/types/Api";
import Boforhold from "~/routes/notat.forskudd/Boforhold";
import Inntekter from "~/routes/notat.forskudd/Inntekter";
import Vedtak from "~/routes/notat.forskudd/Vedtak";
import VedleggBoforhold from "~/routes/notat.forskudd/VedleggBoforhold";
import VedleggInntekter from "~/routes/notat.forskudd/VedleggInntekter";
import tekster from "~/tekster";

type NotatRequest = {
  renderForPdf: boolean;
  data: NotatDto;
};
export async function action({ request }: ActionFunctionArgs) {
  const body = await request.json();
  return json({
    data: body,
    renderForPdf:
      request.headers.get("renderforpdf") == "true" ||
      request.headers.get("renderforpdf") == null,
  });
}

export function meta() {
  return [
    { title: tekster.titler.forskudd },
    { name: "description", content: tekster.titler.forskudd },
    { property: "author", content: "bidrag-dokument-produksjon" },
    { property: "subject", content: tekster.titler.forskudd },
  ];
}

interface INotatContext {
  erAvslag: boolean;
  erOpphør: boolean;
  data: NotatDto;
}

export const NotatContext = createContext<INotatContext | null>(null);
export function useNotat(): INotatContext {
  return useContext(NotatContext) as INotatContext;
}
export type NotatForskuddProps = { data: NotatDto };
export default function NotatForskudd() {
  const response = useActionData<NotatRequest>();
  if (response === undefined) {
    return <div>Oops</div>;
  }

  const renderTopBottomTextContent = () => (
    <>
      <div
        className={"custom-top_bottom_content"}
        data-content={`${tekster.titler.forskudd}. Saksnummer ${data.saksnummer}`}
      ></div>
      <div className={"custom-page-number"}></div>
    </>
  );
  const data = response.data;
  return (
    <div id="forskudd_notat">
      <Header title={tekster.titler.forskudd} />
      {response.renderForPdf && (
        <div className="header top_bottom_text">
          {renderTopBottomTextContent()}
        </div>
      )}
      {response.renderForPdf && (
        <div className="footer top_bottom_text">
          {renderTopBottomTextContent()}
        </div>
      )}
      <NotatContext.Provider
        value={{
          data: data,
          erAvslag: data.virkningstidspunkt.avslag != null,
          erOpphør: data.virkningstidspunkt.vedtakstype == Vedtakstype.OPPHOR,
        }}
      >
        <div className={"container page"}>
          <Soknaddetaljer data={data} />
          <Virkningstidspunkt data={data} />
          <Boforhold data={data} />
          <Inntekter data={data} />
          <Vedtak data={data} />
          <VedleggBoforhold data={data} />
          <VedleggInntekter data={data} />
        </div>
      </NotatContext.Provider>
    </div>
  );
}
