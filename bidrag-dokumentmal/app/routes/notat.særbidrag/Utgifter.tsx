import {
  capitalizeFirstLetter,
  formatterBeløp,
  søktAvTilVisningsnavn,
} from "~/utils/visningsnavn";
import { dateToDDMMYYYY } from "~/utils/date-utils";
import Notat from "~/components/Notat";
import { useNotatFelles } from "~/components/notat_felles/NotatContext";
import {
  CommonTable,
  TableHeader,
  TableColumn,
} from "~/components/CommonTable";
import tekster from "~/tekster";
import { DataViewTable, DataViewTableData } from "~/components/DataViewTable";

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
        layoutAuto
        width={"700px"}
        data={{
          headers: [
            { name: tekster.tabell.utgifter.dato, width: "80px" },
            { name: tekster.tabell.utgifter.utgift },
            { name: tekster.tabell.utgifter.kravbeløp, width: "100px" },
            { name: tekster.tabell.utgifter.godkjentBeløp, width: "100px" },
            { name: tekster.tabell.utgifter.begrunnelse, width: "auto" },
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
      <div style={{ marginTop: "8px" }}>
        <DataViewTable
          width={"40%"}
          labelColWidth={"160px"}
          data={
            [
              {
                label: "Godkjent beløp",
                value: formatterBeløp(
                  data.utgift?.beregning?.totalGodkjentBeløp,
                ),
              },
              {
                label: "Direkte betalt av Bidragspliktig",
                value: formatterBeløp(
                  data.utgift?.beregning?.beløpDirekteBetaltAvBp,
                ),
              },
            ].filter((d) => d != null) as DataViewTableData[]
          }
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
        <DataViewTable
          className={"two_column_view"}
          width={"40%"}
          labelColWidth={"80px"}
          data={[
            {
              label: "Søknadstype",
              value: capitalizeFirstLetter(behandling.søknadstype),
            },
            {
              label: "Kategori",
              value: behandling.kategoriVisningsnavn,
            },
            {
              label: "Søkt fra",
              value: søktAvTilVisningsnavn(behandling.søktAv),
            },
          ]}
        />
        <DataViewTable
          className={"two_column_view"}
          width={"40%"}
          labelColWidth={"80px"}
          data={
            [
              {
                label: "Mottatt dato",
                value: dateToDDMMYYYY(behandling.mottattDato as string),
              },
              behandling.avslag && {
                label: "Avslag",
                value: `${behandling.avslagVisningsnavn}`,
              },
            ].filter((d) => d != null) as DataViewTableData[]
          }
        />
      </div>
    </div>
  );
}
