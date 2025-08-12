import { Meta, Outlet } from "@remix-run/react";
import fs from "fs";

const styles = fs.readFileSync("app/style/style.css").toString();
const tailwindStyles = fs.readFileSync("app/style/tw_output.css").toString();

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb-NO">
      <head>
        <meta charSet="utf-8" />
        <Meta />
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
