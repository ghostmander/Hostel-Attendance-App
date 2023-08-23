import {NextResponse} from 'next/server';
import {generatePDF, generateExcel} from 'src/functions';

export async function POST(req: Request) {
    try {
        const {data, format, date, block} = JSON.parse(await req.text());
        let generateFile;

        // Determine which file generation function to use based on the 'format' query parameter
        if (format === 'PDF') generateFile = generatePDF;
        else if (format === 'Excel') generateFile = generateExcel;
        else return new Response('Invalid file format specified: ' + format, {status: 500});

        const filename = await generateFile(data, date, block);
        console.log('File generated: ' + filename);

        // redirect to the generated file
        return NextResponse.json({
            filepath: `/reports/${filename}`,
            filename: filename
        });
    } catch (error) {
        console.error(error);
        return new Response(error.message, {status: 500});

    }
}
