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
      <h3 className="mb-medium">{bidragstypeTekster[bidragstype][språk]}</h3>
      {sections.map((label, i) => (
        <div key={label}>
          <div className="flex flex-col">
            <p style={{ flex: 1, fontFamily: '"Source Sans 3", sans-serif' }}>
              {label}
            </p>
            <div
              style={{
                height: 40,
                borderBottom: "1px solid black",
                width: "50%",
              }}
            />
          </div>
          {i < sections.length - 1 && (
            <div className="w-full h-10 divide divide-solid"></div>
          )}
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
