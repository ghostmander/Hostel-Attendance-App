import React from 'react';
import SecondHeader from "src/app/_components/SecondHeader";
import UploadFiles from "../_components/UploadFiles/UploadFiles";
import "./uploadHostel.scss"
import processMasterDatabase from "src/functions/processMasterDatabase";

export default function HostelUpload() {
    const blocks: { [key: string]: string } = {
        "BHB1": "Boys Block - 1",
        "BHB2": "Boys Block - 2",
        "BHB3": "Boys Block - 3",
        "GHB1": "Girls Block - 1",
    }
    return (
        <>
            <SecondHeader title={"Upload Hostel Masterdata"} needButton={false}/>
            <div id={"main-content"}>
                <div id="left">
                    <form
                        id="form-lrft"
                    >
                        <input
                            type="text"
                            name="id"
                            id="id"
                            placeholder="Registration Number"
                        />
                        <input type="text" name="name" id="name" placeholder="Student Name"/>
                        <input type="text" name="roomnum" id="roomnum" placeholder="Room Number"/>
                        <select name="block" id="blockselector">
                            {Object.entries(blocks).map(([key, value], index) =>
                                <option value={key} key={index}>{value}</option>
                            )}
                        </select>
                        <input type="submit" value="Upload!" name="submit"/>
                    </form>
                </div>
                <div id="right">
                    <UploadFiles fileFn={processMasterDatabase}/>
                </div>
            </div>
        </>
    )
}

