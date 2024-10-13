import {
  useNotatFelles,
  RenderMode,
} from "~/components/notat_felles/NotatContext";

export default function HeaderFooter() {
  const { renderMode, data } = useNotatFelles();
  const renderTopBottomTextContent = () => (
    <>
      <div id="headerfooter">
        <span
          style={{
            fontSize: "12px",
            position: "absolute",
            left: "85px",
            top: "40px",
            fontFamily: "Source Sans Pro",
          }}
        >
          Saksnummer {data.saksnummer}
        </span>
        <span
          style={{
            fontSize: "12px",
            position: "absolute",
            right: "85px",
            top: "40px",
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
          {/*<div*/}
          {/*  className={"custom-next-page-info next-page-info"}*/}
          {/*  data-content={`Fortsettelse på neste side`}*/}
          {/*></div>*/}
          {renderTopBottomTextContent()}
        </>
      )}
      {renderMode == RenderMode.PDF && (
        <>
          {/*<div*/}
          {/*  className={"custom-next-page-info next-page-info"}*/}
          {/*  data-content={`Fortsettelse på neste side`}*/}
          {/*></div>*/}
          {renderTopBottomTextContent()}
        </>
      )}
      {/*{response.renderForPdf && (*/}
      {/*  <div className="footer_last_page top_bottom_text">*/}
      {/*    {renderTopBottomTextContent()}*/}
      {/*  </div>*/}
      {/*)}*/}
    </>
  );
}
