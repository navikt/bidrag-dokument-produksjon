import { useActionData } from "@remix-run/react";
import "../../style/style.css";
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
import HeaderFooter from "~/components/notat_felles/HeaderFooter";
import { parseRequestAction, NotatRequest } from "~/routes/common";
import { ActionFunctionArgs } from "@remix-run/node";

export async function action(args: ActionFunctionArgs) {
  return await parseRequestAction(args);
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

  const data = response.data;
  return (
    <div id="forskudd_notat">
      <NotatProvider
        data={data}
        renderPDFVersion={response.renderPDFVersion}
        renderMode={response.renderForPdf ? RenderMode.PDF : RenderMode.HTML}
      >
        <HeaderFooter />
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
        </div>
      </NotatProvider>
    </div>
  );
}
