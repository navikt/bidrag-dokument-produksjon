import { Notat as NotatData } from "~/types/Api";
import DataDescription from "~/components/DataDescription";
import xss from "xss";

type NotatProps = {
  data: NotatData;
};
export default function Notat({ data }: NotatProps) {
  return (
    <div
      style={{
        maxWidth: "44rem",
        marginTop: "16px",
      }}
    >
      <DataDescription
        label={"Begrunnelse"}
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
