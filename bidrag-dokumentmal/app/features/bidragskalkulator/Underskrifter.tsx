import { hentTekst, SpråkType } from "~/utils/oversettelser";
import { SignaturBoks } from "./SignaturBoks";

export default function Underskrifter({ språk }: { språk: SpråkType }) {
  const tekster = hentTekst(språk, tekst);
  return (
    <section>
      <h2 className="font-bold text-blue-800">{tekster.tittel}</h2>
      <div className="flex flex-col gap-4">
        <SignaturBoks bidragstype="MOTTAKER" språk={språk} />
        <SignaturBoks bidragstype="PLIKTIG" språk={språk} />
      </div>
    </section>
  );
}

const tekst = {
  tittel: {
    nb: "Underskrifter",
    nn: "Underskrifter",
    en: "Signatures",
  },
};
