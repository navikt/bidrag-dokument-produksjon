import { ReactElement } from "react";

type DatadisplayProps = {
  label: string;
  value: ReactElement | string | undefined | number;
};
export default function Datadisplay({ label, value }: DatadisplayProps) {
  return (
    <dl className="datarow">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </dl>
  );
}
