import {Row, Workbook} from "exceljs";
import {ReadableWebToNodeStream} from "readable-web-to-node-stream";
const fs = require('fs');

export const processLeaveDatabase = async (file: File): Promise<Set<string>> => {
    const workbook: Workbook = new Workbook();
    const filestream = new ReadableWebToNodeStream(file.stream())
    // @ts-ignore
    return await workbook.xlsx.read(filestream).then(() => {
        const data: Set<string> = new Set();
        const worksheet = workbook.getWorksheet(1);
        worksheet.eachRow((row: Row) => {
            const regNo: string = row.getCell(1).toString().toUpperCase().trim();
            data.add(regNo);
        });
        fs.writeFileSync("database/leave.json", JSON.stringify([...data], null, 0));
        return data;

    });
}

export default processLeaveDatabase;
