import React from 'react';
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import ReportGraph from "./_components/ReportGraph/ReportGraph";

export default async function Report() {
    if (!cookies().get("user")) redirect("/login")


    return (
        <div id={"main-content"}>
            <ReportGraph />
        </div>
    )
}

