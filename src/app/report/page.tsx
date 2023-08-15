import React from 'react';
import SecondHeader from "../_components/SecondHeader";
import DataViewer from "./_components/DataViewer";

export default function Report({searchParams}: {
    searchParams: {
        name: string | undefined;
        regno: string | undefined;
        status: string | undefined;
        date: string | undefined;
        block: "BHB1" | "BHB2" | "BHB3" | "GHB1" | undefined
    }
}) {
    return (
        <div id={"main-content"}>
            <SecondHeader title={"View Report"}/>
            <DataViewer isDateNeeded date={"2023-07-21"} searchParams={searchParams}/>
        </div>
    )
}

