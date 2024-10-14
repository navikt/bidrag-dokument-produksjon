import { useActionData } from "@remix-run/react";
import { ActionFunctionArgs } from "@remix-run/node";
import "../../style/style.css";
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
import HeaderFooter from "~/components/notat_felles/HeaderFooter";
import VedleggBeregningsDetaljer from "~/routes/notat.særbidrag/VedleggBeregningsDetaljer";
import { parseRequestAction, NotatRequest } from "~/routes/common";

export async function action(args: ActionFunctionArgs) {
  return await parseRequestAction(args);
}

export function meta() {
  return [
    { title: tekster.titler.særbidrag },
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

  const data = response.data;
  return (
    <div id="særbidrag_notat">
      <NotatProvider
        data={data}
        renderPDFVersion={response.renderPDFVersion}
        renderMode={response.renderForPdf ? RenderMode.PDF : RenderMode.HTML}
      >
        <HeaderFooter />
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
          <VedleggBeregningsDetaljer />
        </div>
      </NotatProvider>
    </div>
  );
}
