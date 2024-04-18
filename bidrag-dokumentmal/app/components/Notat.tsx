import { Notat as NotatData } from "~/types/Api";
import Datadisplay from "~/components/Datadisplay";
import xss from "xss";

type NotatProps = {
  data: NotatData;
};
export default function Notat({ data }: NotatProps) {
  return (
    <div
      style={{
        maxWidth: "44rem",
        overflow: "none",
        marginTop: "14px",
      }}
    >
      <Datadisplay
        label={"Begrunnelse (med i vedtaket)"}
        value={<PurifiedHtml text={data.medIVedtaket} />}
      />
      <Datadisplay
        label={"Begrunnelse (kun for intern notat)"}
        value={<PurifiedHtml text={data.intern} />}
      />
    </div>
  );
}

function PurifiedHtml({ text }: { text?: string }) {
  if (text == null || text === "") return null;
  const cleanText = xss(text.replace(/(?:\r\n|\r|\n)/g, "<br />"));

  return <span dangerouslySetInnerHTML={{ __html: cleanText }} />;
}
