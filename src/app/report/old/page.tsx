import React from 'react';
import SecondHeader from "src/app/_components/SecondHeader";
import DataViewer from "../_components/DataViewer";

export default function OldReport({searchParams}: {
    searchParams: {
        name: string | undefined;
        regno: string | undefined;
        status: string | undefined;
        date: string | undefined;
    }
}) {
    return (
        <div id={"main-content"}>
            <SecondHeader title={"View Previous Attendance Report: "} needButton={true}/>
            <DataViewer isDateNeeded date={"2023-07-21"} searchParams={searchParams}/>
        </div>
    )
}

