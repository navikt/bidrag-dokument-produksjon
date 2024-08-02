import { Rolletype, PersonNotatDto } from "~/types/Api";
import { rolleTilVisningsnavn } from "~/utils/visningsnavn";

export default function InntektRolle({ rolle }: { rolle: PersonNotatDto }) {
  return (
    <div
      className={"elements_inline text-heading-small"}
      style={{ marginRight: 5, paddingRight: 0 }}
    >
      {rolle.rolle === Rolletype.BA ? (
        <p>{rolleTilVisningsnavn(rolle.rolle!) + ": " + rolle.navn}</p>
      ) : (
        <p>{rolleTilVisningsnavn(rolle.rolle!)}</p>
      )}
    </div>
  );
}
