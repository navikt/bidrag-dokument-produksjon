import { useNotatFelles } from "~/components/notat_felles/NotatContext";
import { rolleTilVisningsnavn } from "~/utils/visningsnavn";
import { DataViewTable, DataViewTableData } from "~/components/DataViewTable";
import { CommonTable } from "~/components/CommonTable";
import { konverterRolletype } from "~/utils/converter-utils";
import { Rolletype } from "~/types/Api";

export default function Gebyr() {
  const { data, erAvslag } = useNotatFelles();
  const gebyr = data.gebyr;
  if (!gebyr || gebyr.length == 0) return null;
  console.log(gebyr);
  return (
    <div className={"mb-medium"}>
      <div className={"elements_inline"}>
        <h2>Gebyr</h2>
      </div>
      <div className={"flex flex-col gap-4 mt-2"}>
        {gebyr
          .sort((d) =>
            konverterRolletype(d.rolle.rolle) == Rolletype.BM ? 1 : -1,
          )
          .map((gebyRolle, i) => (
            <div key={gebyRolle.rolle.ident! + i}>
              <DataViewTable
                className={"mb-2"}
                data={
                  [
                    {
                      label: rolleTilVisningsnavn(gebyRolle.rolle.rolle!),
                      labelBold: true,
                      value: gebyRolle.rolle.navn,
                    },
                  ].filter((d) => d != null) as DataViewTableData[]
                }
              />
              <CommonTable
                layoutAuto
                data={{
                  headers: [
                    {
                      name: "Beskrivelse",
                    },
                    {
                      name: "Beløp",
                    },
                  ],
                  rows: [
                    {
                      columns: [
                        {
                          content: erAvslag
                            ? "Inntekt siste 12 måneder"
                            : "Skattepliktig inntekt",
                        },
                        {
                          content: gebyRolle.inntekt.skattepliktigInntekt,
                        },
                      ],
                    },
                    !erAvslag && {
                      columns: [
                        {
                          content: "Høyeste barnetillegg",
                        },
                        {
                          content: gebyRolle.inntekt.maksBarnetillegg,
                        },
                      ],
                    },
                    !erAvslag && {
                      columns: [
                        {
                          labelBold: true,
                          content: "Total",
                        },
                        {
                          content: gebyRolle.inntekt.totalInntekt,
                        },
                      ],
                    },
                  ].filter((d) => d != false),
                }}
              />

              <DataViewTable
                className={"mt-4"}
                data={
                  [
                    {
                      label: "Gebyr",
                      labelBold: true,
                      value: gebyRolle.gebyrResultatVisningsnavn,
                    },
                    gebyRolle.manueltOverstyrtGebyr && {
                      label: "Begrunnelse",
                      labelBold: true,
                      value: gebyRolle.manueltOverstyrtGebyr.begrunnelse,
                    },
                  ].filter((d) => d != null) as DataViewTableData[]
                }
              />
              {gebyRolle.beregnetIlagtGebyr}
            </div>
          ))}
      </div>
    </div>
  );
}
