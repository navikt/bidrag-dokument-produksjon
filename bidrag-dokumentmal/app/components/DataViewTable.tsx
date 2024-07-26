import React from "react";

export interface DataViewTableData {
  label: string;
  value?: string | number;
  additionalInfo?: string | number;
}

interface DataViewTableProps {
  data: DataViewTableData[]; // Array of data objects
  title?: string;
  width?: string;
  labelColWidth?: string;
}

export const DataViewTable: React.FC<DataViewTableProps> = ({
  data,
  title,
  labelColWidth,
  width,
}) => {
  return (
    <div className={"three_column_view"} style={{ width: width }}>
      {title && <h4>{title}</h4>}
      <table>
        <thead>
          <tr>
            <tr>
              <th style={{ width: labelColWidth }}></th>
              <th></th>
            </tr>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <>
              <tr key={rowIndex + "-" + row.value}>
                <td>{row.label}: </td>
                <td>
                  <>
                    {row.value}
                    {/*{row.additionalInfo && (*/}
                    {/*  <span className={"footnote"}>{row.additionalInfo}</span>*/}
                    {/*)}*/}
                  </>
                </td>
              </tr>
              {row.additionalInfo && (
                <tr aria-colspan={2} key={rowIndex + "2"}>
                  <td
                    colSpan={2}
                    style={{
                      fontSize: "11px",
                    }}
                  >
                    {row.additionalInfo}
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};
