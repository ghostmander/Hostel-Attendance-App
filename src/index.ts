import processTurnstyleData from './functions/processTurnstyleData';
import processMasterDatabase from "./functions/processMasterDatabase";
import processLeaveDatabase from "./functions/processLeaveDatabase";
import saveRecords from "./functions/saveRecords";

const fs = require('fs');

const filepaths: string[] = [
    "testingexcel/Hoste Data 28.07.2023.xlsx",
    "testingexcel/LEAVE DATA.xlsx",
    "testingexcel/Raw Record Report_2023_07_21-2023_07_21.xlsx"
]


const main = async () => {
    if (!fs.existsSync("database")) fs.mkdirSync("database");
    if (!fs.existsSync("logs")) fs.mkdirSync("logs");
    if (!fs.existsSync("database/master.json")) await processMasterDatabase(filepaths[0])
    if (!fs.existsSync("database/leave.json")) await processLeaveDatabase(filepaths[1])
    const masterDatabase: MasterData = JSON.parse(fs.readFileSync("database/master.json", "utf-8"));

    // TODO: FIX THIS LEAVEDATABASE in JSON does not work... (#FIX THIS)
    const leaveDatabase: Set<string> = new Set(JSON.parse(fs.readFileSync("database/leave.json", "utf-8")));
    // console.log(leaveDatabase)
    const [date, turnstileDatabase]: [string, TurnstileData] = await processTurnstyleData(filepaths[2])
    // @ts-ignore
    const data = {masterDatabase, date, turnstileDatabase, leaveDatabase}
    const masterRegNos = new Set(Object.keys(masterDatabase))
    for (const regNo of Object.keys(turnstileDatabase)) {
        if (!masterRegNos.has(regNo))
            turnstileDatabase[regNo].isNewEntry = true;
        if (leaveDatabase.has(regNo))
            turnstileDatabase[regNo].isOnLeave = true;
    }
    for (const regNo of Object.keys(turnstileDatabase)) {
        const studentData = turnstileDatabase[regNo];
        if (studentData) {
            if (studentData.isEntry && !studentData.isOnLeave) studentData.status = "PRESENT";
            else if (!studentData.isEntry && !studentData.isOnLeave) studentData.status = "ABSENT";
            else if (studentData.isEntry && studentData.isOnLeave) studentData.status = "LEAVE_REPORTED";
            else if (!studentData.isEntry && studentData.isOnLeave) studentData.status = "LEAVE";
            if (studentData.isNewEntry) studentData.status = `NE_${studentData.status}`;
        }
    }
    // for (const regNo of Object.keys(turnstileDatabase)) console.log(`{ "${regNo}": ${JSON.stringify(turnstileDatabase[regNo])} },`)
    await saveRecords(date, turnstileDatabase)
}

main().then().catch(console.error)
