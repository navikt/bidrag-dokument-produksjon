
export const SignaturBoks = () => {
    return (
        <div className={""}>
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