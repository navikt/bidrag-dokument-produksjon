import {
  RenderMode,
  useNotatFelles,
  RenderPDFVersion,
} from "~/components/notat_felles/NotatContext";

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
        <span
          style={{
            fontSize: "11px",
            position: "absolute",
            left: "80px",
            top: isHeader ? "40px" : "auto",
            bottom: isHeader ? "auto" : "40px",
            fontFamily: "Source Sans 3",
            lineHeight: "16px",
          }}
        >
          Saksnummer {data.saksnummer}
        </span>
        <span
          style={{
            fontSize: "11px",
            position: "absolute",
            right: "80px",
            top: isHeader ? "40px" : "auto",
            bottom: isHeader ? "auto" : "40px",
            fontFamily: "Source Sans 3",
            lineHeight: "16px",
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
