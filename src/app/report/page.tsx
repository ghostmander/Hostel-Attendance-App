import React from 'react';
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import ReportGraph from "./_components/ReportGraph/ReportGraph";

export default async function Report({searchParams}: {
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
            <ReportGraph />
        </div>
    )
}

