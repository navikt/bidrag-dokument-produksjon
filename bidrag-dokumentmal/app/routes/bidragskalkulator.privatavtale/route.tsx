import "../../style/style.css";

import { parseRequestAction } from "~/routes/common";
import { ActionFunctionArgs } from "@remix-run/node";
import HeaderFooter from "~/features/bidragskalkulator/HeaderFooterKalkulator";
import NavLogo from "~/components/NavLogo";
import { useActionData } from "@remix-run/react";
import Innholdsseksjon from "~/features/bidragskalkulator/Innholdsseksjon";
import {
  PrivatAvtaleDto,
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
} from "~/types/bidragskalkulator";
import { hentTekst, jaNeiTekster, SpråkType } from "~/utils/oversettelser";
import Underskrifter from "~/features/bidragskalkulator/Underskrifter";

// Mock data for development
const mockRequest: PrivatAvtaleDto = {
  språk: "nb",
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
  const språk = data.språk ?? "nb";
  const innhold = hentTekst(språk, innholdsseksjonTekst);
  const tekster = hentTekst(språk, tekst);

  return (
    <div
      id="privat_avtale"
      style={{ fontFamily: '"Source Sans 3", sans-serif' }}
    >
      <HeaderFooter />
      <div className="container page">
        <NavLogo />
        <h1 style={{ fontFamily: '"Source Sans 3", sans-serif' }}>
          {tekster.tittel}
        </h1>
        <div>{data.innhold}</div>
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
      overskrift: `Opplysninger om ${bidragstypeTekster[bidragstype].nb}`,
      innhold: [
        { label: "Fornavn", value: person.fornavn, vis: true },
        { label: "Etternavn", value: person.etternavn, vis: true },
        {
          label: `Har ${bidragstypeTekster[bidragstype].nb} norsk fødselsnummer eller D-nummer?`,
          value: person.fodselsnummer
            ? jaNeiTekster.JA.nb
            : jaNeiTekster.NEI.nb,
          vis: true,
        },
        ...(person.fodselsnummer
          ? [
              {
                label: "Fødselsnummer",
                value: person.fodselsnummer,
                vis: true,
              },
            ]
          : []),
      ],
    },
    nn: {
      overskrift: `Opplysningar om ${bidragstypeTekster[bidragstype].nn}`,
      innhold: [
        { label: "Fornamn", value: person.fornavn, vis: true },
        { label: "Etternamn", value: person.etternavn, vis: true },
        {
          label: `Har ${bidragstypeTekster[bidragstype].nn} norsk fødselsnummer eller D-nummer?`,
          value: person.fodselsnummer
            ? jaNeiTekster.JA.nn
            : jaNeiTekster.NEI.nn,
          vis: true,
        },
        ...(person.fodselsnummer
          ? [
              {
                label: "Fødselsnummer",
                value: person.fodselsnummer,
                vis: true,
              },
            ]
          : []),
      ],
    },
    en: {
      overskrift: `Information about ${bidragstypeTekster[bidragstype].en}`,
      innhold: [
        { label: "First name", value: person.fornavn, vis: true },
        { label: "Last name", value: person.etternavn, vis: true },
        {
          label: `Does the ${bidragstypeTekster[bidragstype].en} have a Norwegian National ID or D-number?`,
          value: person.fodselsnummer ? jaNeiTekster.JA.en : jaNeiTekster.JA.en,
          vis: true,
        },
        ...(person.fodselsnummer
          ? [
              {
                label: "Norwegian national identification number / D number",
                value: person.fodselsnummer,
                vis: true,
              },
            ]
          : []),
      ],
    },
  }),
  barnOgBidrag: (barn: IBarn[], fraDato: string) => ({
    nb: {
      overskrift: "Opplysninger om barn og bidrag",
      innhold: barn.flatMap((b) => [
        { label: "Fornavn", value: b.fornavn, vis: true },
        { label: "Etternavn", value: b.etternavn, vis: true },
        {
          label: "Fødselsnummer eller D-nummer",
          value: b.fodselsnummer,
          vis: true,
        },
        { label: "Beløp barnebidrag", value: `${b.sumBidrag},-`, vis: true },
        { label: "Fra dato (dd.mm.åååå)", value: fraDato, vis: true },
      ]),
    },
    nn: {
      overskrift: "Opplysningar om barn og bidrag",
      innhold: barn.flatMap((b) => [
        { label: "Fornamn", value: b.fornavn, vis: true },
        { label: "Etternamn", value: b.etternavn, vis: true },
        {
          label: "Fødselsnummer eller D-nummer",
          value: b.fodselsnummer,
          vis: true,
        },
        { label: "Beløp barnebidrag", value: `${b.sumBidrag},-`, vis: true },
        { label: "Frå dato (dd.mm.åååå)", value: fraDato, vis: true },
      ]),
    },
    en: {
      overskrift: "Information about child and support",
      innhold: barn.flatMap((b) => [
        { label: "First name", value: b.fornavn, vis: true },
        { label: "Last name", value: b.etternavn, vis: true },
        {
          label: "Norwegian national identification number / D number",
          value: b.fodselsnummer,
          vis: true,
        },
        {
          label: "Child support amount",
          value: `${b.sumBidrag},-`,
          vis: true,
        },
        { label: "From date (dd.mm.yyyy)", value: fraDato, vis: true },
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
        },
        {
          label: "Hvilken oppgjørsform ønskes?",
          value: oppgjørsformTekster[oppgjørsform].nb,
          vis: true,
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
        },
        {
          label: "Kva for oppgjerform ønskjast?",
          value: oppgjørsformTekster[oppgjørsform].nn,
          vis: true,
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
        },
        {
          label: "Which settlement method is desired?",
          value: oppgjørsformTekster[oppgjørsform].en,
          vis: true,
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
        },
        {
          label: "Andre bestemmelser tilknyttet avtalen",
          value: andreBestemmelser.beskrivelse,
          vis:
            (andreBestemmelser.harAndreBestemmelser &&
              andreBestemmelser.beskrivelse) ??
            false,
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
        },
        {
          label: "Other provisions related to the agreement",
          value: andreBestemmelser.harAndreBestemmelser,
          vis:
            (andreBestemmelser.harAndreBestemmelser &&
              andreBestemmelser.beskrivelse) ??
            false,
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
        },
        {
          label: "Annen dokumentasjon",
          value: annenDokumentasjonTekster[vedlegg.annenDokumentasjon].nb,
          vis: true,
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
        },
        {
          label: "Anna dokumentasjon",
          value: annenDokumentasjonTekster[vedlegg.annenDokumentasjon].nn,
          vis: true,
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
        },
        {
          label: "Other documentation",
          value: annenDokumentasjonTekster[vedlegg.annenDokumentasjon].en,
          vis: true,
        },
      ],
    },
  }),
};

export type GeneriskInnholdType = ReturnType<
  (typeof innholdsseksjonTekst)[keyof typeof innholdsseksjonTekst]
>[SpråkType];
