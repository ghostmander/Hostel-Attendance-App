// import {NextApiRequest, NextApiResponse} from 'next';
// import formidable, {IncomingForm} from 'formidable';
// import fs from 'fs';
// import path from 'path';
import {NextResponse} from "next/server";
import {processLeaveDatabase, processMasterDatabase, processTurnstyleData} from "src/functions";

// @ts-ignore
export async function POST(request: Request) {
    try {
        const formdata = await request.formData();
        // const file = formdata.get('files');
        console.log(formdata)
        const fileType = formdata.get('fileType')
        const numFiles = parseInt(formdata.get('numFiles') as string)
        console.log(numFiles)
        const files: File[] = []
        for (let i = 0; i < numFiles; i++) files.push(formdata.get(`file${i}`) as File)

        // @ts-ignore
        const fileFn = (fileType === "turnstile") ? processTurnstyleData : (fileType === "hostel") ? processMasterDatabase : processLeaveDatabase
        console.log(files)
        for (const file of files) {
            await fileFn(file)
        }

        return NextResponse.json({
            message: 'File uploaded successfully',
            success: true
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error, status: 500})
    }
}
