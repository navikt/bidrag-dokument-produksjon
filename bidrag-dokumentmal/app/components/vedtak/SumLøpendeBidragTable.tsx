import { useNotatFelles } from "~/components/notat_felles/NotatContext";
import { NotatResultatSaerbidragsberegningDto } from "~/types/Api";
import { formatterBeløpForBeregning } from "~/utils/visningsnavn";
import { calculationTableBottomBorder } from "~/utils/stylingUtils";
import tekster from "~/tekster";

export const SumLøpendeBidragTable = () => {
  const { data } = useNotatFelles();

  const beregnetSærbidrag = data.vedtak!
    .resultat[0] as NotatResultatSaerbidragsberegningDto;

  const delberegning = beregnetSærbidrag.delberegningSumLøpendeBidrag!;
  const colPaddingClassname = "px-1";
  return (
    <div>
      <h4>{`${tekster.begreper.bidragspliktiges} løpende bidrag`}</h4>
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
            <td className={`text-right ${calculationTableBottomBorder}`}></td>
            <td className={`text-right ${calculationTableBottomBorder}`}></td>
            <td className={`text-right ${calculationTableBottomBorder}`}></td>
            <td className={`text-right ${calculationTableBottomBorder}`}></td>
            <td className={`text-right ${calculationTableBottomBorder}`}></td>
            <td className={`text-right ${calculationTableBottomBorder}`}>
              {"Sum løpende bidrag:"}
            </td>
            <td
              className={`${colPaddingClassname} text-right ${calculationTableBottomBorder}`}
            >
              {formatterBeløpForBeregning(delberegning.sumLøpendeBidrag, true)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
