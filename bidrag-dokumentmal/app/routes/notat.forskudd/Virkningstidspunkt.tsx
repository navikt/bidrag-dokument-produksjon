import {
  capitalizeFirstLetter,
  søktAvTilVisningsnavn,
} from "~/utils/visningsnavn";
import { dateToDDMMYYYY } from "~/utils/date-utils";
import Notat from "~/components/Notat";
import { useNotatFelles } from "~/components/notat_felles/NotatContext";
import { DataViewTable } from "~/components/DataViewTable";

export default function Virkningstidspunkt() {
  const { data } = useNotatFelles();
  const virkningstidspunkt = data.virkningstidspunkt;
  const behandling = data.behandling;
  return (
    <div className={"virkningstidspunkt"}>
      <h2>Virkningstidspunkt</h2>
      <div>
        <div style={{ width: "800px", height: "80px", marginBottom: 0 }}>
          <DataViewTable
            className={"two_column_view"}
            width={"40%"}
            labelColWidth={"70px"}
            data={[
              {
                label: "Søknadstype",
                value: capitalizeFirstLetter(behandling.søknadstype),
              },
              {
                label: "Søkt fra",
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
            className={"two_column_view"}
            width={"40%"}
            labelColWidth={"100px"}
            data={[
              {
                label: "Virkningstidspunkt",
                value: dateToDDMMYYYY(behandling.virkningstidspunkt),
              },
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
        <Notat data={virkningstidspunkt.notat} />
      </div>
    </div>
  );
}
