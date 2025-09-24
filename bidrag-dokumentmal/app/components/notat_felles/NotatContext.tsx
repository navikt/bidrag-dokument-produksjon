import { createContext, PropsWithChildren, useContext } from "react";
import {
  NotatMalType,
  Vedtakstype,
  Rolletype,
  VedtakNotatDto,
  DokumentmalPersonDto,
} from "~/types/Api";
import { konverterRolletype, erRolle } from "~/utils/converter-utils";
import { ThemeProvider, Styling } from "~/components/notat_felles/ThemeContext";
import { DokumentFellesProvider } from "~/components/vedtak_felles/FellesContext";
export enum RenderPDFVersion {
  V1 = "V1",
  V2 = "V2",
}
export enum RenderMode {
  PDF,
  HTML,
}
interface INotatContext {
  erAvslag: boolean;
  erOpphør: boolean;
  harFlereEnnEttSøknadsbarn: boolean;
  bidragsmottaker: DokumentmalPersonDto;
  bidragspliktig?: DokumentmalPersonDto;
  søknadsbarn: DokumentmalPersonDto[];
  data: VedtakNotatDto;
  type: NotatMalType;
  renderMode: RenderMode;
  renderPDFVersion: RenderPDFVersion;
}
export const NotatContext = createContext<INotatContext | null>(null);
export function useNotatFelles(): INotatContext {
  return useContext(NotatContext) as INotatContext;
}
export type NotatDataProps = {
  styling: Styling;
  data: VedtakNotatDto;
  renderMode: RenderMode;
  renderPDFVersion: RenderPDFVersion;
};

export function NotatProvider({
  styling,
  children,
  data,
  renderMode,
  renderPDFVersion,
}: PropsWithChildren<NotatDataProps>) {
  const dataCorrected = {
    ...data,
    roller: data.roller.map((d) => ({
      ...d,
      rolle: konverterRolletype(d.rolle),
    })),
  };
  return (
    <ThemeProvider styling={styling}>
      <DokumentFellesProvider styling={styling} notat={data}>
        <NotatContext.Provider
          value={{
            renderMode,
            renderPDFVersion,
            data: dataCorrected,
            type: dataCorrected.type,
            bidragsmottaker: dataCorrected.roller.find(erRolle(Rolletype.BM))!,
            bidragspliktig: dataCorrected.roller.find(erRolle(Rolletype.BP)),
            søknadsbarn: dataCorrected.roller.filter(erRolle(Rolletype.BA)),
            harFlereEnnEttSøknadsbarn:
              dataCorrected.roller.filter(erRolle(Rolletype.BA)).length > 1,
            erAvslag: dataCorrected.behandling.avslag != null,
            erOpphør:
              dataCorrected.behandling.vedtakstype == Vedtakstype.OPPHOR,
          }}
        >
          {children}
        </NotatContext.Provider>
      </DokumentFellesProvider>
    </ThemeProvider>
  );
}
