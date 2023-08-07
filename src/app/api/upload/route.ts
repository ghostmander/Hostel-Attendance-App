import {NextApiRequest, NextApiResponse} from 'next';
import formidable, {IncomingForm} from 'formidable';
import fs from 'fs';
import path from 'path';
import {NextResponse} from "next/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const form = new IncomingForm();

        form.parse(req, async (err, fields, files) => {
            if (err) {
                return NextResponse.error();
            }

            const uploadedFiles = files.files as formidable.File[];
            const uploadDir = path.join(process.cwd(), 'public', 'uploads');

            try {
                // Process each file
                const filePromises = uploadedFiles.map((file) => {
                    const tempPath = file.path;
                    const targetPath = path.join(uploadDir, file.name);

                    // Move the file to the target path
                    fs.renameSync(tempPath, targetPath);
                });

                await Promise.all(filePromises);

                return new NextResponse("Files uploaded successfully", { status: 200 });
            } catch (error) {
                console.error('Error processing files:', error);
                return NextResponse.error();
            }
        });
    } else {
        res.status(405).json({error: 'Method not allowed'});
    }
}


// @ts-ignore
export async function POST(request: NextApiRequest) {
    try {
        //     formdata is being posted to this route
        const form = new IncomingForm();
        form.parse(request, async (err, fields, files) => {
            if (err) {
                console.log(err);
                throw err;
            }
            console.log(fields);
            console.log(files);
            const oldPath = files.file.path;
            const newPath = path.join(process.cwd(), 'public', 'uploads', files.file.name);
            // fs.rename(oldPath, newPath, (err) => {
            //     if (err) throw err;
            //     console.log('Successfully renamed - AKA moved!')
            // })
        })
    } catch (error: any) {
        if (error.code === "P2002") {
            let error_response = {
                status: "fail",
                message: "Feedback with title already exists",
            };
            return new NextResponse(JSON.stringify(error_response), {
                status: 409,
                headers: {"Content-Type": "application/json"},
            });
        }

        let error_response = {
            status: "error",
            message: error.message,
        };
        return new NextResponse(JSON.stringify(error_response), {
            status: 500,
            headers: {"Content-Type": "application/json"},
        });
    }
}
