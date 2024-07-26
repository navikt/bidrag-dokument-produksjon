import { SimpleTable } from "~/components/SimpleTable";
import tekster from "~/tekster";
import { NotatDataProps } from "~/components/notat_felles/NotatContext";
import { NotatMalType } from "~/types/Api";

export default function Sivilstand({ data }: NotatDataProps) {
  if (data.type != NotatMalType.FORSKUDD) return;
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
