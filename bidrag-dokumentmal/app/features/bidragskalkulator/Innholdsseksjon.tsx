import { GeneriskInnholdType } from "~/routes/bidragskalkulator.privatavtale/route";

interface IProps {
  tekst: GeneriskInnholdType;
}

export default function Innholdsseksjon({ tekst }: IProps) {
  return (
    <section>
      <h2 className="font-bold text-blue-800">{tekst.overskrift}</h2>
      <div className="flex flex-col gap-3">
        {tekst.innhold.map((linje, index) => {
          if (!linje.vis) return null;
          return (
            <div key={index} className="flex flex-col">
              <p className="font-bold text-lg">{linje.label}</p>
              <p className="text-lg ml-0">{linje.value}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
