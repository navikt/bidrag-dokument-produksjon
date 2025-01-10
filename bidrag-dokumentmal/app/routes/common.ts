import { RenderPDFVersion } from "~/components/notat_felles/NotatContext";
import { VedtakNotatDto } from "~/types/Api";
import { ActionFunctionArgs } from "react-router";
import Undici from "undici";
import Response = Undici.Response;

export type NotatRequest = {
  renderForPdf: boolean;
  renderPDFVersion: RenderPDFVersion;
  data: VedtakNotatDto;
};

export async function parseRequestAction({ request }: ActionFunctionArgs) {
  const body = await request.json();
  return {
    data: body,
    renderPDFVersion: request.headers.get(
      "renderPDFVersion",
    ) as RenderPDFVersion,
    renderForPdf:
      request.headers.get("renderforpdf") == "true" ||
      request.headers.get("renderforpdf") == null,
  };
}
