import { useNotatFelles } from "~/components/notat_felles/NotatContext";
import { DataViewTable, DataViewTableData } from "~/components/DataViewTable";
import HorizontalLine from "~/components/HorizontalLine";
import { rolleTilVisningsnavn } from "~/utils/visningsnavn";
import { PersonV2 } from "~/components/Person";
import { CommonTable } from "~/components/CommonTable";
import { NotatGebyrDetaljerDto } from "~/types/Api";

export default function GebyrV2() {
  const { data, erAvslag } = useNotatFelles();
  const gebyr = data.gebyrV3;
  if (!gebyr || gebyr.saker.length == 0) return null;

  function map18ÅrsBidrag(gebyr18År: NotatGebyrDetaljerDto[]) {
    if (gebyr18År.length == 0) return null;
    const gebyr18ÅrInnhold = gebyr18År.map((gebyrRolle, index) => {
      const gebyrDetaljer = gebyrRolle;

      return (
        <>
          <DataViewTable
            className={"mb-1 mt-2"}
            data={
              [
                {
                  label: rolleTilVisningsnavn(gebyrRolle.rolle.rolle!),
                  labelBold: true,
                  value: <PersonV2 {...gebyrRolle.rolle} />,
                },
              ].filter((d) => d != null) as DataViewTableData[]
            }
          />

          <div
            key={`${index} ${gebyrRolle.rolle.ident}`}
            className={index > 0 ? "mt-2" : ""}
          >
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
                        content: gebyrDetaljer.inntekt.skattepliktigInntekt,
                      },
                    ],
                  },
                  !erAvslag && {
                    columns: [
                      {
                        content: "Høyeste barnetillegg",
                      },
                      {
                        content: gebyrDetaljer.inntekt.maksBarnetillegg ?? 0,
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
                        content: gebyrDetaljer.inntekt.totalInntekt,
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
                    value: gebyrDetaljer.gebyrResultatVisningsnavn,
                  },
                  gebyrDetaljer.erManueltOverstyrt && {
                    label: "Begrunnelse",
                    value: gebyrDetaljer.begrunnelse,
                  },
                ].filter((d) => d) as DataViewTableData[]
              }
            />
          </div>
        </>
      );
    });

    return (
      <div className={"mt-2"}>
        <h3>Gebyr 18 års søknad:</h3>
        {gebyr18ÅrInnhold}
      </div>
    );
  }

  return (
    <div>
      <div className={"elements_inline section-title"}>
        <h2>Gebyr</h2>
      </div>
      <>
        {gebyr.saker.map((gebyrSak, i) => (
          <div
            key={gebyrSak.saksnummer}
            className={gebyr.saker.length - 1 == i ? "" : "mb-2"}
          >
            {gebyr.saker.length > 1 && (
              <DataViewTable
                className={"mb-1 mt-2"}
                data={
                  [
                    {
                      label: "Gebyr for sak",
                      labelBold: true,
                      value: gebyrSak.saksnummer,
                    },
                  ].filter((d) => d != null) as DataViewTableData[]
                }
              />
            )}
            <div>
              {gebyrSak.gebyrRoller.map((gebyrRolle, index) => {
                const gebyrDetaljer = gebyrRolle;

                return (
                  <>
                    <DataViewTable
                      className={"mb-1 mt-2"}
                      data={
                        [
                          {
                            label: rolleTilVisningsnavn(
                              gebyrRolle.rolle.rolle!,
                            ),
                            labelBold: true,
                            value: <PersonV2 {...gebyrRolle.rolle} />,
                          },
                        ].filter((d) => d != null) as DataViewTableData[]
                      }
                    />

                    <div
                      key={`${index} ${gebyrRolle.rolle.ident}`}
                      className={index > 0 ? "mt-2" : ""}
                    >
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
                                  content:
                                    gebyrDetaljer.inntekt.skattepliktigInntekt,
                                },
                              ],
                            },
                            !erAvslag && {
                              columns: [
                                {
                                  content: "Høyeste barnetillegg",
                                },
                                {
                                  content:
                                    gebyrDetaljer.inntekt.maksBarnetillegg ?? 0,
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
                                  content: gebyrDetaljer.inntekt.totalInntekt,
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
                              value: gebyrDetaljer.gebyrResultatVisningsnavn,
                            },
                            gebyrDetaljer.erManueltOverstyrt && {
                              label: "Begrunnelse",
                              value: gebyrDetaljer.begrunnelse,
                            },
                          ].filter((d) => d) as DataViewTableData[]
                        }
                      />
                    </div>
                  </>
                );
              })}
              {map18ÅrsBidrag(gebyrSak.gebyr18År)}
            </div>
            <HorizontalLine />
          </div>
        ))}
      </>
    </div>
  );
}
