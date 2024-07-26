import { sammenlignRoller, rolleTilVisningsnavn } from "~/utils/visningsnavn";
import { PersonNotatDto, Rolletype } from "~/types/Api";
import DataDescription from "~/components/DataDescription";
import { dateToDDMMYYYY } from "~/utils/date-utils";
import { NotatDataProps } from "~/components/notat_felles/NotatContext";

export default function Soknaddetaljer({ data }: NotatDataProps) {
  const rollerIkkeBarn = data.roller.filter(
    (rolle) => !sammenlignRoller(rolle.rolle, Rolletype.BA),
  );
  const rollerBarn = data.roller.filter((rolle) =>
    sammenlignRoller(rolle.rolle, Rolletype.BA),
  );
  return (
    <div className={"soknad_detaljer"}>
      <div>
        <DataDescription label={"Saksnummer"} value={data.saksnummer} />
        {rollerIkkeBarn.map((rolle) => (
          <DataDescription
            key={rolle.ident}
            label={rolleTilVisningsnavn(rolle.rolle!)!}
            value={rolle.navn + " / " + dateToDDMMYYYY(rolle.fødselsdato)}
          />
        ))}
        <RollerBarn rollerBarn={rollerBarn} />
      </div>
    </div>
  );
}

function RollerBarn({ rollerBarn }: { rollerBarn: PersonNotatDto[] }) {
  return (
    <dl className="datarow">
      <dt>{"Søknadsbarn"}</dt>
      <dd style={{ display: "inline-table" }}>
        {rollerBarn.map((rolle) => (
          <span
            key={rolle.ident}
            style={{
              width: "100%",
              display: "block",
            }}
          >
            {rolle.navn + " / " + dateToDDMMYYYY(rolle.fødselsdato)}
          </span>
        ))}
      </dd>
    </dl>
  );
}
