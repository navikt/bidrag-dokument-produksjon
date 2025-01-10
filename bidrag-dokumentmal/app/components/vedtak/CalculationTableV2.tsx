import React, { ReactElement, CSSProperties } from "react";
import tekster from "~/tekster";
import {
  CommonTable,
  TableColumn,
  RowContent,
  TableHeader,
} from "~/components/CommonTable";
//file:@ts-ignore
interface CalculationTableData {
  label: RowContent;
  calculation?: RowContent;
  value: RowContent;
}

interface CalculationTableProps {
  data: CalculationTableData[]; // Array of data objects
  title?: string;
  result?: {
    label: RowContent;
    value: RowContent;
  };
  message?: string | ReactElement;
  width?: string;
  simpleStyling?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const CalculationTabellV2: React.FC<CalculationTableProps> = ({
  data,
  result,
  simpleStyling,
  width,
}) => {
  const harBeregning = data.some((d) => d.calculation);

  return (
    <CommonTable
      layoutAuto
      size={simpleStyling ? "small" : "large"}
      width={width}
      data={{
        headers: [
          {
            name: tekster.tabell.felles.beskrivelse,
            width: "250px",
          },
          harBeregning && {
            name: tekster.tabell.felles.beregning,
            width: "250px",
          },
          {
            name: tekster.tabell.felles.beløp,
            width: "100px",
            alignRight: true,
          },
        ].filter((d) => typeof d != "boolean") as TableHeader[],
        rows: data
          .map((content) => ({
            columns: [
              {
                content: content.label,
              },
              harBeregning && {
                content: content.calculation,
              },
              {
                alignRight: true,
                content: content.value,
              },
            ].filter((d) => typeof d != "boolean") as TableColumn[],
          }))
          .concat(
            result
              ? [
                  {
                    columns: [
                      {
                        content: result!.label,
                        colSpan: harBeregning ? 2 : 1,
                        labelBold: true,
                      } as TableColumn,
                      {
                        alignRight: true,
                        content: result!.value,
                      } as TableColumn,
                    ],
                  },
                ]
              : [],
          ),
      }}
    />
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
