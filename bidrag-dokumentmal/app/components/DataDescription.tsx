import { ReactElement } from "react";

type DatadisplayProps = {
  label: string;
  value: ReactElement | string | undefined | number;
};
export default function DataDescription({ label, value }: DatadisplayProps) {
  return (
    <dl className="datarow">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </dl>
  );
}
