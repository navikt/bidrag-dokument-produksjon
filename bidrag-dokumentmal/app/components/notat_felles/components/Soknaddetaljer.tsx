import { sammenlignRoller, rolleTilVisningsnavnV2 } from "~/utils/visningsnavn";
import { Rolletype, DokumentmalPersonDto } from "~/types/Api";
import { dateToDDMMYYYY } from "~/utils/date-utils";
import NavLogo from "~/components/NavLogo";
import { DataViewTable } from "~/components/DataViewTable";
import {
  useDokumentFelles,
  TypeInnhold,
} from "~/components/vedtak_felles/FellesContext";
import { isNullOrEmpty } from "~/utils/string-utils";

export default function Soknaddetaljer() {
  const { roller, saksnummer, typeInnhold } = useDokumentFelles();
  const rollerIkkeBarn = roller.filter(
    (rolle) => !sammenlignRoller(rolle.rolle, Rolletype.BA),
  );
  const rollerBarn = roller.filter((rolle) =>
    sammenlignRoller(rolle.rolle, Rolletype.BA),
  );

  function tilNavnOgFødselsdato(rolle: DokumentmalPersonDto) {
    if (isNullOrEmpty(rolle.navn)) {
      return dateToDDMMYYYY(rolle.fødselsdato);
    }
    if (isNullOrEmpty(dateToDDMMYYYY(rolle.fødselsdato))) {
      return rolle.navn;
    }
    return rolle.navn + " / " + dateToDDMMYYYY(rolle.fødselsdato);
  }
  return (
    <div className={"soknad_detaljer mb-[30px]"}>
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
                const rolleA = rolleTilVisningsnavnV2(a);
                const rolleB = rolleTilVisningsnavnV2(b);
                if (rolleA === "BM" && rolleB !== "BM") return -1;
                if (rolleA !== "BM" && rolleB === "BM") return 1;
                if (rolleA === "BP" && rolleB !== "BP") return -1;
                if (rolleA !== "BP" && rolleB === "BP") return 1;
                return rolleA.localeCompare(rolleB);
              })
              .map((rolle) => ({
                label: rolleTilVisningsnavnV2(rolle)!,
                value: tilNavnOgFødselsdato(rolle),
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
                      {tilNavnOgFødselsdato(rolle)}
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
