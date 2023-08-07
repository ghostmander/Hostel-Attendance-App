"use client";
import React from "react";
import FilesDragAndDrop from '@yelysei/react-files-drag-and-drop';
import {processLeaveDatabase, processMasterDatabase, processTurnstyleData} from "src/functions";


interface UploadFilesProps {
    fileType: "turnstile" | "hostel" | "leave";
    text?: string;
}

export const UploadFiles: React.FC<UploadFilesProps> = ({fileType, text}) => {
    // @ts-ignore
    const fileFn = (fileType === "turnstile") ? processTurnstyleData : (fileType === "hostel") ? processMasterDatabase : processLeaveDatabase
    text = text || "Upload Turnstile files";

    const [files, setFiles] = React.useState<FileList | null>(null);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!files) return;
        const formData = new FormData();
        formData.append('files', files[0]);
        try {
            await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            // Process the response as needed
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };


    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '2em',
                width: '70%',
                margin: '0 auto',
            }}>
            <FilesDragAndDrop
                onUpload={(filelist) => {
                    // @ts-ignore
                    setFiles(filelist);
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
                    <span>{text}</span>
                    <span>+</span>
                </div>
            </FilesDragAndDrop>
            <input
                type="submit"
                value="Fetch Data!"
                name="submit"
                disabled={files === null}
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
