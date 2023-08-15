import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { generatePDF, generateExcel } from 'src/functions';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { filters, format } = req.body;
        const data = req.body.data;

        let generateFile;
        let fileExtension;

        // Determine which file generation function to use based on the 'format' query parameter
        if (format === 'PDF') {
            generateFile = generatePDF;
            fileExtension = 'pdf';
        } else if (format === 'EXCEL') {
            generateFile = generateExcel;
            fileExtension = 'xlsx';
        } else {
            throw new Error('Invalid file format specified');
        }

        const file = await generateFile(data, filters);

        res.setHeader('Content-Disposition', `attachment; filename="example-file.${fileExtension}"`);
        res.setHeader('Content-Type', 'application/octet-stream');

        // Pipe the generated file to the response object
        fs.createReadStream(file).pipe(res);

        // Delete the file from the server after successful download
        fs.unlinkSync(file);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
