import {
  capitalizeFirstLetter,
  søktAvTilVisningsnavn,
  rolleTilVisningsnavnV2,
} from "~/utils/visningsnavn";
import { dateToDDMMYYYY, sortByAge } from "~/utils/date-utils";
import NotatBegrunnelse from "~/components/NotatBegrunnelse";
import { useNotatFelles } from "~/components/notat_felles/NotatContext";
import { DataViewTable, DataViewTableData } from "~/components/DataViewTable";
import { Stonadstype } from "~/types/Api";
import Beregningsperiode from "~/routes/notat.bidrag/Beregningsperiode";
import {
  TypeInnhold,
  useDokumentFelles,
} from "~/components/vedtak_felles/FellesContext";

export default function Virkningstidspunkt() {
  const { data } = useNotatFelles();
  const virkningstidspunkt = data.virkningstidspunktV2;
  return (
    <div className={"virkningstidspunkt"}>
      <h2>Virkningstidspunkt</h2>
      {virkningstidspunkt.erLikForAlle ? (
        <VirkningstidspunktFelles />
      ) : (
        <VirkningstidspunktPerBarn />
      )}
    </div>
  );
}

function VirkningstidspunktPerBarn() {
  const { data, gjelderFlereSaker } = useNotatFelles();
  const { typeInnhold } = useDokumentFelles();
  const behandling = data.behandling;
  return (
    <div className={"flex flex-col gap-2"}>
      {data.virkningstidspunktV2.barn
        .sort((a, b) => sortByAge(a.rolle, b.rolle))
        .map((barn) => {
          return (
            <div key={barn.rolle.ident}>
              <DataViewTable
                data={[
                  {
                    label: rolleTilVisningsnavnV2(barn.rolle),
                    labelBold: true,
                    value: barn.rolle.navn,
                  },
                ]}
              />
              <div className={"flex flex-row justify-between w-[500px]"}>
                <DataViewTable
                  labelColWidth={"70px"}
                  data={[
                    (gjelderFlereSaker && {
                      label: "Saksnummer",
                      value:
                        typeInnhold == TypeInnhold.NOTAT
                          ? barn.rolle.saksnummer
                          : `${barn.rolle.saksnummer} (Oppgi saksnummeret ved henvendelse til oss.)`,
                    }) as unknown as DataViewTableData,
                    {
                      label: "Søknadstype",
                      value: capitalizeFirstLetter(behandling.søknadstype),
                    },
                    {
                      label: "Søknad fra",
                      value: søktAvTilVisningsnavn(behandling.søktAv),
                    },
                    ...[
                      barn.avslag
                        ? {
                            label: "Avslag",
                            value: barn.avslagVisningsnavn,
                          }
                        : {
                            label: "Årsak",
                            value: barn.årsakVisningsnavn,
                          },
                    ],
                  ]}
                />
                <DataViewTable
                  labelColWidth={"100px"}
                  className={"mb-2"}
                  data={[
                    {
                      label: "Mottatt dato",
                      value: dateToDDMMYYYY(behandling.mottattDato as string),
                    },
                    {
                      label: "Søkt fra dato",
                      value: dateToDDMMYYYY(behandling.søktFraDato as string),
                    },
                  ]}
                />
              </div>
              <div>
                <DataViewTable
                  labelColWidth={"100px"}
                  data={[
                    {
                      label: "Virkningstidspunkt",
                      value: dateToDDMMYYYY(barn.virkningstidspunkt),
                    },
                  ]}
                />
                <DataViewTable
                  key={barn.rolle.ident}
                  labelColWidth={"100px"}
                  data={[
                    {
                      label: "Opphørsdato",
                      value: dateToDDMMYYYY(barn.opphørsdato as string),
                    },
                  ]}
                />
                <Beregningsperiode virkningstidspunkt={barn} />
                <NotatBegrunnelse data={barn.begrunnelse} />
                {data.stønadstype == Stonadstype.BIDRAG18AAR && (
                  <NotatBegrunnelse
                    label={"Vurdering av skolegang"}
                    data={barn.begrunnelseVurderingAvSkolegang}
                  />
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}

function VirkningstidspunktFelles() {
  const { data } = useNotatFelles();
  const virkningstidspunkt = data.virkningstidspunktV2.barn[0];
  const behandling = data.behandling;
  return (
    <div>
      <div className={"flex flex-row justify-between w-[500px]"}>
        <DataViewTable
          labelColWidth={"70px"}
          data={[
            {
              label: "Søknadstype",
              value: capitalizeFirstLetter(behandling.søknadstype),
            },
            {
              label: "Søknad fra",
              value: søktAvTilVisningsnavn(behandling.søktAv),
            },
            ...[
              behandling.avslag
                ? {
                    label: "Avslag",
                    value: behandling.avslagVisningsnavn,
                  }
                : {
                    label: "Årsak",
                    value: virkningstidspunkt.årsakVisningsnavn,
                  },
            ],
          ]}
        />
        <DataViewTable
          labelColWidth={"100px"}
          data={[
            {
              label: "Mottatt dato",
              value: dateToDDMMYYYY(behandling.mottattDato as string),
            },
            {
              label: "Søkt fra dato",
              value: dateToDDMMYYYY(behandling.søktFraDato as string),
            },
          ]}
        />
      </div>
      <DataViewTable
        labelColWidth={"100px"}
        className={"mt-4"}
        data={[
          {
            label: "Virkningstidspunkt",
            value: dateToDDMMYYYY(behandling.virkningstidspunkt),
          },
        ]}
      />
      {data.roller
        .filter((d) => d.opphørsdato != null)
        .map((rolle) => (
          <DataViewTable
            key={rolle.ident}
            labelColWidth={"100px"}
            data={[
              {
                label: "Opphørsdato",
                value: dateToDDMMYYYY(rolle.opphørsdato),
              },
            ]}
          />
        ))}
      <Beregningsperiode virkningstidspunkt={virkningstidspunkt} />
      <NotatBegrunnelse data={virkningstidspunkt.begrunnelse} />
      {data.stønadstype == Stonadstype.BIDRAG18AAR && (
        <NotatBegrunnelse
          label={"Vurdering av skolegang"}
          data={virkningstidspunkt.begrunnelseVurderingAvSkolegang}
        />
      )}
    </div>
  );
}
