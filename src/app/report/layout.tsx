import React from "react";
// import SecondHeader from "../_components/SecondHeader";

export default function ReportLayout({children}: { children: React.ReactNode }) {
    return (
        <div id={"main-content-top"}>
            {children}
        </div>
    )
}
