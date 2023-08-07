import {Row, Workbook} from "exceljs";
import * as fs from "fs";
import {ReadableWebToNodeStream} from "readable-web-to-node-stream";


const processMasterDatabase = async (file: File): Promise<MasterData> => {
    if (!fs.existsSync("database")) fs.mkdirSync("database");
    if (!fs.existsSync("logs")) fs.mkdirSync("logs");

    const workbook: Workbook = new Workbook();
    const filestream = new ReadableWebToNodeStream(file.stream())
    // @ts-ignore
    return await workbook.xlsx.read(filestream).then(() => {
        let data: MasterData = {};
        const getUpperCell = (row: Row, col: number): string => row.getCell(col).toString().toUpperCase().trim();
        workbook.eachSheet((worksheet) => {
            worksheet.eachRow((row, rowNumber) => {
                    if (rowNumber === 1) return;
                    const regNo: string = getUpperCell(row, 1);
                    const name: string = getUpperCell(row, 2);
                    const block: string = worksheet.name.toUpperCase().trim();
                    data[regNo] = {name, block};
                }
            )
        });
        // Update database/master.json with the latest data if it exists, else create a new one
        if (fs.existsSync("database/master.json")) {
            const oldData: MasterData = JSON.parse(fs.readFileSync("database/master.json", "utf-8"));
            for (const regNo of Object.keys(data)) {
                if (!oldData[regNo]) oldData[regNo] = data[regNo];
            }
            data = oldData;
        }
        fs.writeFileSync("database/master.json", JSON.stringify(data, null, 0));
        return data;
    });
}


export default processMasterDatabase;
