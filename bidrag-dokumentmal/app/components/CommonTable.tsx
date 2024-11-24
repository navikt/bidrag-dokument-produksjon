import { Fragment, ReactElement } from "react";
import { useTheme } from "~/components/notat_felles/ThemeContext";

export type TableColumn = {
  width?: string;
  colSpan?: number;
  labelBold?: boolean;
  content: ReactElement | string | number | null | undefined;
};
export type TableHeader = {
  name: string;
  width?: string;
};
export type TableData = {
  headers: TableHeader[];
  rows: {
    borderBottom?: boolean;
    skipBorderBottom?: boolean;
    columns: TableColumn[];
    expandableContent?: TableColumn[];
  }[];
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
    "pb-2 pt-2 pl-1 pr-1 border-b border-solid border-t-0 border-r-0 border-l-0";
  const cellV2StylingWithoutBorder = "pb-2 pt-2 pl-1 pr-1";
  return (
    <table
      className="table"
      style={{
        width: width,
        maxWidth: "620px",
        tableLayout: layoutAuto ? "auto" : "fixed",
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
              <tr
                key={"row" + i.toString()}
                style={{
                  borderBottom: d.borderBottom ? "1px solid black" : undefined,
                }}
              >
                {d.columns.map((column, j) => (
                  <td
                    className={
                      styling == "V2"
                        ? `${
                            d.skipBorderBottom
                              ? cellV2StylingWithoutBorder
                              : cellV2Styling
                          } ${i % 2 == 1 ? "bg-table-bg-even" : ""}`
                        : "p-table-body-tr-v1"
                    }
                    key={column.content?.toString() ?? "" + j}
                    colSpan={column.colSpan}
                    style={{ fontWeight: column.labelBold ? "bold" : "normal" }}
                  >
                    {column.content}
                  </td>
                ))}
              </tr>
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
