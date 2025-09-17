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
import Inntekter from "~/components/notat_felles/components/Inntekter";
import VedleggBoforhold from "~/components/notat_felles/components/VedleggBoforhold";
import VedleggInntekter from "~/components/notat_felles/components/VedleggInntekter";
import NotatTittel from "~/components/NotatTittel";
import HeaderFooter from "~/components/notat_felles/HeaderFooter";
import { parseRequestAction, NotatRequest } from "~/routes/common";
import Virkningstidspunkt from "~/components/notat_felles/components/Virkningstidspunkt";
import Underholdskostnad from "~/routes/notat.bidrag/Underholdskostnad";
import Samvær from "~/routes/notat.bidrag/Samvær";
import Vedtak from "~/routes/notat.bidrag/Vedtak";
import VedleggBeregningsDetaljer from "~/routes/notat.bidrag/VedleggBeregningsDetaljer";
import VedleggSamvær from "~/routes/notat.bidrag/VedleggSamvær";
import Gebyr from "~/routes/notat.bidrag/Gebyr";
import VedleggUnderholdskostnader from "~/routes/notat.bidrag/VedleggUnderholdskostnader";
import PrivatAvtale from "~/routes/notat.bidrag/PrivatAvtale";

export async function action(args: ActionFunctionArgs) {
  return await parseRequestAction(args);
}

export function meta() {
  return [
    { title: tekster.titler.bidrag },
    { name: "description", content: tekster.titler.bidrag },
    { property: "author", content: "bidrag-dokument-produksjon" },
    { property: "subject", content: tekster.titler.bidrag },
  ];
}

export default function NotatBidrag() {
  const response = useActionData<NotatRequest>();
  if (response === undefined) {
    return <div>Oops</div>;
  }

  const data = response.data;
  const renderMode = response.renderForPdf ? RenderMode.PDF : RenderMode.HTML;
  return (
    <div id="bidrag_notat">
      <NotatProvider
        data={data}
        styling={"V2"}
        renderPDFVersion={response.renderPDFVersion}
        renderMode={response.renderForPdf ? RenderMode.PDF : RenderMode.HTML}
      >
        <HeaderFooter
          saksnummer={response.data.saksnummer}
          renderMode={renderMode}
        />
        <div className={"container page"}>
          <Soknaddetaljer />
          <NotatTittel title={tekster.titler.bidrag} />
          <Virkningstidspunkt />
          <PrivatAvtale />
          <Underholdskostnad vedleggNummer={1} />
          <Inntekter vedleggNummer={2} />
          <Gebyr />
          <Boforhold vedleggNummer={3} />
          <Samvær vedleggNummer={4} />
          <Vedtak vedleggNummer={5} />
          <VedleggUnderholdskostnader vedleggNummer={1} />
          <VedleggBoforhold vedleggNummer={2} />
          <VedleggInntekter vedleggNummer={3} />
          <VedleggSamvær vedleggNummer={4} />
          <VedleggBeregningsDetaljer vedleggNummer={5} />
        </div>
      </NotatProvider>
    </div>
  );
}
