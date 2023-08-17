import fs from 'fs';
// import path from 'path';
import { NextResponse } from 'next/server';
import { generatePDF, generateExcel } from 'src/functions';

export async function POST(req: Request) {
    try {
        const { data, format, date, block } = JSON.parse(await req.text());

        let generateFile;
        // let extension;

        // Determine which file generation function to use based on the 'format' query parameter
        if (format === 'PDF') {
            generateFile = generatePDF;
            // extension = 'pdf';
        } else if (format === 'Excel') {
            generateFile = generateExcel;
            // extension = 'xlsx';
        } else {
            throw new Error('Invalid file format specified: '+format);
        }

        const filename = await generateFile(data, date, block);
        
        const filepath = `reports/${filename}`;

        const file = fs.createReadStream(filepath);

        return new NextResponse(file , {
            headers: {
                "Content-Type": "application/octet-stream",
                "Content-Disposition": `attachment; filename="${filename}"`,
            },
        });

        
    } catch (error) {
        console.error(error);
        
        return new Response(error.message, { status: 500 });

    }
}
