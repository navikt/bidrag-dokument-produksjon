import { NotatForskuddProps } from "~/routes/notat.forskudd/route";
import { SimpleTable } from "~/components/SimpleTable";

export default function Sivilstand({ data }: NotatForskuddProps) {
  return (
    <div style={{ pageBreakBefore: "always" }}>
      <h3>Sivilstand</h3>
      <div>
        <SimpleTable
          data={data.boforhold.sivilstand.opplysningerBruktTilBeregning}
        />
      </div>
    </div>
  );
}
