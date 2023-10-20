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
            const regNo: string = getUpperCell(row, 1);
            if (seenRegNos.has(regNo)) continue;
            const name: string = getUpperCell(row, 2).replace(nameExtractor, "$<Name>");
            const block: string = getUpperCell(row, 5).split("/")[1]
            let blVal: "BHB1" | "BHB2" | "BHB3" | "GHB1" | "" = "";
            if (block === "BLOCK 1") blVal = "BHB1"
            else if (block === "BLOCK 2") blVal = "BHB2"
            else if (block === "BLOCK 3") blVal = "BHB3"
            else if (block === "GHBLOCK 1") blVal = "GHB1"
            const status: string = (getUpperCell(row, 18) === "A") ? "ABSENT" : "PRESENT";
            const isEntry: boolean = status === "PRESENT";
            seenRegNos.add(regNo);
            data[regNo] = {name, blVal, isEntry, isNewEntry: false, isOnLeave: false, status};
        }
        return [date, data];
    });
}

export default processTurnstyleDataHelper;
