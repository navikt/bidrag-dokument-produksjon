import NavLogo from "~/components/NavLogo";
import { useVedtakFelles } from "~/components/vedtak_felles/VedtakContext";
import { Adresse, EnhetKontaktInfo } from "~/types/Api";

export default function BrevAdresseKontaktinfo() {
  const { data } = useVedtakFelles();

  const mottaker = data.mottaker;
  return (
    <div className={"soknad_detaljer"}>
      <div>
        <NavLogo />
        <table
          className="table w-full lexical-locked-region"
          data-editable="false"
        >
          <tbody>
            <tr>
              <td className="align-top w-[90%]" style={{ width: "70%" }}>
                {renderAdresse(mottaker?.adresse, mottaker?.navn)}
              </td>
              <td className="align-top w-1/2">
                {renderKontaktinfo(data?.kontaktInfo)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function renderKontaktinfo(kontaktInfo?: EnhetKontaktInfo) {
  if (!kontaktInfo) return null;

  return renderAdresse(kontaktInfo.postadresse, kontaktInfo.navn);
}

function buildAdresseLines(adresse?: Adresse): string[] {
  if (!adresse) return [];

  const lines = [
    adresse.bruksenhetsnummer
      ? `Bolignummer ${adresse.bruksenhetsnummer}`
      : null,
    adresse.adresselinje1,
    adresse.adresselinje2,
    adresse.adresselinje3,
    adresse.adresselinje4,
  ].filter((line): line is string => Boolean(line && line.trim()));

  const adresseFull = lines.join("");
  const adresseInneholdPoststed =
    adresseFull && adresse.poststed && adresseFull.includes(adresse.poststed);

  if (adresse.postnummer && !adresseInneholdPoststed) {
    lines.push(`${adresse.postnummer} ${adresse.poststed ?? ""}`.trim());
  }

  return lines;
}

function renderAdresse(adresse?: Adresse, navn?: string) {
  const lines = buildAdresseLines(adresse);
  const allLines = [navn, ...lines].filter((line): line is string =>
    Boolean(line && line.trim()),
  );

  if (allLines.length === 0) return null;

  return (
    <address>
      {allLines.map((line, index) => (
        <div key={`${line}-${index}`}>{line}</div>
      ))}
    </address>
  );
}
