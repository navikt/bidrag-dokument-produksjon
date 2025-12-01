import { RenderMode } from "~/components/notat_felles/NotatContext";
const contentWithCustomStyles = `
      body {
        font-family: "Source Sans 3";
        font-size: 8px;
        line-height: 16px;
      }
`;
export default function HeaderFooter({
  renderMode,
  saksnummer,
  saker,
}: {
  renderMode: RenderMode;
  saksnummer?: string;
  saker?: string[];
}) {
  const flereSaker = saker && saker.length > 1;
  const enesteSaksnummer =
    saksnummer ?? (saker && saker.length > 0 ? saker[0] : "Ukjent");
  const renderHeaderFooterV2 = (isHeader: boolean) => (
    <>
      <div id={isHeader ? "header" : "footer"}>
        <style
          dangerouslySetInnerHTML={{
            __html: contentWithCustomStyles,
          }}
        ></style>
        <span
          style={{
            position: "absolute",
            left: "80px",
            top: isHeader ? "40px" : "auto",
            bottom: isHeader ? "auto" : "40px",
          }}
        >
          {flereSaker
            ? `Saker ${saker.join(", ")}`
            : `Saksnummer ${enesteSaksnummer}`}
        </span>
        <span
          style={{
            position: "absolute",
            right: "80px",
            top: isHeader ? "40px" : "auto",
            bottom: isHeader ? "auto" : "40px",
          }}
        >
          <span className="pageNumber"></span>
          <span style={{ marginRight: "5px", marginLeft: "5px" }}>av</span>
          <span className="totalPages"></span>
        </span>
      </div>
    </>
  );
  return (
    <>
      {renderMode == RenderMode.PDF && (
        <>
          {renderHeaderFooterV2(true)}
          {renderHeaderFooterV2(false)}
        </>
      )}
    </>
  );
}
