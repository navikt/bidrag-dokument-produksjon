import {
  capitalizeFirstLetter,
  formatterBeløp,
  søktAvTilVisningsnavn,
} from "~/utils/visningsnavn";
import DataDescription from "~/components/DataDescription";
import { dateToDDMMYYYY } from "~/utils/date-utils";
import Notat from "~/components/Notat";
import { useNotatFelles } from "~/components/notat_felles/NotatContext";
import {
  CommonTable,
  TableHeader,
  TableColumn,
} from "~/components/CommonTable";
import tekster from "~/tekster";

export default function Utgifter() {
  const { data } = useNotatFelles();
  const utgifter = data.utgift;
  return (
    <div className={"utgift"}>
      <h2>Utgift</h2>
      <div>
        <SøknadsDetaljer />
        <Utgiftsposter />
        <Notat data={utgifter?.notat} />
      </div>
    </div>
  );
}

function Utgiftsposter() {
  const { data, erAvslag } = useNotatFelles();
  if (erAvslag) return;
  const utgifter = data.utgift?.utgifter ?? [];
  return (
    <div>
      <h3>Oversikt over utgifter</h3>
      <CommonTable
        data={{
          headers: [
            { name: tekster.tabell.utgifter.dato, width: "70px" },
            { name: tekster.tabell.utgifter.utgift, width: "100px" },
            { name: tekster.tabell.utgifter.kravbeløp, width: "80px" },
            { name: tekster.tabell.utgifter.godkjentBeløp, width: "80px" },
            { name: tekster.tabell.utgifter.begrunnelse, width: "150px" },
          ].filter((d) => typeof d != "boolean") as TableHeader[],
          rows: utgifter.map((d) => {
            return {
              columns: [
                { content: dateToDDMMYYYY(d.dato) },
                { content: d.utgiftstypeVisningsnavn },
                { content: formatterBeløp(d.kravbeløp) },
                { content: formatterBeløp(d.godkjentBeløp) },
                { content: d.begrunnelse },
              ].filter((d) => typeof d != "boolean") as TableColumn[],
            };
          }),
        }}
      />
      <div style={{ marginTop: "10px" }}>
        <DataDescription
          label={"Godkjent beløp"}
          value={formatterBeløp(data.utgift?.beregning?.totalGodkjentBeløp)}
        />
        <DataDescription
          label={"Direkte betalt av BP"}
          value={formatterBeløp(data.utgift?.beregning?.beløpDirekteBetaltAvBp)}
        />
      </div>
    </div>
  );
}

function SøknadsDetaljer() {
  const { data } = useNotatFelles();
  const behandling = data.behandling;
  return (
    <div>
      <div style={{ width: "600px", height: "80px", marginBottom: 0 }}>
        <div className="two_column_view">
          <DataDescription
            label={"Søknadstype"}
            value={capitalizeFirstLetter(behandling.søknadstype)}
          />
          <DataDescription
            label={"Søkt fra"}
            value={søktAvTilVisningsnavn(behandling.søktAv)}
          />
          <DataDescription
            label={"Mottatt dato"}
            value={dateToDDMMYYYY(behandling.mottattDato as string)}
          />
        </div>
        <div className="two_column_view">
          <DataDescription
            label={"Kategori"}
            value={`${behandling.kategoriVisningsnavn}`}
          />
          {behandling.avslag && (
            <DataDescription
              label={"Avslag"}
              value={behandling.avslagVisningsnavn}
            />
          )}
        </div>
      </div>
    </div>
  );
}
