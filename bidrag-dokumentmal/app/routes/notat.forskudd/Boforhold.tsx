import { NotatForskuddProps, useNotat } from "~/routes/notat.forskudd/route";
import Datadisplay from "~/components/Datadisplay";
import { BoforholdBarn } from "~/types/Api";
import Person from "~/components/Person";
import { SimpleTable } from "~/components/SimpleTable";
import Sivilstand from "~/routes/notat.forskudd/Sivilstand";
import Notat from "~/components/Notat";
import elementIds from "~/utils/elementIds";

export default function Boforhold({ data }: NotatForskuddProps) {
  const { erAvslag } = useNotat();
  if (erAvslag) return null;
  return (
    <div className="soknad_parter">
      <div className={"elements_inline"}>
        <h2>Boforhold</h2>
        <a href={`#${elementIds.vedleggBoforhold}`}>
          se vedlegg nr. 1 for opplysninger fra offentlige registre
        </a>
      </div>
      <div>
        {data.boforhold.barn.map((b, i) => (
          <BoforholdHusstandsmedlem key={b.gjelder + i.toString()} data={b} />
        ))}
        <Sivilstand data={data} />
        <Notat data={data.boforhold.notat} />
      </div>
    </div>
  );
}

function BoforholdHusstandsmedlem({ data }: { data: BoforholdBarn }) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <Datadisplay
        label={data.medIBehandling ? "Søknadsbarn" : "Eget barn i husstanden"}
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
