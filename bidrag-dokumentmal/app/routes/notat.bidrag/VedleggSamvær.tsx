import { useNotatFelles } from "~/components/notat_felles/NotatContext";
import elementIds from "~/utils/elementIds";

export default function VedleggSamvær() {
  const { data } = useNotatFelles();

  return (
    <div style={{ pageBreakBefore: "always" }}>
      <h2 id={elementIds.vedleggSamvær} className={"pb-2"}>
        Vedlegg nr. 3: Samvær
      </h2>
    </div>
  );
}
