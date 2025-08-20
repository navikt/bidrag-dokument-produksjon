/* eslint-disable prettier/prettier */
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
  IBarnOgBidrag,
  IAndreBestemmelser,
  oppgjørsformTekster,
  bidragstypeTekster,
  kodeOfNavSkjemaIdKey,
  Vedleggskrav,
  vedleggskravTekster,
  IOppgjør,
  GenererPrivatAvtalePdfRequest,
} from "~/types/bidragskalkulator";
import {
  hentTekst,
  jaNeiTekster,
  språkkodeTilSpråkType,
  SpråkType,
} from "~/utils/oversettelser";
import Underskrifter from "~/features/bidragskalkulator/Underskrifter";

// Mock data for development
const mockRequest: GenererPrivatAvtalePdfRequest = {
  privatAvtalePdf: {
    språk: "NB",
    bidragsmottaker: {
      fornavn: "Kristian",
      etternavn: "Etternavnesen",
      ident: "12345678901",
    },
    bidragspliktig: {
      fornavn: "Kristine",
      etternavn: "Etternavnesen",
      ident: "12345678901",
    },
    barn: [
      {
        fornavn: "Ola",
        etternavn: "Etternavnesen",
        ident: "12345678901",
        sumBidrag: 5000,
        fraDato: "01.01.2025",
      },
      {
        fornavn: "Ola2",
        etternavn: "Etternavnesen2",
        ident: "12345678901",
        sumBidrag: 5000,
        fraDato: "01.01.2025",
      },
    ],
    oppgjør: {
      nyAvtale: true,
      oppgjørsformØnsket: "PRIVAT",
      oppgjørsformIdag: "PRIVAT",
    },
    andreBestemmelser: {
      harAndreBestemmelser: true,
      beskrivelse: "Dette er en beskrivelse av andre bestemmelser.",
    },
    vedlegg: "INGEN_EKSTRA_DOKUMENTASJON",
  },
  navSkjemaId: "AVTALE_OM_BARNEBIDRAG_UNDER_18",
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
  const actionData = useActionData<{ data: GenererPrivatAvtalePdfRequest }>();
  const response =
    process.env.NODE_ENV === "development" ? { data: mockRequest } : actionData;

  if (response === undefined) {
    return <div>Oops</div>;
  }

  const {
    data: { privatAvtalePdf, navSkjemaId },
  } = response;
  const språk = språkkodeTilSpråkType(privatAvtalePdf.språk) ?? "nb";
  const innhold = hentTekst(språk, innholdsseksjonTekst);
  const tekster = hentTekst(språk, tekst);

  return (
    <div id="privat_avtale" lang={språk}>
      <HeaderFooter språk={språk} />
      <div className="bidragskalkulatorContainer">
        <NavLogo />
        <h1>{tekster.tittel}</h1>
        <p>{kodeOfNavSkjemaIdKey(navSkjemaId)}</p>
        <div className="flex flex-col gap-4">
          <Innholdsseksjon
            tekst={innhold.opplysningerPerson(
              "MOTTAKER",
              privatAvtalePdf.bidragsmottaker
            )}
          />
          <Innholdsseksjon
            tekst={innhold.opplysningerPerson(
              "PLIKTIG",
              privatAvtalePdf.bidragspliktig
            )}
          />
          <Innholdsseksjon tekst={innhold.barnOgBidrag(privatAvtalePdf.barn)} />
          <Innholdsseksjon tekst={innhold.oppgjør(privatAvtalePdf.oppgjør)} />
          <Innholdsseksjon
            tekst={innhold.andreBestemmelser(privatAvtalePdf.andreBestemmelser)}
          />
          <Innholdsseksjon tekst={innhold.vedlegg(privatAvtalePdf.vedlegg)} />
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
        ...(person.ident
          ? [
              {
                label: "Fødselsnummer eller D-nummer (11 siffer)",
                value: person.ident,
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
        ...(person.ident
          ? [
              {
                label: "Fødselsnummer eller D-nummer (11 siffer)",
                value: person.ident,
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
        ...(person.ident
          ? [
              {
                label:
                  "Norwegian national identification number or D-number (11 digits)",
                value: person.ident,
                vis: true,
                type: "text",
              },
            ]
          : []),
      ],
    },
  }),
  barnOgBidrag: (barn: IBarnOgBidrag[]) => ({
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
          label: "Fødselsnummer eller D-nummer (11 siffer)",
          value: b.ident,
          vis: true,
          type: "text",
        },
        {
          label: "Beløp per måned",
          value: `${b.sumBidrag},-`,
          vis: true,
          type: "text",
        },
        {
          label: "Avtalen gjelder fra (dd.mm.åååå)",
          value: b.fraDato,
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
          value: b.ident,
          vis: true,
          type: "text",
        },
        {
          label: "Beløp per månad",
          value: `${b.sumBidrag},-`,
          vis: true,
          type: "text",
        },
        {
          label: "Avtalen gjeld frå (dd.mm.åååå)",
          value: b.fraDato,
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
          value: b.ident,
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
          label: "Agreement valid from (dd.mm.yyyy)",
          value: b.fraDato,
          vis: true,
          type: "text",
        },
      ]),
    },
  }),
  oppgjør: (oppgjør: IOppgjør) => ({
    nb: {
      overskrift: "Oppgjør",
      innhold: [
        {
          label: "Er dette en ny avtale?",
          value: oppgjør.nyAvtale
            ? "Ja"
            : "Nei, dette er en endring av en eksisterende avtale",
          vis: true,
          type: "text",
        },
        {
          label: "Hvilken oppgjørsform ønskes?",
          value: oppgjørsformTekster[oppgjør.oppgjørsformØnsket].nb,
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
          value: oppgjør.nyAvtale
            ? "Ja"
            : "Nei, det er ei endring av eksisterande avtale.",
          vis: true,
          type: "text",
        },
        {
          label: "Kva type oppgjer ønskjer de?",
          value: oppgjørsformTekster[oppgjør.oppgjørsformØnsket].nn,
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
          value: oppgjør.nyAvtale
            ? "Yes"
            : "No, this is an adjustment of an existing agreement.",
          vis: true,
          type: "text",
        },
        {
          label: "Which settlement method is desired?",
          value: oppgjørsformTekster[oppgjør.oppgjørsformØnsket].en,
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
      overskrift: "Andre bestemmingar",
      innhold: [
        {
          label: "Er det andre bestemmingar knytt til avtalen?",
          value: andreBestemmelser.harAndreBestemmelser
            ? jaNeiTekster.JA.nn
            : jaNeiTekster.NEI.nn,
          vis: true,
          type: "text",
        },
        {
          label: "Andre bestemmingar knytt til avtalen",
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
          label: "Are there any other conditions that apply to the agreement?",
          value: andreBestemmelser.harAndreBestemmelser
            ? jaNeiTekster.JA.en
            : jaNeiTekster.JA.en,
          vis: true,
          type: "text",
        },
        {
          label: "Other conditions related to the agreement",
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
  vedlegg: (vedlegg: Vedleggskrav) => ({
    nb: {
      overskrift: "Vedlegg",
      innhold: [
        {
          label: "Har du noen annen dokumentasjon du ønsker å legge ved?",
          value: vedleggskravTekster[vedlegg].nb,
          vis: true,
          type: "text",
        },
      ],
    },
    nn: {
      overskrift: "Vedlegg",
      innhold: [
        {
          label: "Annan dokumentasjon",
          value: vedleggskravTekster[vedlegg].nn,
          vis: true,
          type: "text",
        },
      ],
    },
    en: {
      overskrift: "Attachments",
      innhold: [
        {
          label: "Other documentation",
          value: vedleggskravTekster[vedlegg].en,
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
