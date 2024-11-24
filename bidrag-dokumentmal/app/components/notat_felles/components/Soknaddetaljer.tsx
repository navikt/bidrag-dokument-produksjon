import { sammenlignRoller, rolleTilVisningsnavn } from "~/utils/visningsnavn";
import { Rolletype } from "~/types/Api";
import { dateToDDMMYYYY } from "~/utils/date-utils";
import NavLogo from "~/components/NavLogo";
import { useNotatFelles } from "~/components/notat_felles/NotatContext";
import { DataViewTable } from "~/components/DataViewTable";

export default function Soknaddetaljer() {
  const { data } = useNotatFelles();
  const rollerIkkeBarn = data.roller.filter(
    (rolle) => !sammenlignRoller(rolle.rolle, Rolletype.BA),
  );
  const rollerBarn = data.roller.filter((rolle) =>
    sammenlignRoller(rolle.rolle, Rolletype.BA),
  );
  return (
    <div className={"soknad_detaljer"}>
      <div>
        <NavLogo />
        <DataViewTable
          labelColWidth={"98px"}
          data={[
            {
              label: "Saksnummer",
              value: data.saksnummer,
            },

            ...rollerIkkeBarn
              .sort((a, b) => {
                const rolleA = rolleTilVisningsnavn(a.rolle!);
                const rolleB = rolleTilVisningsnavn(b.rolle!);
                if (rolleA === "BM" && rolleB !== "BM") return -1;
                if (rolleA !== "BM" && rolleB === "BM") return 1;
                if (rolleA === "BP" && rolleB !== "BP") return -1;
                if (rolleA !== "BP" && rolleB === "BP") return 1;
                return rolleA.localeCompare(rolleB);
              })
              .map((rolle) => ({
                label: rolleTilVisningsnavn(rolle.rolle!)!,
                value: rolle.navn + " / " + dateToDDMMYYYY(rolle.fødselsdato),
              })),
            {
              label: "Søknadsbarn",
              value: (
                <div style={{ display: "inline-table" }}>
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
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
