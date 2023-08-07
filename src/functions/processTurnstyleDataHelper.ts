import {Workbook, Row} from "exceljs";
import {ReadableWebToNodeStream} from "readable-web-to-node-stream";

const processTurnstyleDataHelper = async (file: File): Promise<[string, TurnstileData]> => {
    const workbook: Workbook = new Workbook();
    const filestream = new ReadableWebToNodeStream(file.stream())
    // @ts-ignore
    return await workbook.xlsx.read(filestream).then(() => {
        // WORKSHEET 1 - Turnstile Data is on Sheet1.
        const worksheet = workbook.getWorksheet(1);


        // Set to keep track of duplicate entries.
        const seenRegNos: Set<string> = new Set();

        // Variables
        const date: string = worksheet.getRow(5).getCell(1).toString().slice(-10,)
        const data: TurnstileData = {};

        // Regex to extract the name from the cell.
        const nameExtractor = new RegExp(/(?:(?:(\w-)|(-\w))\d*\w? )?(?<Name>[A-Z .]+)$/g);

        // Helper function to get the value of a cell and convert it to uppercase.
        const getUpperCell = (row: Row, col: number): string => row.getCell(col).toString().toUpperCase();

        // Loop through the rows and extract the data.
        for (let i = 8; i <= worksheet.rowCount; i++) {
            const row: Row = worksheet.getRow(i);
            const regNo: string = getUpperCell(row, 2);
            if (seenRegNos.has(regNo)) continue;
            const name: string = getUpperCell(row, 1).replace(nameExtractor, "$<Name>");
            const time: string = getUpperCell(row, 6);
            const checkpoint: string = getUpperCell(row, 10);
            const isEntry: boolean = /ENTRY/.test(checkpoint);
            const status: string = isEntry ? "PRESENT" : "ABSENT";
            seenRegNos.add(regNo);
            data[regNo] = {name, time, isEntry, isNewEntry: false, isOnLeave: false, status};
        }
        return [date, data];
    });
}

export default processTurnstyleDataHelper;
