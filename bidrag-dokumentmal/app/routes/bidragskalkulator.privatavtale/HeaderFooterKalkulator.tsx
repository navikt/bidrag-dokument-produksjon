const contentWithCustomStyles = `
      body {
        font-family: "Source Sans 3";
        font-size: 8px;
        line-height: 16px;
      }
`;
export default function HeaderFooter() {
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
      {renderHeaderFooterV2(true)}
      {renderHeaderFooterV2(false)}
    </>
  );
}
