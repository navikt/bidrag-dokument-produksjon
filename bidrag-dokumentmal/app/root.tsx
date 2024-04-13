import {Links, Meta, Outlet,} from "@remix-run/react";
import fs from "fs"
const styles = fs.readFileSync("app/style/style.css").toString()

export function Layout({children}: { children: React.ReactNode }) {

    return (
        <html lang="nb">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <Meta/>
            <Links/>
            <style dangerouslySetInnerHTML={{
                __html: styles
            }}/>
        </head>
        <body>
        {children}
        </body>
        </html>
    );
}

export default function App() {
    return <Outlet/>;
}
