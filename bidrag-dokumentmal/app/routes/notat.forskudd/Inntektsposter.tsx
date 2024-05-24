import Inntektspost from "~/components/Inntekspost";
import { formatPeriode } from "~/utils/date-utils";
import { formatterBeløp } from "~/utils/visningsnavn";
import { NotatInntektDto, TypeArManedsperiode } from "~/types/Api";

type InntektsposterProps = {
  periode?: TypeArManedsperiode;
  data: NotatInntektDto;
};
export default function Inntektsposter({ periode, data }: InntektsposterProps) {
  return (
    <div
      style={{
        width: "700px",
      }}
    >
      <Inntektspost
        label={"Periode"}
        value={formatPeriode(periode!.fom, periode!.til)}
      />
      {data.inntektsposter.map((d, i) => (
        <Inntektspost
          key={d.kode + i.toString()}
          label={d.visningsnavn!}
          value={formatterBeløp(d.beløp)}
        />
      ))}
      <div className="horizontal-line"></div>
    </div>
  );
}
