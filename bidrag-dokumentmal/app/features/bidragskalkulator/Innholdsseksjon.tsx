import { GeneriskInnholdType } from "~/routes/bidragskalkulator.privatavtale/route";

interface IProps {
  tekst: GeneriskInnholdType;
}

export default function Innholdsseksjon({ tekst }: IProps) {
  return (
    <section>
      <h2 className="bold-600 text-blue-800">{tekst.overskrift}</h2>
      <div className="flex flex-col gap-3">
        {tekst.innhold.map((linje, index) => {
          if (!linje.vis) return null;
          return (
            <div key={index} className="flex flex-col">
              <dt className="bold-600 text-lg">{linje.label}</dt>
              <dd className="text-lg">{linje.value}</dd>
            </div>
          );
        })}
      </div>
    </section>
  );
}
