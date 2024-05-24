import { NotatForskuddProps } from "~/routes/notat.forskudd/route";
import { SimpleTable } from "~/components/SimpleTable";
import tekster from "~/tekster";

export default function Sivilstand({ data }: NotatForskuddProps) {
  return (
    <div style={{ pageBreakBefore: "auto" }}>
      <h3 id={"linktilmeg"}>{tekster.titler.sivilstand.tittel}</h3>
      <div>
        <SimpleTable
          data={data.boforhold.sivilstand.opplysningerBruktTilBeregning}
        />
      </div>
    </div>
  );
}
