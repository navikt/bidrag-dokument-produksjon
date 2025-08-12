import "../../style/style.css";

import { parseRequestAction } from "~/routes/common";
import { ActionFunctionArgs } from "@remix-run/node";
import HeaderFooter from "~/features/bidragskalkulator/HeaderFooterKalkulator";
import NavLogo from "~/components/NavLogo";
import { useActionData } from "@remix-run/react";
import Innholdsseksjon from "~/features/bidragskalkulator/Innholdsseksjon";
import {
  Bidragstype,
  IPerson,
  IBarn,
  Oppgjørsform,
  IAndreBestemmelser,
  IVedlegg,
  tilknyttetAvtaleVedleggTekster,
  annenDokumentasjonTekster,
  oppgjørsformTekster,
  bidragstypeTekster,
  språkkodeTilSpråkType,
  NavSkjemaId,
  PrivatAvtaleDto,
} from "~/types/bidragskalkulator";
import { hentTekst, jaNeiTekster, SpråkType } from "~/utils/oversettelser";
import Underskrifter from "~/features/bidragskalkulator/Underskrifter";

// Mock data for development
const mockRequest: PrivatAvtaleDto = {
  språk: "NB",
  innhold: "Dette er en mock av data fra bidragskalkulatoren",
  bidragsmottaker: {
    fornavn: "Kristian",
    etternavn: "Etternavnesen",
    fodselsnummer: "12345678901",
  },
  bidragspliktig: {
    fornavn: "Kristine",
    etternavn: "Etternavnesen",
    fodselsnummer: "12345678901",
  },
  barn: [
    {
      fornavn: "Ola",
      etternavn: "Etternavnesen",
      fodselsnummer: "12345678901",
      sumBidrag: 5000,
    },
    {
      fornavn: "Ola2",
      etternavn: "Etternavnesen2",
      fodselsnummer: "12345678901",
      sumBidrag: 5000,
    },
  ],
  fraDato: "01.01.2025",
  nyAvtale: true,
  oppgjorsform: "PRIVAT",
  andreBestemmelser: {
    harAndreBestemmelser: true,
    beskrivelse: "Dette er en beskrivelse av andre bestemmelser.",
  },
  vedlegg: {
    tilknyttetAvtale: "SENDES_MED_SKJEMA",
    annenDokumentasjon: "INGEN_EKSTRA_DOKUMENTASJON",
  },
  navSkjemaId: NavSkjemaId.AVTALE_OM_BARNEBIDRAG_OVER_18,
};

export function meta() {
  return [
    { title: "Privat avtale bidragskalkulator" },
    { name: "description", content: "Privat avtale bidragskalkulator" },
    { property: "author", content: "bidrag-dokument-produksjon" },
    { property: "subject", content: "Privat avtale bidragskalkulator" },
  ];
}

export async function action(args: ActionFunctionArgs) {
  return await parseRequestAction(args);
}

export default function PrivatAvtaleBidragskalkulator() {
  const actionData = useActionData<{ data: PrivatAvtaleDto }>();
  const response =
    process.env.NODE_ENV === "development" ? { data: mockRequest } : actionData;

  if (response === undefined) {
    return <div>Oops</div>;
  }

  const { data } = response;
  const språk = språkkodeTilSpråkType(data.språk) ?? "nb";
  const innhold = hentTekst(språk, innholdsseksjonTekst);
  const tekster = hentTekst(språk, tekst);

  return (
    <div id="privat_avtale">
      <HeaderFooter språk={språk} />
      <div className="container page bidragskalkulatorContainer">
        <NavLogo />
        <h1>{tekster.tittel}</h1>
        <p>{data.navSkjemaId}</p>
        <p>{data.innhold}</p>
        <div className="flex flex-col gap-4">
          <Innholdsseksjon
            tekst={innhold.opplysningerPerson("PLIKTIG", data.bidragspliktig)}
          />
          <Innholdsseksjon
            tekst={innhold.opplysningerPerson("MOTTAKER", data.bidragsmottaker)}
          />
          <Innholdsseksjon
            tekst={innhold.barnOgBidrag(data.barn, data.fraDato)}
          />
          <Innholdsseksjon
            tekst={innhold.oppgjør(data.nyAvtale, data.oppgjorsform)}
          />
          <Innholdsseksjon
            tekst={innhold.andreBestemmelser(data.andreBestemmelser)}
          />
          <Innholdsseksjon tekst={innhold.vedlegg(data.vedlegg)} />

          <Underskrifter språk={språk} />
        </div>
      </div>
    </div>
  );
}

const tekst = {
  tittel: {
    nb: "Privat avtale om barnebidrag",
    nn: "Privat avtale om barnebidrag",
    en: "Private agreement on child support",
  },
};

const innholdsseksjonTekst = {
  opplysningerPerson: (bidragstype: Bidragstype, person: IPerson) => ({
    nb: {
      overskrift: `Opplysninger om ${bidragstypeTekster[bidragstype].nb.toLowerCase()}`,
      innhold: [
        { label: "Fornavn", value: person.fornavn, vis: true, type: "text" },
        {
          label: "Etternavn",
          value: person.etternavn,
          vis: true,
          type: "text",
        },
        {
          label: `Har ${bidragstypeTekster[bidragstype].nb.toLowerCase()} norsk fødselsnummer eller D-nummer?`,
          value: person.fodselsnummer
            ? jaNeiTekster.JA.nb
            : jaNeiTekster.NEI.nb,
          vis: true,
          type: "text",
        },
        ...(person.fodselsnummer
          ? [
              {
                label: "Fødselsnummer",
                value: person.fodselsnummer,
                vis: true,
                type: "text",
              },
            ]
          : []),
      ],
    },
    nn: {
      overskrift: `Opplysningar om ${bidragstypeTekster[bidragstype].nn.toLowerCase()}`,
      innhold: [
        { label: "Fornamn", value: person.fornavn, vis: true, type: "text" },
        {
          label: "Etternamn",
          value: person.etternavn,
          vis: true,
          type: "text",
        },
        {
          label: `Har ${bidragstypeTekster[bidragstype].nn.toLowerCase()} norsk fødselsnummer eller D-nummer?`,
          value: person.fodselsnummer
            ? jaNeiTekster.JA.nn
            : jaNeiTekster.NEI.nn,
          vis: true,
          type: "text",
        },
        ...(person.fodselsnummer
          ? [
              {
                label: "Fødselsnummer",
                value: person.fodselsnummer,
                vis: true,
                type: "text",
              },
            ]
          : []),
      ],
    },
    en: {
      overskrift: `Information about ${bidragstypeTekster[bidragstype].en.toLowerCase()}`,
      innhold: [
        { label: "First name", value: person.fornavn, vis: true, type: "text" },
        {
          label: "Last name",
          value: person.etternavn,
          vis: true,
          type: "text",
        },
        {
          label: `Does the ${bidragstypeTekster[bidragstype].en.toLowerCase()} have a Norwegian National ID or D-number?`,
          value: person.fodselsnummer ? jaNeiTekster.JA.en : jaNeiTekster.JA.en,
          vis: true,
          type: "text",
        },
        ...(person.fodselsnummer
          ? [
              {
                label: "Norwegian national identification number / D number",
                value: person.fodselsnummer,
                vis: true,
                type: "text",
              },
            ]
          : []),
      ],
    },
  }),
  barnOgBidrag: (barn: IBarn[], fraDato: string) => ({
    nb: {
      overskrift: "Opplysninger om barn og bidrag",
      innhold: barn.flatMap((b, i) => [
        {
          label: `Barn ${i + 1}`,
          value: "",
          vis: barn.length > 1,
          type: "heading",
        },
        { label: "Fornavn", value: b.fornavn, vis: true, type: "text" },
        { label: "Etternavn", value: b.etternavn, vis: true, type: "text" },
        {
          label: "Fødselsnummer eller D-nummer",
          value: b.fodselsnummer,
          vis: true,
          type: "text",
        },
        {
          label: "Beløp barnebidrag",
          value: `${b.sumBidrag},-`,
          vis: true,
          type: "text",
        },
        {
          label: "Fra dato (dd.mm.åååå)",
          value: fraDato,
          vis: true,
          type: "text",
        },
      ]),
    },
    nn: {
      overskrift: "Opplysningar om barn og bidrag",
      innhold: barn.flatMap((b, i) => [
        {
          label: `Barn ${i + 1}`,
          value: "",
          vis: barn.length > 1,
          type: "heading",
        },
        { label: "Fornamn", value: b.fornavn, vis: true, type: "text" },
        { label: "Etternamn", value: b.etternavn, vis: true, type: "text" },
        {
          label: "Fødselsnummer eller D-nummer",
          value: b.fodselsnummer,
          vis: true,
          type: "text",
        },
        {
          label: "Beløp barnebidrag",
          value: `${b.sumBidrag},-`,
          vis: true,
          type: "text",
        },
        {
          label: "Frå dato (dd.mm.åååå)",
          value: fraDato,
          vis: true,
          type: "text",
        },
      ]),
    },
    en: {
      overskrift: "Information about child and support",
      innhold: barn.flatMap((b, i) => [
        {
          label: `Child ${i + 1}`,
          value: "",
          vis: barn.length > 1,
          type: "heading",
        },
        { label: "First name", value: b.fornavn, vis: true, type: "text" },
        { label: "Last name", value: b.etternavn, vis: true, type: "text" },
        {
          label: "Norwegian national identification number / D number",
          value: b.fodselsnummer,
          vis: true,
          type: "text",
        },
        {
          label: "Child support amount",
          value: `${b.sumBidrag},-`,
          vis: true,
          type: "text",
        },
        {
          label: "From date (dd.mm.yyyy)",
          value: fraDato,
          vis: true,
          type: "text",
        },
      ]),
    },
  }),
  oppgjør: (nyAvtale: boolean, oppgjørsform: Oppgjørsform) => ({
    nb: {
      overskrift: "Oppgjør",
      innhold: [
        {
          label: "Er dette en ny avtale?",
          value: nyAvtale ? jaNeiTekster.JA.nb : jaNeiTekster.NEI.nb,
          vis: true,
          type: "text",
        },
        {
          label: "Hvilken oppgjørsform ønskes?",
          value: oppgjørsformTekster[oppgjørsform].nb,
          vis: true,
          type: "text",
        },
      ],
    },
    nn: {
      overskrift: "Oppgjer",
      innhold: [
        {
          label: "Er dette ein ny avtale?",
          value: nyAvtale ? jaNeiTekster.JA.nn : jaNeiTekster.NEI.nn,
          vis: true,
          type: "text",
        },
        {
          label: "Kva for oppgjerform ønskjast?",
          value: oppgjørsformTekster[oppgjørsform].nn,
          vis: true,
          type: "text",
        },
      ],
    },
    en: {
      overskrift: "Settlement",
      innhold: [
        {
          label: "Is this a new agreement?",
          value: nyAvtale ? jaNeiTekster.JA.en : jaNeiTekster.JA.en,
          vis: true,
          type: "text",
        },
        {
          label: "Which settlement method is desired?",
          value: oppgjørsformTekster[oppgjørsform].en,
          vis: true,
          type: "text",
        },
      ],
    },
  }),
  andreBestemmelser: (andreBestemmelser: IAndreBestemmelser) => ({
    nb: {
      overskrift: "Andre bestemmelser",
      innhold: [
        {
          label: "Er det andre bestemmelser tilknyttet avtalen?",
          value: andreBestemmelser.harAndreBestemmelser
            ? jaNeiTekster.JA.nb
            : jaNeiTekster.NEI.nb,
          vis: true,
          type: "text",
        },
        {
          label: "Andre bestemmelser tilknyttet avtalen",
          value: andreBestemmelser.beskrivelse,
          vis:
            (andreBestemmelser.harAndreBestemmelser &&
              andreBestemmelser.beskrivelse) ??
            false,
          type: "text",
        },
      ],
    },
    nn: {
      overskrift: "Andre føresegner",
      innhold: [
        {
          label: "Er det andre føresegner knytt til avtalen?",
          value: andreBestemmelser.harAndreBestemmelser
            ? jaNeiTekster.JA.nn
            : jaNeiTekster.NEI.nn,
          vis: true,
          type: "text",
        },
        {
          label: "Andre føresegner knytt til avtalen",
          value: andreBestemmelser.harAndreBestemmelser
            ? jaNeiTekster.JA.en
            : jaNeiTekster.NEI.en,
          vis:
            (andreBestemmelser.harAndreBestemmelser &&
              andreBestemmelser.beskrivelse) ??
            false,
          type: "text",
        },
      ],
    },
    en: {
      overskrift: "Other provisions",
      innhold: [
        {
          label: "Are there other provisions related to the agreement?",
          value: andreBestemmelser.harAndreBestemmelser
            ? jaNeiTekster.JA.en
            : jaNeiTekster.JA.en,
          vis: true,
          type: "text",
        },
        {
          label: "Other provisions related to the agreement",
          value: andreBestemmelser.harAndreBestemmelser,
          vis:
            (andreBestemmelser.harAndreBestemmelser &&
              andreBestemmelser.beskrivelse) ??
            false,
          type: "text",
        },
      ],
    },
  }),
  vedlegg: (vedlegg: IVedlegg) => ({
    nb: {
      overskrift: "Vedlegg",
      innhold: [
        {
          label: "Andre bestemmelser tilknyttet avtale",
          value: tilknyttetAvtaleVedleggTekster[vedlegg.tilknyttetAvtale].nb,
          vis: true,
          type: "text",
        },
        {
          label: "Annen dokumentasjon",
          value: annenDokumentasjonTekster[vedlegg.annenDokumentasjon].nb,
          vis: true,
          type: "text",
        },
      ],
    },
    nn: {
      overskrift: "Vedlegg",
      innhold: [
        {
          label: "Andre føresegner knytt til avtale",
          value: tilknyttetAvtaleVedleggTekster[vedlegg.tilknyttetAvtale].nn,
          vis: true,
          type: "text",
        },
        {
          label: "Anna dokumentasjon",
          value: annenDokumentasjonTekster[vedlegg.annenDokumentasjon].nn,
          vis: true,
          type: "text",
        },
      ],
    },
    en: {
      overskrift: "Attachments",
      innhold: [
        {
          label: "Other provisions related to the agreement",
          value: tilknyttetAvtaleVedleggTekster[vedlegg.tilknyttetAvtale].en,
          vis: true,
          type: "text",
        },
        {
          label: "Other documentation",
          value: annenDokumentasjonTekster[vedlegg.annenDokumentasjon].en,
          vis: true,
          type: "text",
        },
      ],
    },
  }),
};

export type GeneriskInnholdType = ReturnType<
  (typeof innholdsseksjonTekst)[keyof typeof innholdsseksjonTekst]
>[SpråkType];
