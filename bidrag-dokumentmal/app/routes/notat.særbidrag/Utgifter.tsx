import {
  capitalizeFirstLetter,
  formatterBeløp,
  søktAvTilVisningsnavn,
} from "~/utils/visningsnavn";
import { dateToDDMMYYYY } from "~/utils/date-utils";
import NotatBegrunnelse from "~/components/NotatBegrunnelse";
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
        <NotatBegrunnelse data={utgifter?.begrunnelse} />
      </div>
    </div>
  );
}

function Utgiftsposter() {
  const { data, erAvslag } = useNotatFelles();
  if (erAvslag) return;
  const utgifter = data.utgift?.utgifter ?? [];
  const beregnetUtgifter = data.utgift?.totalBeregning ?? [];
  return (
    <div>
      <h3>Oversikt over utgifter</h3>
      <CommonTable
        layoutAuto
        width={"630px"}
        data={{
          headers: [
            { name: tekster.tabell.utgifter.betaltAvBp, width: "80px" },
            { name: tekster.tabell.utgifter.dato, width: "70px" },
            { name: tekster.tabell.utgifter.utgift, width: "130px" },
            { name: tekster.tabell.utgifter.kravbeløp, width: "80px" },
            { name: tekster.tabell.utgifter.godkjentBeløp, width: "110px" },
            { name: tekster.tabell.utgifter.begrunnelse, width: "180px" },
          ].filter((d) => typeof d != "boolean") as TableHeader[],
          rows: utgifter.map((d) => {
            return {
              columns: [
                { content: d.betaltAvBp ? "Ja" : "Nei" },
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

      {beregnetUtgifter.length > 0 && (
        <div className={"mt-medium mb-medium"}>
          <h3>Beregnet totalt</h3>
          <CommonTable
            layoutAuto
            width={"450px"}
            data={{
              headers: [
                { name: tekster.tabell.utgifter.betaltAvBp, width: "80px" },
                {
                  name: tekster.tabell.utgifter.utgiftskategori,
                  width: "180px",
                },
                { name: tekster.tabell.utgifter.kravbeløp, width: "80px" },
                { name: tekster.tabell.utgifter.godkjentBeløp, width: "80px" },
              ].filter((d) => typeof d != "boolean") as TableHeader[],
              rows: beregnetUtgifter.map((d) => {
                return {
                  columns: [
                    { content: d.betaltAvBp ? "Ja" : "Nei" },
                    { content: d.utgiftstypeVisningsnavn },
                    { content: d.totalKravbeløp },
                    { content: d.totalGodkjentBeløp },
                  ].filter((d) => typeof d != "boolean") as TableColumn[],
                };
              }),
            }}
          />
        </div>
      )}
      <h3>Totalt</h3>
      <div style={{ marginTop: "8px", width: "280px" }}>
        <DataViewTable
          className={"two_column_view_v2"}
          labelColWidth={"200px"}
          data={
            [
              {
                label: "Kravbeløp",
                value: formatterBeløp(data.utgift?.beregning?.totalKravbeløp),
              },
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
      {data.utgift?.maksGodkjentBeløp?.taMed && (
        <div>
          <DataViewTable
            className={"two_column_view_v2"}
            labelColWidth={"200px"}
            data={
              [
                {
                  label: "Maks godkjent beløp",
                  value: formatterBeløp(data.utgift?.maksGodkjentBeløp?.beløp),
                },
                {
                  label: "Begrunnelse for maks godkjent beløp",
                  value: data.utgift?.maksGodkjentBeløp?.begrunnelse,
                },
              ].filter((d) => d != null) as DataViewTableData[]
            }
          />
        </div>
      )}
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
          width={"45%"}
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
          labelColWidth={behandling.klageMottattDato ? "110px" : "80px"}
          data={
            [
              {
                label: "Mottatt dato",
                value: dateToDDMMYYYY(behandling.mottattDato as string),
              },
              behandling.klageMottattDato && {
                label: "Klage mottatt dato",
                value: dateToDDMMYYYY(behandling.klageMottattDato as string),
              },
              behandling.avslag && {
                label: "Avslag",
                value: `${behandling.avslagVisningsnavnUtenPrefiks}`,
              },
            ].filter((d) => d != null) as DataViewTableData[]
          }
        />
      </div>
    </div>
  );
}
