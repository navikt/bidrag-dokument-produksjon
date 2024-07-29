import { createContext, PropsWithChildren, useContext } from "react";
import {
  NotatDto,
  NotatMalType,
  Vedtakstype,
  Rolletype,
  PersonNotatDto,
} from "~/types/Api";
import { konverterRolletype, erRolle } from "~/utils/converter-utils";

export enum RenderMode {
  PDF,
  HTML,
}
interface INotatContext {
  erAvslag: boolean;
  erOpphør: boolean;
  harFlereEnnEttSøknadsbarn: boolean;
  bidragsmottaker: PersonNotatDto;
  bidragspliktig?: PersonNotatDto;
  søknadsbarn: PersonNotatDto[];
  data: NotatDto;
  type: NotatMalType;
  renderMode: RenderMode;
}
export const NotatContext = createContext<INotatContext | null>(null);
export function useNotatFelles(): INotatContext {
  return useContext(NotatContext) as INotatContext;
}
export type NotatDataProps = { data: NotatDto; renderMode: RenderMode };

export function NotatProvider({
  children,
  data,
  renderMode,
}: PropsWithChildren<NotatDataProps>) {
  const dataCorrected = {
    ...data,
    roller: data.roller.map((d) => ({
      ...d,
      rolle: konverterRolletype(d.rolle),
    })),
  };
  return (
    <NotatContext.Provider
      value={{
        renderMode,
        data: dataCorrected,
        type: dataCorrected.type,
        bidragsmottaker: dataCorrected.roller.find(erRolle(Rolletype.BM))!,
        bidragspliktig: dataCorrected.roller.find(erRolle(Rolletype.BP)),
        søknadsbarn: dataCorrected.roller.filter(erRolle(Rolletype.BA)),
        harFlereEnnEttSøknadsbarn:
          dataCorrected.roller.filter(erRolle(Rolletype.BA)).length > 1,
        erAvslag: dataCorrected.behandling.avslag != null,
        erOpphør: dataCorrected.behandling.vedtakstype == Vedtakstype.OPPHOR,
      }}
    >
      {children}
    </NotatContext.Provider>
  );
}
