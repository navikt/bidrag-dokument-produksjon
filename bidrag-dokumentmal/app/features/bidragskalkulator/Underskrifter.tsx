import { hentTekst, SpråkType } from "~/utils/oversettelser";
import { SignaturBoks } from "./SignaturBoks";

export default function Underskrifter({ språk }: { språk: SpråkType }) {
  const tekster = hentTekst(språk, tekst);
  return (
    <section>
      <h2>{tekster.tittel}</h2>
      <SignaturBoks bidragstype="MOTTAKER" språk={språk} />
      <SignaturBoks bidragstype="PLIKTIG" språk={språk} />
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
