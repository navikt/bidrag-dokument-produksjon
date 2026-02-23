import React from "react";

export interface DataViewTableData {
  label?: string;
  labelBold?: boolean;
  value?: string | number | React.ReactNode;
  result?: string | number | React.ReactNode;
  additionalInfo?: string | number;
}

interface DataViewTableProps {
  data: DataViewTableData[]; // Array of data objects
  title?: string;
  width?: string;
  labelColWidth?: string;
  gap?: string;
  className?: string;
}

export const DataViewTable: React.FC<DataViewTableProps> = ({
  data,
  title,
  labelColWidth,
  gap = "5px",
  width,
  className,
}) => {
  const harResultat = data.some((d) => d.result);
  return (
    <div className={className} style={{ width: width }}>
      {title && <h4>{title}</h4>}
      <table className="w-full" style={{ borderCollapse: "collapse" }}>
        <tbody>
          {data.map((row, rowIndex) => (
            <React.Fragment
              key={rowIndex + "-" + row.value + "-" + title + "-" + row.label}
            >
              <tr>
                {row.label && (
                  <th
                    style={{
                      width: labelColWidth,
                      paddingRight: gap,
                      fontWeight: row.labelBold ? "bold" : "normal",
                      textAlign: "left",
                      verticalAlign: "top",
                    }}
                  >
                    {row.label}:
                  </th>
                )}
                <td style={{ verticalAlign: "top" }}>
                  <>{row.value}</>
                  {harResultat && row.result && (
                    <span style={{ marginLeft: "4px" }}>= {row.result}</span>
                  )}
                </td>
              </tr>
              {row.additionalInfo && (
                <tr>
                  <td colSpan={row.label ? 2 : 1}>{row.additionalInfo}</td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
