import React from 'react';
import SecondHeader from "src/app/_components/SecondHeader";
import UploadFiles from "./_components/UploadFiles/UploadFiles";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import checkFileExists from "../../functions/checkFileExists";

export default function Upload() {
    if (!cookies().get("user")) redirect("/login")
    const {hostelData, leaveData} = checkFileExists()
    return (
        <>
            <SecondHeader title={"Upload Data"} needButton={false}/>
            <div id={"main-content"}>
                <UploadFiles isHostelDataUploaded={hostelData} isLeaveListUploaded={leaveData}/>
            </div>
        </>
    )
}

