import React from 'react';
import SecondHeader from "src/app/_components/SecondHeader";
import UploadFiles from "../_components/UploadFiles/UploadFiles";
import "../hostel/uploadHostel.scss"
import processLeaveDatabase from "src/functions/processLeaveDatabase";

export default function LeaveUpload() {
    return (
        <>
            <SecondHeader title={"Upload Hostel Masterdata"} needButton={false}/>
            <div id={"main-content"}>
                <div id="left">
                    <form
                        id="form-lrft"
                        style={{justifyContent: "center"}}
                    >
                        <input
                            type="text"
                            name="id"
                            id="id"
                            placeholder="Registration Number"
                        />
                        <input type="submit" value="Upload!" name="submit"/>
                    </form>
                </div>
                <div id="right">
                    <UploadFiles fileFn={processLeaveDatabase}/>
                </div>
            </div>
        </>
    )
}

