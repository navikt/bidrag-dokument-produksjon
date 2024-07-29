import { useActionData } from "@remix-run/react";
import { ActionFunctionArgs, json } from "@remix-run/node";
import "../../style/style.css";
import { NotatDto } from "~/types/Api";
import tekster from "~/tekster";
import {
  NotatProvider,
  RenderMode,
} from "~/components/notat_felles/NotatContext";
import Boforhold from "~/components/notat_felles/components/Boforhold";
import Soknaddetaljer from "~/components/notat_felles/components/Soknaddetaljer";
import Utgifter from "~/routes/notat.særbidrag/Utgifter";
import Inntekter from "~/components/notat_felles/components/Inntekter";
import Vedtak from "~/routes/notat.særbidrag/Vedtak";
import VedleggBoforhold from "~/components/notat_felles/components/VedleggBoforhold";
import VedleggInntekter from "~/components/notat_felles/components/VedleggInntekter";
import NotatTittel from "~/components/NotatTittel";
import DagensDato from "~/components/DagensDato";

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
    { name: "description", content: tekster.titler.særbidrag },
    { property: "author", content: "bidrag-dokument-produksjon" },
    { property: "subject", content: tekster.titler.særbidrag },
  ];
}

export default function NotatSærbidrag() {
  const response = useActionData<NotatRequest>();
  if (response === undefined) {
    return <div>Oops</div>;
  }

  const renderTopBottomTextContent = () => (
    <>
      <div
        className={"custom-top_bottom_content"}
        data-content={`Saksnummer ${data.saksnummer}`}
      ></div>
      <div className={"custom-page-number"}></div>
    </>
  );
  const data = response.data;
  return (
    <div id="forskudd_notat">
      {/*{response.renderForPdf && (*/}
      {/*  <div className="header top_bottom_text">*/}
      {/*    {renderTopBottomTextContent()}*/}
      {/*  </div>*/}
      {/*)}*/}
      {response.renderForPdf && (
        <div className="footer top_bottom_text">
          {renderTopBottomTextContent()}
        </div>
      )}
      <NotatProvider
        data={data}
        renderMode={response.renderForPdf ? RenderMode.PDF : RenderMode.HTML}
      >
        <div className={"container page"}>
          <Soknaddetaljer />
          <DagensDato />
          <NotatTittel title={tekster.titler.særbidrag} />
          <Utgifter />
          <Inntekter />
          <Boforhold />
          <Vedtak />
          <VedleggBoforhold />
          <VedleggInntekter />
        </div>
      </NotatProvider>
    </div>
  );
}
