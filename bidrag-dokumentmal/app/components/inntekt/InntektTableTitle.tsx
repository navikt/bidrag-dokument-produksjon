export default function InntektTableTitle({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) {
  if (!title) return null;
  return (
    <div style={{ display: "inline-block", verticalAlign: "middle" }}>
      <h3 style={{ padding: 0, margin: "0 0 5px 0", display: "inline" }}>
        {title}
      </h3>
      {subtitle && <span>{subtitle}</span>}
    </div>
  );
}
