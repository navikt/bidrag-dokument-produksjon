import { capitalizeFirstLetter } from "~/utils/visningsnavn";
import DataDescription from "~/components/DataDescription";
import { NotatDto, SoktAvType } from "~/types/Api";
import { dateToDDMMYYYY } from "~/utils/date-utils";
import Notat from "~/components/Notat";

function søktAvTilVisningsnavn(søktAv?: SoktAvType) {
  switch (søktAv) {
    case SoktAvType.NAV_INTERNASJONALT:
    case SoktAvType.NAV_BIDRAG:
      return "NAV";
    case SoktAvType.BARN18AR:
      return "Barn";
    case SoktAvType.BM_I_ANNEN_SAK:
      return "Bidragsmottaker i annen sak";
    case SoktAvType.KLAGE_ANKE:
      return "Klage";
    default:
      return capitalizeFirstLetter(søktAv);
  }
}
export default function Virkningstidspunkt({ data }: { data: NotatDto }) {
  const virkningstidspunkt = data.virkningstidspunkt;
  return (
    <div className={"virkningstidspunkt"}>
      <h2>Virkningstidspunkt</h2>
      <div>
        <div style={{ width: "800px", height: "80px", marginBottom: 0 }}>
          <div className="two_column_view">
            <DataDescription
              label={"Søknadstype"}
              value={capitalizeFirstLetter(virkningstidspunkt.søknadstype)}
            />
            <DataDescription
              label={"Søkt fra"}
              value={søktAvTilVisningsnavn(virkningstidspunkt.søktAv)}
            />
            {virkningstidspunkt.avslag ? (
              <DataDescription
                label={"Avslag"}
                value={virkningstidspunkt.avslagVisningsnavn}
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
              value={dateToDDMMYYYY(virkningstidspunkt.mottattDato as string)}
            />
            <DataDescription
              label={"Søkt fra dato"}
              value={dateToDDMMYYYY(virkningstidspunkt.søktFraDato as string)}
            />
            <DataDescription
              label={"Virkningstidspunkt"}
              value={dateToDDMMYYYY(virkningstidspunkt.virkningstidspunkt)}
            />
          </div>
        </div>
        <Notat data={virkningstidspunkt.notat} />
      </div>
    </div>
  );
}
