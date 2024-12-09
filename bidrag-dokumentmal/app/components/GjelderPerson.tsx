import { NotatPersonDto, Rolletype } from "~/types/Api";
import { useTheme } from "~/components/notat_felles/ThemeContext";
import { DataViewTable, DataViewTableData } from "~/components/DataViewTable";
import { rolleTilVisningsnavn } from "~/utils/visningsnavn";

export default function GjelderPerson({ rolle }: { rolle: NotatPersonDto }) {
  const { styling } = useTheme();
  if (styling == "V2") {
    return (
      <DataViewTable
        className={"mb-2 mt-2"}
        data={
          [
            {
              label: rolleTilVisningsnavn(rolle.rolle!),
              labelBold: true,
              value: rolle.navn,
            },
          ].filter((d) => d != null) as DataViewTableData[]
        }
      />
    );
  }
  return (
    <div
      className={"elements_inline text-heading-small"}
      style={{ marginRight: 5, paddingRight: 0 }}
    >
      {rolle.rolle === Rolletype.BA ? (
        <p>{rolleTilVisningsnavn(rolle.rolle!) + ": " + rolle.navn}</p>
      ) : (
        <p>{rolleTilVisningsnavn(rolle.rolle!)}</p>
      )}
    </div>
  );
}
