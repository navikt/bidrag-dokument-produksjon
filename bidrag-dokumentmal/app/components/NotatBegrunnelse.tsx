import DataDescription from "~/components/DataDescription";
import xss from "xss";
import { NotatBegrunnelseDto } from "~/types/Api";

type NotatProps = {
  data?: NotatBegrunnelseDto;
};
export default function NotatBegrunnelse({ data }: NotatProps) {
  return (
    <div
      style={{
        maxWidth: "44rem",
        marginTop: "16px",
      }}
    >
      <DataDescription
        label={"Begrunnelse"}
        value={<PurifiedHtml text={data?.innhold} />}
      />
    </div>
  );
}

function PurifiedHtml({ text }: { text?: string }) {
  if (text == null || text === "") return null;
  const cleanText = xss(text.replace(/(?:\r\n|\r|\n)/g, "<br />"));

  return <span dangerouslySetInnerHTML={{ __html: cleanText }} />;
}
