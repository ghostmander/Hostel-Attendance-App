import React from 'react';
import SecondHeader from "../_components/SecondHeader";
import Filters from "./_components/Filters";
import DataViewer from "./_components/DataViewer";

export default function Report() {
    return (
        <div id={"main-content"}>
            <SecondHeader title={"View Attendance Report: "} needButton={true} />
            <Filters isDateNeeded={false} />
            <DataViewer />
        </div>
    )
}

