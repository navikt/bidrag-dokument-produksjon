import { Notat as NotatData } from "~/types/Api";
import Datadisplay from "~/components/Datadisplay";

type NotatProps = {
  data: NotatData;
};
export default function Notat({ data }: NotatProps) {
  return (
    <div
      style={{
        maxWidth: "44rem",
        overflow: "none",
        marginTop: "14px",
      }}
    >
      <Datadisplay
        label={"Begrunnelse (med i vedtaket)"}
        value={data.medIVedtaket}
      />
      <Datadisplay
        label={"Begrunnelse (kun for intern notat)"}
        value={data.intern}
      />
    </div>
  );
}
