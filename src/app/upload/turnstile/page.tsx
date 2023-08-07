import React from 'react';
import SecondHeader from "src/app/_components/SecondHeader";
import UploadFiles from "../_components/UploadFiles/UploadFiles";

export default async function TurnstileUpload() {
    return (
        <div id={"main-content"} style={{
            color: 'var(--primary-color)',
            fontSize: '1.2rem',
            lineHeight: 1.5,
            textAlign: 'center',
        }}>
            <SecondHeader title={"Upload Turnstile Data"} needButton={false}/>
            <p>
                Upload the Turnstile data by clicking the button below, or drag and
                drop the file into the designated area. <br/>Please ensure that the
                file you are uploading follows the required format and contains the
                necessary data fields for the Turnstile data processing to be
                successful.
            </p>
            <UploadFiles fileType={"turnstile"} />
        </div>
    )
}

