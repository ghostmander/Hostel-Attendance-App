"use client";
import React, {useState} from "react";
import FilesDragAndDrop from '@yelysei/react-files-drag-and-drop';


interface UploadFilesProps {
    fileFn: (file: File) => any;
}

export const UploadFiles: React.FC<UploadFilesProps> = ({fileFn}) => {

    const [files, setFiles] = useState<File[]>();
    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                // @ts-ignore
                for (let file of files) {
                    console.log(file);
                    fileFn(file)
                }
            }}
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
                    <span>Upload Turnstile files</span>
                    <span>+</span>
                </div>
            </FilesDragAndDrop>
            <input
                type="submit"
                value="Fetch Data!"
                name="submit"
                id="submit"
                disabled={files === null}
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
