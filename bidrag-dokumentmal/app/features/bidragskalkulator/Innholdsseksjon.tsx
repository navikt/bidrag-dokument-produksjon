import { GeneriskInnholdType } from "~/routes/bidragskalkulator.privatavtale/route";

interface IProps {
  tekst: GeneriskInnholdType;
}

export default function Innholdsseksjon({ tekst }: IProps) {
  return (
    <section>
      <h2>{tekst.overskrift}</h2>
      <div className="flex flex-col gap-3">
        {tekst.innhold.map((linje, index) => {
          if (!linje.vis) return null;

          if (linje.vis && linje.type === "heading") {
            return <h3 key={index}>{linje.label}</h3>;
          }

          return (
            <div key={index} className="flex flex-col">
              <dt>{linje.label}</dt>
              <dd>{linje.value}</dd>
            </div>
          );
        })}
      </div>
    </section>
  );
}
