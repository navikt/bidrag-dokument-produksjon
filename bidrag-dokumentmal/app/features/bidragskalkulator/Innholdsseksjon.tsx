import { GeneriskInnholdType } from "~/routes/bidragskalkulator.privatavtale/route";

interface IProps {
  tekst: GeneriskInnholdType;
}

export default function Innholdsseksjon({ tekst }: IProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-blue-800 mb-medium">
        {tekst.overskrift}
      </h2>
      {tekst.innhold.map((linje, index) => {
        if (!linje.vis) return null;
        return (
          <div key={index} className="flex flex-col mb-10">
            <dt className="font-bold">{linje.label}</dt>
            <dd style={{ margin: 0 }}>{linje.value}</dd>
          </div>
        );
      })}
    </section>
  );
}
