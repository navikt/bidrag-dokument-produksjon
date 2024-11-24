import {
  RenderMode,
  useNotatFelles,
  RenderPDFVersion,
} from "~/components/notat_felles/NotatContext";
const contentWithCustomStyles = `
      body {
        font-family: "Source Sans 3";
        font-size: 8px;
        line-height: 16px;
      }
`;
export default function HeaderFooter() {
  const { renderMode, data, renderPDFVersion } = useNotatFelles();
  const renderHeaderFooterV1 = () => (
    <div>
      <div
        className={"custom-top_bottom_content"}
        data-content={`Saksnummer ${data.saksnummer}`}
      ></div>
      <div className={"custom-page-number"}></div>
    </div>
  );
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
          Saksnummer {data.saksnummer}
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
      {renderMode == RenderMode.PDF &&
        renderPDFVersion == RenderPDFVersion.V1 && (
          <>
            <div className="header top_bottom_text">
              {renderHeaderFooterV1()}
            </div>
            <div className="footer top_bottom_text">
              {renderHeaderFooterV1()}
            </div>
          </>
        )}
      {renderMode == RenderMode.PDF &&
        renderPDFVersion == RenderPDFVersion.V2 && (
          <>
            {renderHeaderFooterV2(true)}
            {renderHeaderFooterV2(false)}
          </>
        )}
    </>
  );
}
