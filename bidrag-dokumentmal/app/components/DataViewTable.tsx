import React from "react";

export interface DataViewTableData {
  label: string;
  value?: string | number | React.ReactNode;
  additionalInfo?: string | number;
}

interface DataViewTableProps {
  data: DataViewTableData[]; // Array of data objects
  title?: string;
  width?: string;
  labelColWidth?: string;
  className?: string;
}

export const DataViewTable: React.FC<DataViewTableProps> = ({
  data,
  title,
  labelColWidth,
  width,
  className,
}) => {
  return (
    <div className={className} style={{ width: width }}>
      {title && <h4>{title}</h4>}
      <table style={{ borderSpacing: 0 }}>
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
                <td style={{ verticalAlign: "text-top" }}>{row.label}: </td>
                <td>
                  <>{row.value}</>
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
