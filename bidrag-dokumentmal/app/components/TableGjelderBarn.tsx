import { NotatRolleDto } from "~/types/Api";
import { dateToDDMMYYYY } from "~/utils/date-utils";

export default function TableGjelderBarn({
  gjelderBarn,
}: {
  gjelderBarn: NotatRolleDto;
}) {
  return (
    <dl style={{ marginBottom: 0 }}>
      <dt>{gjelderBarn.navn}</dt>
      <dd style={{ display: "inline-table" }}>
        / {dateToDDMMYYYY(gjelderBarn.fødselsdato)}
      </dd>
    </dl>
  );
}
