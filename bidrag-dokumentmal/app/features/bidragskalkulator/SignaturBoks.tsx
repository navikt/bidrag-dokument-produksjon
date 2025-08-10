export const SignaturBoks = ({ title }: { title: string }) => {
  const sections = ["Sted og dato", "Signatur", "Navn med blokkbokstaver"];

  return (
    <div className="mb-medium">
      <h3
        style={{ fontFamily: '"Source Sans 3", sans-serif' }}
        className="mb-medium"
      >
        {title}
      </h3>
      {sections.map((label, i) => (
        <div key={label}>
          <div className="flex flex-col">
            <p style={{ flex: 1, fontFamily: '"Source Sans 3", sans-serif' }}>
              {label}
            </p>
            <div
              style={{
                height: 40,
                borderBottom: "1px solid black",
                width: "50%",
              }}
            />
          </div>
          {i < sections.length - 1 && (
            <div className="w-full h-10 divide divide-solid"></div>
          )}
        </div>
      ))}
    </div>
  );
};
