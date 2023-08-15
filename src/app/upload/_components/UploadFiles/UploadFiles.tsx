"use client";
import React from "react";
import FilesDragAndDrop from '@yelysei/react-files-drag-and-drop';
import axios from "axios";
import "./UploadFiles.scss";

interface UploadFilesProps {
}

export const UploadFiles: React.FC<UploadFilesProps> = ({}) => {
    const [leavefiles, setLeaveFiles] = React.useState<FileList | null>(null);
    const [masterfiles, setMasterFiles] = React.useState<FileList | null>(null);
    const [turnstilefiles, setTurnstilefiles] = React.useState<FileList | null>(null);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!leavefiles || !masterfiles || !turnstilefiles) return;
        const formData = new FormData();

        // Leave files
        for (let i = 0; i < leavefiles.length; i++) formData.append(`leavefile${i}`, leavefiles[i]);
        formData.append("numLeaveFiles", leavefiles.length.toString())

        // Master files
        for (let i = 0; i < masterfiles.length; i++) formData.append(`masterfile${i}`, masterfiles[i]);
        formData.append("numMasterFiles", masterfiles.length.toString())

        // Turnstile files
        for (let i = 0; i < turnstilefiles.length; i++) formData.append(`turnstilefile${i}`, turnstilefiles[i]);
        formData.append("numTurnstileFiles", turnstilefiles.length.toString())

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
        <form onSubmit={handleSubmit}>
            <div id="file-uploaders">
                <div id="left">
                    <FilesDragAndDrop
                        onUpload={(filelist) => {
                            // @ts-ignore
                            setMasterFiles(filelist);
                        }}
                        formats={['xls', 'xlsx']}
                        containerStyles={{
                            backgroundColor: 'var(--secondary-color)',
                            position: 'relative',
                            borderRadius: '3rem',
                            width: '450px',
                            maxWidth: '100%',
                            padding: '5rem 0',
                            margin: '0 auto',
                            fontSize: '1.5rem',
                        }}
                        openDialogOnClick
                    >
                        <div style={{
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
                        }}>
                            <span>Upload Hostel Data</span>
                            <span>+</span>
                        </div>
                    </FilesDragAndDrop>
                </div>
                <div id="center">
                    <FilesDragAndDrop
                        onUpload={(filelist) => {
                            // @ts-ignore
                            setLeaveFiles(filelist);
                        }}
                        formats={['xls', 'xlsx']}
                        containerStyles={{
                            backgroundColor: 'var(--secondary-color)',
                            position: 'relative',
                            borderRadius: '3rem',
                            width: '450px',
                            maxWidth: '100%',
                            padding: '5rem 0',
                            margin: '0 auto',
                            fontSize: '1.5rem',
                        }}
                        openDialogOnClick
                    >
                        <div style={{
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
                        }}>
                            <span>Upload Leave List</span>
                            <span>+</span>
                        </div>
                    </FilesDragAndDrop>
                </div>
                <div id="right">
                    <FilesDragAndDrop
                        onUpload={(filelist) => {
                            // @ts-ignore
                            setTurnstilefiles(filelist);
                        }}
                        formats={['xls', 'xlsx']}
                        containerStyles={{
                            backgroundColor: 'var(--secondary-color)',
                            position: 'relative',
                            borderRadius: '3rem',
                            width: '450px',
                            maxWidth: '100%',
                            padding: '5rem 0',
                            margin: '0 auto',
                            fontSize: '1.5rem',
                        }}
                        openDialogOnClick
                    >
                        <div style={{
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
                        }}>
                            <span>Upload Turnstile Data</span>
                            <span>+</span>
                        </div>
                    </FilesDragAndDrop>
                </div>
            </div>
            <input
                type="submit"
                value="Fetch Data!"
                name="submit"
                disabled={leavefiles === null || masterfiles === null || turnstilefiles === null}
                id="submit"
                style={{
                    margin: '0 auto',
                    backgroundColor: 'var(--secondary-color)',
                    cursor: 'pointer',
                    border: '0',
                    width: 'fit-content',
                    padding: '2rem 6rem',
                    borderRadius: '2rem',
                    fontSize: '1.5rem',
                }}
            />
        </form>
    );
}

export default UploadFiles;
