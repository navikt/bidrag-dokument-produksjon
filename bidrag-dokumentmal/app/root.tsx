import { Meta, Outlet } from "react-router";
import fs from "fs";

const styles = fs.readFileSync("app/style/style.css").toString();
const tailwindStyles = fs.readFileSync("app/style/tw_output.css").toString();

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb">
      <head>
        <Meta />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style
          dangerouslySetInnerHTML={{
            __html: styles,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: tailwindStyles,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
