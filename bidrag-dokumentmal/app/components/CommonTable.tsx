import { Fragment, ReactElement } from "react";
import { useTheme } from "~/components/notat_felles/ThemeContext";

type RowContent = ReactElement | string | number | null | undefined;
export type TableColumn = {
  width?: string;
  colSpan?: number;
  fullSpan?: boolean;
  labelBold?: boolean;
  content: RowContent;
};

export type TableRow = {
  borderBottom?: boolean;
  skipBorderBottom?: boolean;
  skipPadding?: boolean;
  className?: string;
  periodColumn?: RowContent;
  zebraStripe?: boolean;
  columns: TableColumn[];
  expandableContent?: TableColumn[];
};
export type TableHeader = {
  name: string;
  width?: string;
};
export type TableData = {
  headers: TableHeader[];
  rows: TableRow[];
};
type CommonTableProps = {
  width?: string;
  layoutAuto?: boolean;
  data: TableData;
};
export function CommonTable({
  layoutAuto,
  data: { headers, rows },
  width,
}: CommonTableProps) {
  const { styling } = useTheme();
  const cellV2Styling =
    "pb-2 pt-2 pl-3 pr-3 border-b border-solid border-t-0 border-r-0 border-l-0";
  const cellV2StylingWithoutBorder = "pb-2 pt-2 pl-3 pr-3";
  const style =
    styling == "V2" ? { width: "670px" } : { width: width, maxWidth: "620px" };

  function renderRow(row: TableRow, index: number, isPeriodColumn: boolean) {
    return (
      <tr
        key={"row" + index.toString()}
        style={{
          borderBottom: row.borderBottom ? "1px solid black" : undefined,
        }}
      >
        {row.columns.map((column) => (
          <td
            className={
              styling == "V2"
                ? `${
                    !row.skipPadding
                      ? row.skipBorderBottom || isPeriodColumn
                        ? cellV2StylingWithoutBorder
                        : cellV2Styling
                      : ""
                  } ${row.periodColumn ? false : (row.zebraStripe != false && index % 2 == 1) || row.zebraStripe == true ? "bg-table-bg-even" : ""} ${row.className}`
                : "p-table-body-tr-v1"
            }
            key={column.content?.toString()}
            colSpan={column.fullSpan ? headers.length : column.colSpan}
            style={{
              fontWeight: column.labelBold ? "bold" : "normal",
            }}
          >
            {column.content}
          </td>
        ))}
      </tr>
    );
  }

  return (
    <table
      className="table"
      style={{
        ...style,
        tableLayout: layoutAuto || styling == "V2" ? "auto" : "fixed",
      }}
    >
      <colgroup>
        {headers.map((header, i) => (
          <col
            key={"colgroup" + header.name + i}
            style={{ width: header.width }}
          ></col>
        ))}
      </colgroup>
      <thead
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        style={{ wordBreak: "auto-phrase", textWrap: "wrap" }}
        className={styling == "V2" ? "bg-table-header" : ""}
      >
        <tr>
          {headers.map((header, i) => (
            <th
              key={header.name + i}
              className={styling == "V2" ? cellV2Styling : "p-table-header-v1"}
              style={{
                width: header.width,
                verticalAlign: "top",
              }}
            >
              {header.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((d, i) => {
          return (
            <Fragment key={"row" + i.toString()}>
              {d.periodColumn &&
                renderRow(
                  {
                    ...d,
                    periodColumn: null,
                    columns: [{ content: d.periodColumn, fullSpan: true }],
                  },
                  1,
                  true,
                )}
              {renderRow(d, i, false)}
              {d.expandableContent && (
                <tr>
                  {d.expandableContent?.map((column, j) => (
                    <td
                      key={
                        "expandable" + (column.content?.toString() ?? "") + j
                      }
                      colSpan={headers.length}
                      className={
                        styling == "V2"
                          ? `table_row_details pb-2 ${i % 2 == 1 ? "bg-table-bg-even" : ""}`
                          : "table_row_details"
                      }
                      style={{ paddingTop: "8px" }}
                    >
                      {column.content}
                    </td>
                  ))}
                </tr>
              )}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
}
