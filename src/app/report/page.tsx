import React from 'react';
import SecondHeader from "../_components/SecondHeader";
import DataViewer from "./_components/DataViewer";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export default function Report({searchParams}: {
    searchParams: {
        name: string | undefined;
        regno: string | undefined;
        status: string | undefined;
        date: string | undefined;
        block: "BHB1" | "BHB2" | "BHB3" | "GHB1" | undefined
    }
}) {
    if (!cookies().get("user")) redirect("/login")

    return (
        <div id={"main-content"}>
            <SecondHeader title={"View Report"}/>
            <DataViewer isDateNeeded date={"2023-07-21"} searchParams={searchParams}/>
        </div>
    )
}

