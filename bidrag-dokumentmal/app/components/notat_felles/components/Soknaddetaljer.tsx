import { rolleTilVisningsnavn, sammenlignRoller } from "~/utils/visningsnavn";
import { Rolletype } from "~/types/Api";
import { dateToDDMMYYYY } from "~/utils/date-utils";
import NavLogo from "~/components/NavLogo";
import { DataViewTable } from "~/components/DataViewTable";
import {
  useDokumentFelles,
  TypeInnhold,
} from "~/components/vedtak_felles/FellesContext";

export default function Soknaddetaljer() {
  const { roller, saksnummer, typeInnhold } = useDokumentFelles();
  const rollerIkkeBarn = roller.filter(
    (rolle) => !sammenlignRoller(rolle.rolle, Rolletype.BA),
  );
  const rollerBarn = roller.filter((rolle) =>
    sammenlignRoller(rolle.rolle, Rolletype.BA),
  );
  return (
    <div className={"soknad_detaljer"}>
      <div>
        {typeInnhold == TypeInnhold.NOTAT && <NavLogo />}
        <DataViewTable
          labelColWidth={"98px"}
          data={[
            {
              label: "Saksnummer",
              value:
                typeInnhold == TypeInnhold.NOTAT
                  ? saksnummer
                  : `${saksnummer} (Oppgi saksnummeret ved henvendelse til oss.)`,
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
