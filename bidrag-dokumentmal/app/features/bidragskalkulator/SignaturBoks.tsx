import { Bidragstype, bidragstypeTekster } from "~/types/bidragskalkulator";
import { hentTekst, SpråkType } from "~/utils/oversettelser";

interface SignaturBoksProps {
  bidragstype: Bidragstype;
  språk: SpråkType;
}

export const SignaturBoks = ({ bidragstype, språk }: SignaturBoksProps) => {
  const tekster = hentTekst(språk, tekst);
  const sections = [
    tekster.stedOgDato,
    tekster.signatur,
    tekster.navnMedBlokkbokstaver,
  ];

  return (
    <div>
      <h3>{bidragstypeTekster[bidragstype][språk]}</h3>
      {sections.map((label) => (
        <div key={label} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <p>{label}</p>
            <div className="signature-line" />
          </div>
        </div>
      ))}
    </div>
  );
};

const tekst = {
  stedOgDato: {
    nb: "Sted og dato",
    nn: "Stad og dato",
    en: "Place and date",
  },
  signatur: {
    nb: "Signatur",
    nn: "Signatur",
    en: "Signature",
  },
  navnMedBlokkbokstaver: {
    nb: "Navn med blokkbokstaver",
    nn: "Namn med blokkbokstavar",
    en: "Name in block letters",
  },
};
