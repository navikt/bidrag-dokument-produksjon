import { IBarn } from "~/routes/bidragskalkulator.privatavtale/route";

interface IProps {
  gjeldendeBarn: IBarn[];
  fraDato: string;
}

export const OpplysningerBarnOgBidrag = ({
  gjeldendeBarn,
  fraDato,
}: IProps) => (
  <div>
    <h2>Opplysninger om barn og bidrag</h2>
    <div>
      {gjeldendeBarn.map((barn, index) => (
        <div key={index}>
          <p className={"font-bold"}>Fullt navn</p>
          <p>{barn.fulltNavn}</p>
          <p className={"font-bold"}>Fødselsnummer eller D-nummer</p>
          <p>{barn.fodselsnummer}</p>
          <p className={"font-bold"}>Beløp barnebidrag</p>
          <p>{barn.sumBidrag},-</p>
          <p className={"font-bold"}>Fra dato (dd.mm.åååå)</p>
          <p>{fraDato}</p>
        </div>
      ))}
    </div>
  </div>
);
