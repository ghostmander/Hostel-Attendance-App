import React from 'react';
import SecondHeader from "src/app/_components/SecondHeader";
import UploadFiles from "./_components/UploadFiles/UploadFiles";

export default function Upload() {
    return (
        <>
            <SecondHeader title={"Upload Data"} needButton={false}/>
            <div id={"main-content"}>
                <UploadFiles/>
            </div>
        </>
    )
}

