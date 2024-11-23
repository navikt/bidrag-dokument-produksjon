import React from "react";

export interface DataViewTableData {
  label: string;
  labelBold?: boolean;
  value?: string | number | React.ReactNode;
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
  gap,
  width,
  className,
}) => {
  return (
    <div className={className} style={{ width: width }}>
      {title && <h4>{title}</h4>}
      <table style={{ borderSpacing: 0 }}>
        <tbody>
          {data.map((row, rowIndex) => (
            <>
              <tr key={rowIndex + "-" + row.value}>
                <td
                  style={{
                    verticalAlign: "text-top",
                    width: labelColWidth,
                    paddingRight: gap,
                    fontWeight: row.labelBold ? "bold" : "normal",
                  }}
                >
                  {row.label}:{" "}
                </td>
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
