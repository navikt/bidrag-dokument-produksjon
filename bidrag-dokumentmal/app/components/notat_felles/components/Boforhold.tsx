import DataDescription from "~/components/DataDescription";
import {
  BoforholdBarn,
  NotatAndreVoksneIHusstanden,
  NotatMalType,
} from "~/types/Api";
import Person from "~/components/Person";
import { SimpleTable } from "~/components/SimpleTable";
import NotatBegrunnelse from "~/components/NotatBegrunnelse";
import elementIds from "~/utils/elementIds";
import tekster from "~/tekster";
import { useNotatFelles } from "~/components/notat_felles/NotatContext";
import Sivilstand from "~/components/notat_felles/components/Sivilstand";

export default function Boforhold() {
  const { erAvslag, data } = useNotatFelles();
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
        {data.type === NotatMalType.FORSKUDD && <Sivilstand />}
        {data.type !== NotatMalType.FORSKUDD && (
          <BoforholdAndreVoksneIHusstanden
            data={data.boforhold.andreVoksneIHusstanden}
          />
        )}
        <NotatBegrunnelse data={data.boforhold.begrunnelse} />
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
    <div className={"mb-medium"}>
      <h3 id={"linktilmeg"}>{tekster.titler.andreVoksneIHusstanden.tittel}</h3>
      <SimpleTable data={data.opplysningerBruktTilBeregning} />
    </div>
  );
}

function BoforholdHusstandsmedlem({ data }: { data: BoforholdBarn }) {
  return (
    <div className={"mb-medium"}>
      <DataDescription
        style={{ paddingBottom: 0, marginBottom: 0 }}
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
    </div>
  );
}
