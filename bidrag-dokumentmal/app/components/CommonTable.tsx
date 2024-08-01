import { Fragment, ReactElement } from "react";

export type TableColumn = {
  width?: string;
  content: ReactElement | string | number | null | undefined;
};
export type TableHeader = {
  name: string;
  width?: string;
  alignment?: "left" | "right" | "center";
};
export type TableData = {
  headers: TableHeader[];
  rows: {
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
  return (
    <table
      className="table"
      style={{ width: width, tableLayout: layoutAuto ? "auto" : "fixed" }}
    >
      <colgroup>
        {headers.map((header, i) => (
          <col
            key={"colgroup" + header.name + i}
            style={{ width: header.width }}
          ></col>
        ))}
      </colgroup>
      <thead>
        <tr>
          {headers.map((header, i) => (
            <th
              key={header.name + i}
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
              <tr key={"row" + i.toString()}>
                {d.columns.map((column, j) => (
                  <td key={column.content?.toString() ?? "" + j}>
                    {column.content}
                  </td>
                ))}
              </tr>
              {d.expandableContent && (
                <tr>
                  {d.expandableContent?.map((column, j) => (
                    <td
                      key={"expandlable" + column.content?.toString() ?? "" + j}
                      colSpan={headers.length}
                      className={"table_row_details"}
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
