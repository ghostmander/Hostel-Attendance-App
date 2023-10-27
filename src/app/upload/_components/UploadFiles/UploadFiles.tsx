"use client";
import React from "react";
import FilesDragAndDrop from '@yelysei/react-files-drag-and-drop';
import axios from "axios";
import { useRef } from "react";
import "./UploadFiles.scss";

interface UploadFilesProps {
    isHostelDataUploaded: boolean;
    isLeaveListUploaded: boolean;
}

export const UploadFiles: React.FC<UploadFilesProps> = ({isHostelDataUploaded, isLeaveListUploaded}) => {
    const [lveFiles, setLveFiles] = React.useState<File[] | null>(null);
    const [mstFiles, setMstFiles] = React.useState<File[] | null>(null);
    const [tstFiles, setTstFiles] = React.useState<File[] | null>(null);
    const paragraphRef = useRef<HTMLParagraphElement>(null);

    const st: React.CSSProperties = {
        backgroundColor: 'var(--secondary-color)',
        position: 'relative',
        borderRadius: '3rem',
        width: '450px',
        maxWidth: '100%',
        padding: '5rem 0',
        margin: '0 auto',
        fontSize: '1.5rem',
    }
    const divStyles: React.CSSProperties = {
        fontSize: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'var(--accent-color)',
        fontWeight: 300,
        lineHeight: 1.4,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }
    const submitStyles: React.CSSProperties = {
        margin: '0 auto',
        backgroundColor: 'var(--secondary-color)',
        cursor: 'pointer',
        border: '0',
        width: 'fit-content',
        padding: '2rem 6rem',
        borderRadius: '2rem',
        fontSize: '1.5rem',
    }
    const fmt = ['xls', 'xlsx'];
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!tstFiles) return;
        const formData = new FormData();

        // Leave files
        if (lveFiles) {
            for (let i = 0; i < lveFiles.length; i++) formData.append(`leavefile${i}`, lveFiles[i]);
            formData.append("numLeaveFiles", lveFiles.length.toString())
        }

        // Master files
        if (mstFiles) {
            for (let i = 0; i < mstFiles.length; i++) formData.append(`masterfile${i}`, mstFiles[i]);
            formData.append("numMasterFiles", mstFiles.length.toString())
        }

        // Turnstile files
        for (let i = 0; i < tstFiles.length; i++) formData.append(`turnstilefile${i}`, tstFiles[i]);
        formData.append("numTurnstileFiles", tstFiles.length.toString())

        // TODO: Add a loader here to show that the files are being uploaded
        axios.post('/api/upload', formData).then(() => {
            alert("Files uploaded successfully!")
        }).catch(
            (error) => {
                console.log(error);
                alert("Error uploading files!");
            }
        )
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                <div id="file-uploaders">
                    <div id="left">
                        {isHostelDataUploaded && <p ref={paragraphRef}>Hostel Data already uploaded!</p>}
                        <FilesDragAndDrop onUpload={setMstFiles} formats={fmt} containerStyles={st} openDialogOnClick>
                            <div style={divStyles}>
                                <span>Upload Hostel Data</span>
                                <span>+</span>
                            </div>
                        </FilesDragAndDrop>
                    </div>
                    <div id="center">
                        {isLeaveListUploaded && <p>Leave List already uploaded!</p>}
                        <FilesDragAndDrop onUpload={setLveFiles} formats={fmt} containerStyles={st} openDialogOnClick>
                            <div style={divStyles}>
                                <span>Upload Leave List</span>
                                <span>+</span>
                            </div>
                        </FilesDragAndDrop>
                    </div>
                    <div id="right">
                        <FilesDragAndDrop onUpload={setTstFiles} formats={fmt} containerStyles={st} openDialogOnClick>
                            <div style={divStyles}>
                                <span>Upload Turnstile Data</span>
                                <span>+</span>
                            </div>
                        </FilesDragAndDrop>
                    </div>
                </div>
                <input
                    type="submit"
                    value="Upload Data"
                    name="submit"
                    id="submit"
                    style={submitStyles}
                    disabled={tstFiles === null}
                />
            </form>
            <div id="file-resetter">
                <button
                    style={submitStyles}
                    id={"reset-data"}
                    onClick={() => {
                        confirm("Are you sure you want to reset all data?") && axios.post('/api/reset').then(() => {
                            paragraphRef.current?.remove();
                            alert("Data reset successfully!")
                        }).catch((error) => {
                            console.log(error);
                            alert("Error resetting data!");
                        })
                    }}
                >Reset Data</button>
            </div>
        </>
    );
}

export default UploadFiles;
