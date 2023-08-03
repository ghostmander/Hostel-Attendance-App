import {Row, Workbook} from "exceljs";

const fs = require('fs');
export const processLeaveDatabase = async (filepath: string): Promise<Set<string>> => {
    const workbook: Workbook = new Workbook();
    return await workbook.xlsx.readFile(filepath).then(() => {
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
