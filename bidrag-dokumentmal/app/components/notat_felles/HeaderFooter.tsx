import {
  useNotatFelles,
  RenderMode,
} from "~/components/notat_felles/NotatContext";

export default function HeaderFooter() {
  const { renderMode, data } = useNotatFelles();
  const renderTopBottomTextContent = (isHeader: boolean) => (
    <>
      <div id={isHeader ? "header" : "footer"}>
        <span
          style={{
            fontSize: "12px",
            position: "absolute",
            left: "80px",
            top: isHeader ? "40px" : "auto",
            bottom: isHeader ? "auto" : "40px",
            fontFamily: "Source Sans Pro",
          }}
        >
          Saksnummer {data.saksnummer}
        </span>
        <span
          style={{
            fontSize: "12px",
            position: "absolute",
            right: "80px",
            top: isHeader ? "40px" : "auto",
            bottom: isHeader ? "auto" : "40px",
            fontFamily: "Source Sans Pro",
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
          {renderTopBottomTextContent(true)}
          {renderTopBottomTextContent(false)}
        </>
      )}
    </>
  );
}
