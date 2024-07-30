import { useActionData } from "@remix-run/react";
import { ActionFunctionArgs, json } from "@remix-run/node";
import "../../style/style.css";
import { NotatDto } from "~/types/Api";
import Vedtak from "~/routes/notat.forskudd/Vedtak";
import tekster from "~/tekster";
import {
  NotatProvider,
  RenderMode,
} from "~/components/notat_felles/NotatContext";
import Soknaddetaljer from "~/components/notat_felles/components/Soknaddetaljer";
import Virkningstidspunkt from "~/routes/notat.forskudd/Virkningstidspunkt";
import Boforhold from "~/components/notat_felles/components/Boforhold";
import Inntekter from "~/components/notat_felles/components/Inntekter";
import VedleggBoforhold from "~/components/notat_felles/components/VedleggBoforhold";
import VedleggInntekter from "~/components/notat_felles/components/VedleggInntekter";
import DagensDato from "~/components/DagensDato";
import NotatTittel from "~/components/NotatTittel";

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

export default function NotatForskudd() {
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
          <NotatTittel title={tekster.titler.forskudd} />
          <Virkningstidspunkt />
          <Boforhold />
          <Inntekter />
          <Vedtak />
          <VedleggBoforhold />
          <VedleggInntekter />
          <div className="last-page"></div>
        </div>
      </NotatProvider>
    </div>
  );
}
