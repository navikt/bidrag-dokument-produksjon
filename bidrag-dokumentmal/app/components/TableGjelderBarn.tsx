import { PersonNotatDto } from "~/types/Api";
import { dateToDDMMYYYY } from "~/utils/date-utils";
import React from "react";

export default function TableGjelderBarn({
  gjelderBarn,
}: {
  gjelderBarn: PersonNotatDto;
}) {
  // return <div style={{display: "inline-block"}}><BaTag/><Person navn={gjelderBarn.navn!!} fødselsdato={gjelderBarn.fødselsdato!!}/></div>
  return (
    <dl>
      <dt>{gjelderBarn.navn}</dt>
      <dd style={{ display: "inline-table" }}>
        / {dateToDDMMYYYY(gjelderBarn.fødselsdato)}
      </dd>
    </dl>
  );
}
