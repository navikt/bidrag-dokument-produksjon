import { dateToDDMMYYYY } from "~/utils/date-utils";

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
    return <span>{navn}</span>;
  }
  return (
    <span>
      {navn} / {dateToDDMMYYYY(fødselsdato)}
    </span>
  );
}
