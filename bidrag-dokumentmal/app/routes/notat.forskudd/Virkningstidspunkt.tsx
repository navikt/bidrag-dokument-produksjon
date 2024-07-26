import {
  capitalizeFirstLetter,
  søktAvTilVisningsnavn,
} from "~/utils/visningsnavn";
import DataDescription from "~/components/DataDescription";
import { dateToDDMMYYYY } from "~/utils/date-utils";
import Notat from "~/components/Notat";
import { useNotatFelles } from "~/components/notat_felles/NotatContext";

export default function Virkningstidspunkt() {
  const { data } = useNotatFelles();
  const virkningstidspunkt = data.virkningstidspunkt;
  const behandling = data.behandling;
  return (
    <div className={"virkningstidspunkt"}>
      <h2>Virkningstidspunkt</h2>
      <div>
        <div style={{ width: "800px", height: "80px", marginBottom: 0 }}>
          <div className="two_column_view">
            <DataDescription
              label={"Søknadstype"}
              value={capitalizeFirstLetter(behandling.søknadstype)}
            />
            <DataDescription
              label={"Søkt fra"}
              value={søktAvTilVisningsnavn(behandling.søktAv)}
            />
            {behandling.avslag ? (
              <DataDescription
                label={"Avslag"}
                value={behandling.avslagVisningsnavn}
              />
            ) : (
              <DataDescription
                label={"Årsak"}
                value={virkningstidspunkt.årsakVisningsnavn}
              />
            )}
          </div>
          <div className="two_column_view">
            <DataDescription
              label={"Mottatt dato"}
              value={dateToDDMMYYYY(behandling.mottattDato as string)}
            />
            <DataDescription
              label={"Søkt fra dato"}
              value={dateToDDMMYYYY(behandling.søktFraDato as string)}
            />
            <DataDescription
              label={"Virkningstidspunkt"}
              value={dateToDDMMYYYY(behandling.virkningstidspunkt)}
            />
          </div>
        </div>
        <Notat data={virkningstidspunkt.notat} />
      </div>
    </div>
  );
}
