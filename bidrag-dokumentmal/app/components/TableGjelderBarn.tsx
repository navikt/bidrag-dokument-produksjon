import { NotatPersonDto } from "~/types/Api";
import { dateToDDMMYYYY } from "~/utils/date-utils";
import { DataViewTable, DataViewTableData } from "~/components/DataViewTable";
import { rolleTilVisningsnavn } from "~/utils/visningsnavn";
import { useTheme } from "~/components/notat_felles/ThemeContext";

export default function TableGjelderBarn({
  gjelderBarn,
}: {
  gjelderBarn: NotatPersonDto;
}) {
  const { styling } = useTheme();
  if (styling == "V2") {
    return (
      <DataViewTable
        className={"mb-2 mt-2"}
        data={
          [
            {
              label: rolleTilVisningsnavn(gjelderBarn.rolle!),
              labelBold: true,
              value: gjelderBarn.navn,
            },
          ].filter((d) => d != null) as DataViewTableData[]
        }
      />
    );
  }
  return (
    <dl style={{ marginBottom: 0 }}>
      <dt>{gjelderBarn.navn}</dt>
      <dd style={{ display: "inline-table" }}>
        / {dateToDDMMYYYY(gjelderBarn.fødselsdato)}
      </dd>
    </dl>
  );
}
