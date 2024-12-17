import xss from "xss";
import { NotatBegrunnelseDto } from "~/types/Api";
import { DataViewTable, DataViewTableData } from "~/components/DataViewTable";

type NotatProps = {
  data?: NotatBegrunnelseDto;
};
export default function NotatBegrunnelse({ data }: NotatProps) {
  return (
    <div
      style={{
        maxWidth: "35rem",
      }}
      className={"mt-4"}
    >
      <DataViewTable
        data={
          [
            {
              label: "Begrunnelse",
              textRight: false,
              labelBold: true,
            },
            {
              label: undefined,
              textRight: false,
              labelBold: true,
              value: <PurifiedHtml text={data?.innhold} />,
            },
          ].filter((d) => d != null) as DataViewTableData[]
        }
      />
    </div>
  );
}

function PurifiedHtml({ text }: { text?: string }) {
  if (text == null || text === "") return null;
  const cleanText = xss(text.replace(/(?:\r\n|\r|\n)/g, "<br />"));

  return <span dangerouslySetInnerHTML={{ __html: cleanText }} />;
}
