import {
  useNotatFelles,
  RenderMode,
} from "~/components/notat_felles/NotatContext";

export default function HeaderFooter() {
  const { renderMode, data } = useNotatFelles();
  const renderTopBottomTextContent = () => (
    <div>
      <div
        className={"custom-top_bottom_content"}
        data-content={`Saksnummer ${data.saksnummer}`}
      ></div>
      <div className={"custom-page-number"}></div>
    </div>
  );
  return (
    <>
      {renderMode == RenderMode.PDF && (
        <div className="header top_bottom_text">
          {/*<div*/}
          {/*  className={"custom-next-page-info next-page-info"}*/}
          {/*  data-content={`Fortsettelse på neste side`}*/}
          {/*></div>*/}
          {renderTopBottomTextContent()}
        </div>
      )}
      {renderMode == RenderMode.PDF && (
        <div className="footer top_bottom_text">
          {/*<div*/}
          {/*  className={"custom-next-page-info next-page-info"}*/}
          {/*  data-content={`Fortsettelse på neste side`}*/}
          {/*></div>*/}
          {renderTopBottomTextContent()}
        </div>
      )}
      {/*{response.renderForPdf && (*/}
      {/*  <div className="footer_last_page top_bottom_text">*/}
      {/*    {renderTopBottomTextContent()}*/}
      {/*  </div>*/}
      {/*)}*/}
    </>
  );
}
