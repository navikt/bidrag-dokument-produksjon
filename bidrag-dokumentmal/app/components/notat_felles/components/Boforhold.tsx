import DataDescription from "~/components/DataDescription";
import { BoforholdBarn, NotatAndreVoksneIHusstanden } from "~/types/Api";
import Person from "~/components/Person";
import { SimpleTable } from "~/components/SimpleTable";
import Notat from "~/components/Notat";
import elementIds from "~/utils/elementIds";
import tekster from "~/tekster";
import {
  NotatDataProps,
  useNotatFelles,
} from "~/components/notat_felles/NotatContext";
import Sivilstand from "~/components/notat_felles/components/Sivilstand";

export default function Boforhold({ data }: NotatDataProps) {
  const { erAvslag } = useNotatFelles();
  if (erAvslag) return null;
  return (
    <div className="soknad_parter section">
      <div className={"elements_inline"}>
        <h2>{tekster.titler.boforhold.tittel}</h2>
        <a href={`#${elementIds.vedleggBoforhold}`}>
          {tekster.vedleggLenke.replace("{}", "1")}
        </a>
      </div>
      <div>
        {data.boforhold.barn.map((b, i) => (
          <BoforholdHusstandsmedlem key={b.gjelder + i.toString()} data={b} />
        ))}
        <Sivilstand data={data} />
        <BoforholdAndreVoksneIHusstanden
          data={data.boforhold.andreVoksneIHusstanden}
        />
        <Notat data={data.boforhold.notat} />
      </div>
    </div>
  );
}
function BoforholdAndreVoksneIHusstanden({
  data,
}: {
  data?: NotatAndreVoksneIHusstanden;
}) {
  if (!data) return;
  return (
    <div>
      <h3 id={"linktilmeg"}>{tekster.titler.andreVoksneIHusstanden.tittel}</h3>
      <SimpleTable data={data.opplysningerBruktTilBeregning} />
      <div
        className="horizontal-line"
        style={{ pageBreakAfter: "avoid" }}
      ></div>
    </div>
  );
}

function BoforholdHusstandsmedlem({ data }: { data: BoforholdBarn }) {
  return (
    <div>
      <DataDescription
        label={
          data.medIBehandling
            ? tekster.titler.boforhold.søknadsbarn
            : tekster.titler.boforhold.egetBarnIHusstanden
        }
        value={
          <Person
            fødselsdato={data.gjelder.fødselsdato!}
            navn={data.gjelder.navn!}
          />
        }
      />
      <SimpleTable data={data.opplysningerBruktTilBeregning} />
      <div
        className="horizontal-line"
        style={{ pageBreakAfter: "avoid" }}
      ></div>
    </div>
  );
}
