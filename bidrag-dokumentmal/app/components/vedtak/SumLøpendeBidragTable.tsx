import { useNotatFelles } from "~/components/notat_felles/NotatContext";
import { NotatResultatSaerbidragsberegningDto } from "~/types/Api";
import { formatterBeløpForBeregning } from "~/utils/visningsnavn";

export const SumLøpendeBidragTable = () => {
  const { data } = useNotatFelles();

  const beregnetSærbidrag = data.vedtak!
    .resultat[0] as NotatResultatSaerbidragsberegningDto;

  const delberegning = beregnetSærbidrag.delberegningSumLøpendeBidrag!;
  const colPaddingClassname = "px-1";
  const bottomRowBorder =
    "border-t border-solid border-black border-b-2 border-l-0 border-r-0";
  return (
    <div>
      <h4>{"BPs løpende bidrag"}</h4>
      <table
        className="table-auto border-collapse text-left border-spacing-2"
        style={{ paddingBottom: "5px", width: "600px" }}
      >
        <thead>
          <tr>
            <th className="pr-1">{"Barn"}</th>
            <th className={`${colPaddingClassname}`}>{"Saksnummer"}</th>
            <th className={`${colPaddingClassname} text-right`}>
              {"Løpende bidrag"}
            </th>
            <th className={`${colPaddingClassname} text-right`}>
              {"Samværsfradrag"}
            </th>
            <th className={`${colPaddingClassname} text-right`}>
              {"Beregnet bidrag"}
            </th>
            <th className={`${colPaddingClassname} text-right`}>
              {"Faktisk bidrag"}
            </th>
            <th className={`${colPaddingClassname} text-right`}>
              {"Resultat"}
            </th>
          </tr>
        </thead>
        <tbody>
          {delberegning.beregningPerBarn.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="pr-4">{row.personidentBarn}</td>
              <td className={`${colPaddingClassname}`}>{row.saksnummer}</td>
              <td className={`${colPaddingClassname} text-right`}>
                {formatterBeløpForBeregning(row.løpendeBeløp, true)}
              </td>
              <td className={`${colPaddingClassname} text-right`}>
                {formatterBeløpForBeregning(row.samværsfradrag, true)}
              </td>
              <td className={`${colPaddingClassname} text-right`}>
                {formatterBeløpForBeregning(row.beregnetBeløp, true)}
              </td>
              <td className={`${colPaddingClassname} text-right`}>
                {formatterBeløpForBeregning(row.faktiskBeløp, true)}
              </td>

              <td className={`${colPaddingClassname} text-right`}>
                {formatterBeløpForBeregning(row.resultat, true)}
              </td>
            </tr>
          ))}
          <tr>
            <td className={`text-right ${bottomRowBorder}`}></td>
            <td className={`text-right ${bottomRowBorder}`}></td>
            <td className={`text-right ${bottomRowBorder}`}></td>
            <td className={`text-right ${bottomRowBorder}`}></td>
            <td className={`text-right ${bottomRowBorder}`}></td>
            <td className={`text-right ${bottomRowBorder}`}>
              {"Sum løpende bidrag:"}
            </td>
            <td
              className={`${colPaddingClassname} text-right ${bottomRowBorder}`}
            >
              {formatterBeløpForBeregning(delberegning.sumLøpendeBidrag, true)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
