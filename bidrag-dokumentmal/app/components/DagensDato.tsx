import { DateToDDNameYYYYString } from "~/utils/date-utils";
import {
  useNotatFelles,
  RenderMode,
} from "~/components/notat_felles/NotatContext";

export default function DagensDato() {
  const { renderMode } = useNotatFelles();
  if (renderMode == RenderMode.HTML) return null;
  return (
    <p style={{ position: "absolute", float: "left", right: 0 }}>
      {DateToDDNameYYYYString(new Date())}
    </p>
  );
}
