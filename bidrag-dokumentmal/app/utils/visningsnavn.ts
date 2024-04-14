import {Rolletype, SoktAvType} from "~/types/Api";

export const erRolle = (rolle?: Rolletype, erLikRolle?: Rolletype) => rolle != undefined && erLikRolle != undefined
    && (rolle == erLikRolle || rolle == rolleTilType[erLikRolle]);
export const rolleTilVisningsnavn = {
    "BIDRAGSMOTTAKER": "Bidragsmottaker",
    "BM": "Bidragsmottaker",
    "BP": "Bidragspliktig",
    "BIDRAGSPLIKTIG": "Bidragspliktig",
    "BA": "Barn",
    "BARN": "Barn",
}

export const rolleTilType = {
    [Rolletype.BA]: "BARN",
    [Rolletype.BM]: "BIDRAGSMOTTAKER",
    [Rolletype.BP]: "BIDRAGSPLIKTIG",
    [Rolletype.FR]: "FEILREGISTRERT",
    [Rolletype.RM]: "REELMOTTAKER",
}

export const søktAvTilVisningsnavn = (søktAv?: SoktAvType) => {
    return capitalizeFirstLetter(søktAv);
}

export function capitalizeFirstLetter(str?: string) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}