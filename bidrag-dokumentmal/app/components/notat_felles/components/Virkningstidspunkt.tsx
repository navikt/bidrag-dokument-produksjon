import {
  capitalizeFirstLetter,
  søktAvTilVisningsnavn,
} from "~/utils/visningsnavn";
import { dateToDDMMYYYY } from "~/utils/date-utils";
import NotatBegrunnelse from "~/components/NotatBegrunnelse";
import { useNotatFelles } from "~/components/notat_felles/NotatContext";
import { DataViewTable } from "~/components/DataViewTable";
import { Stonadstype } from "~/types/Api";
import Beregningsperiode from "~/routes/notat.bidrag/Beregningsperiode";

export default function Virkningstidspunkt() {
  const { data } = useNotatFelles();
  const virkningstidspunkt = data.virkningstidspunkt;
  const behandling = data.behandling;
  return (
    <div className={"virkningstidspunkt"}>
      <h2>Virkningstidspunkt</h2>
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
        <Beregningsperiode />
        <NotatBegrunnelse data={virkningstidspunkt.begrunnelse} />
        {data.stønadstype == Stonadstype.BIDRAG18AAR && (
          <NotatBegrunnelse
            label={"Vurdering av skolegang"}
            data={virkningstidspunkt.begrunnelseVurderingAvSkolegang}
          />
        )}
      </div>
    </div>
  );
}
