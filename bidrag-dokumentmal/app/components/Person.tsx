import { dateToDDMMYYYY } from "~/utils/date-utils";
import { DokumentmalPersonDto } from "~/types/Api";
import { useNotatFelles } from "~/components/notat_felles/NotatContext";

type PersonProps = {
  navn: string;
  fødselsdato: string;
  personident?: string;
  erBeskyttet?: boolean;
};
export default function Person({
  navn,
  fødselsdato,
  erBeskyttet,
}: PersonProps) {
  if (erBeskyttet) {
    //TODO: Visning av beskyttelse
    return <span>{navn}</span>;
  }
  return (
    <span>
      {navn} / {dateToDDMMYYYY(fødselsdato)}
    </span>
  );
}

export function PersonV2(
  props: DokumentmalPersonDto & { visFødselsdato?: boolean },
) {
  const { visFødselsdato = false, ...person } = props;
  const { gjelderFlereSaker } = useNotatFelles();
  if (person.erBeskyttet) {
    //TODO: Visning av beskyttelse
    return (
      <span>
        {person.navn}
        {gjelderFlereSaker ? ` (sak ${person.saksnummer})` : ""}
      </span>
    );
  }
  if (visFødselsdato) {
    return (
      <span>
        {person.navn} / {dateToDDMMYYYY(person.fødselsdato)}
        {gjelderFlereSaker ? ` (sak ${person.saksnummer})` : ""}
      </span>
    );
  }
  return (
    <span>
      {person.navn}
      {gjelderFlereSaker ? ` (sak ${person.saksnummer})` : ""}
    </span>
  );
}
