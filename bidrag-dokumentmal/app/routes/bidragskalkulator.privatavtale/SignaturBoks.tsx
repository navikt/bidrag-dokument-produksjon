
export const SignaturBoks = ({ title }: { title: string }) => {
    return (
        <div className={""}>
            <h3>{title}</h3>
            <div className={"flex flex-col"}>
                <p style={{ flex: 1}}>Sted og dato</p>
                <div style={{ height: 40, borderBottom: "1px solid black", width: "50% "}}/>
            </div>
            <div className={"w-full h-10 divide divide-solid"}></div>
            <div className={"flex flex-col"}>
                <p style={{ flex: 1}}>Signatur</p>
                <div style={{ height: 40, borderBottom: "1px solid black", width: "50% "}}/>
            </div>
            <div className={"w-full h-10 divide divide-solid"}></div>
            <div className={"flex flex-col"}>
                <p style={{ flex: 1}}>Navn med blokkbokstaver</p>
                <div style={{ height: 40, borderBottom: "1px solid black", width: "50% "}}/>
            </div>

        </div>
    )
}