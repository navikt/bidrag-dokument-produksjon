import { NotatForskuddProps } from "~/routes/notat.forskudd/route";

export default function SaksbehandlerNotat({ data }: NotatForskuddProps) {
  return (
    <div style={{ pageBreakBefore: "always" }}>
      <h2>Notat</h2>
      <div>
        <h3>Virkningstidspunkt</h3>
        <NotatVisning
          medIVedtaket
          innhold={data.virkningstidspunkt.notat.medIVedtaket}
        />
        <NotatVisning innhold={data.virkningstidspunkt.notat.intern} />
      </div>
      <div
        className="horizontal-line"
        style={{ pageBreakAfter: "avoid", marginTop: "20px" }}
      ></div>

      <div>
        <h3>Boforhold</h3>
        <NotatVisning
          medIVedtaket
          innhold={data.boforhold.notat.medIVedtaket}
        />
        <NotatVisning innhold={data.boforhold.notat.intern} />
      </div>
      <div
        className="horizontal-line"
        style={{ pageBreakAfter: "avoid", marginTop: "20px" }}
      ></div>
      <div>
        <h3>Inntekt</h3>
        <NotatVisning
          medIVedtaket
          innhold={data.inntekter.notat.medIVedtaket}
        />
        <NotatVisning innhold={data.inntekter.notat.intern} />
      </div>
    </div>
  );
}

function NotatVisning({
  medIVedtaket,
  innhold,
}: {
  medIVedtaket?: boolean;
  innhold?: string;
}) {
  if (innhold == null || innhold.trim().length == 0) return null;
  return (
    <div>
      <h4>
        {medIVedtaket
          ? "Begrunnelse (med i vedtaket):"
          : "Begrunnelse (kun for intern notat): "}
      </h4>
      <span>{innhold}</span>
    </div>
  );
}
