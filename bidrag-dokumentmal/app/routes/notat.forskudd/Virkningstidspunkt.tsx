import { capitalizeFirstLetter } from "~/utils/visningsnavn";
import Datadisplay from "~/components/Datadisplay";
import { NotatDto } from "~/types/Api";
import { dateToDDMMYYYY } from "~/utils/date-utils";

export default function Virkningstidspunkt({ data }: { data: NotatDto }) {
  const virkningstidspunkt = data.virkningstidspunkt;
  return (
    <div className={"virkningstidspunkt"}>
      <h2>Virkningstidspunkt</h2>
      <div>
        <Datadisplay
          label={"Søknadstype"}
          value={capitalizeFirstLetter(virkningstidspunkt.søknadstype)}
        />
        <Datadisplay
          label={"Søkt fra"}
          value={capitalizeFirstLetter(virkningstidspunkt.søktAv)}
        />
        <Datadisplay
          label={"Mottatt dato"}
          value={dateToDDMMYYYY(virkningstidspunkt.mottattDato as string)}
        />
        <Datadisplay
          label={"Søkt fra dato"}
          value={dateToDDMMYYYY(virkningstidspunkt.søktFraDato as string)}
        />
        {virkningstidspunkt.avslag ? (
          <Datadisplay
            label={"Avslag"}
            value={virkningstidspunkt.avslagVisningsnavn}
          />
        ) : (
          <Datadisplay
            label={"Årsak"}
            value={virkningstidspunkt.årsakVisningsnavn}
          />
        )}
        <Datadisplay
          label={"Virkningstidspunkt"}
          value={dateToDDMMYYYY(virkningstidspunkt.virkningstidspunkt)}
        />
      </div>
    </div>
  );
}
