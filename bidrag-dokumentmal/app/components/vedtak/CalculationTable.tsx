import React, { ReactElement, CSSProperties } from "react";
//file:@ts-ignore
interface CalculationTableData {
  label: string;
  value?: string | number | ReactElement;
  result: string | number | ReactElement;
}

interface CalculationTableProps {
  data: CalculationTableData[]; // Array of data objects
  title?: string;
  result?: {
    label: string;
    value: string | number | ReactElement;
  };
  message?: string | ReactElement;
  width?: string;
  tableWidth?: string;
  labelColWidth?: string;
  valueColWidth?: string;
  resultColWidth?: string;
  className?: string;
  style?: CSSProperties;
}

export const CalculationTabell: React.FC<CalculationTableProps> = ({
  data,
  title,
  result,
  message,
  width,
  tableWidth,
  labelColWidth,
  resultColWidth,
  valueColWidth,
  style,
  className,
}) => {
  const bottomRowBorder =
    "border-t border-solid border-black border-b-2 border-l-0 border-r-0";
  return (
    <div className={className} style={{ width: width, ...style }}>
      {title && <h4>{title}</h4>}
      <table
        className="table-auto border-collapse"
        style={{ width: tableWidth }}
      >
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td style={{ width: labelColWidth ?? "180px" }}>{row.label}</td>
              {row.value ? (
                <td
                  className={"text-right"}
                  style={{ width: valueColWidth ?? "200px" }}
                >
                  {row.value}
                </td>
              ) : (
                <td style={{ width: valueColWidth ?? "200px" }}></td>
              )}
              <td
                className={"text-right"}
                style={{ width: resultColWidth ?? "100px" }}
              >
                {row.result}
              </td>
            </tr>
          ))}
          {result && (
            <tr className={`${bottomRowBorder}`}>
              <td
                className={`border-t ${bottomRowBorder}`}
                style={{ width: labelColWidth ?? "180px" }}
              >
                {result.label}
              </td>
              <td
                className={`text-right ${bottomRowBorder}`}
                style={{ width: valueColWidth ?? "200px" }}
              ></td>
              <td
                className={`text-right ${bottomRowBorder}`}
                style={{ width: resultColWidth ?? "100px" }}
              >
                {result.value}
              </td>
            </tr>
          )}
          {message && (
            <tr className="mt-1">
              <td colSpan={3}>{message}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

interface MathDivisionProps {
  negativeValue?: boolean;
  top: string;
  bottom: number | string;
}

export const MathDivision: React.FC<MathDivisionProps> = ({
  negativeValue,
  top,
  bottom,
}) => {
  return (
    <math>
      <mrow>
        {negativeValue && <mi>-</mi>}
        <mn>{top}</mn>
        <mo>&#247;</mo> {/* Multiplication symbol */}
        <mn>{bottom}</mn>
      </mrow>
    </math>
  );
};

export const MathValue: React.FC<{
  value: string | number;
  negativeValue?: boolean;
}> = ({ value, negativeValue }) => {
  return (
    <math>
      {negativeValue && <mi>-</mi>}

      <mn>{value}</mn>
    </math>
  );
};
interface MathMultiplicationProps {
  negativeValue?: boolean;
  left: string;
  right: string | number;
}

export const MathMultiplication: React.FC<MathMultiplicationProps> = ({
  negativeValue,
  left,
  right,
}) => {
  return (
    <math>
      <mrow>
        {negativeValue && <mi>-</mi>}
        <mn>{left}</mn>
        <mo>&#xD7;</mo> {/* Multiplication symbol */}
        <mn>{right}</mn>
      </mrow>
    </math>
  );
};
