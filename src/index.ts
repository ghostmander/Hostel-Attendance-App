import processTurnstyleData from './functions/processTurnstyleData';
import processMasterDatabase from "./functions/processMasterDatabase";
import processLeaveDatabase from "./functions/processLeaveDatabase";
import saveRecords from "./functions/saveRecords";

const fs = require('fs');

const files: string[] = [
    "testingexcel/Hoste Data 28.07.2023.xlsx",
    "testingexcel/LEAVE DATA.xlsx",
    "testingexcel/Raw Record Report_2023_07_21-2023_07_21.xlsx"
]


interface MainParams {
    updateMaster?: boolean,
    updateLeave?: boolean,
    filepaths?: string[]
}


// Add a filepaths array to store the filepaths of the excel files to the named parameters. Also put explicit typing.
const main = async ({updateMaster = false, updateLeave = false, filepaths = files}: MainParams): Promise<void> => {
    // Initial Checks for database and logs folder
    if (!fs.existsSync("database")) fs.mkdirSync("database");
    if (!fs.existsSync("logs")) fs.mkdirSync("logs");

    // If database/master.json and database/leave.json does not exist, create them
    if (updateMaster && !fs.existsSync("database/master.json")) await processMasterDatabase(filepaths[0])
    if (updateLeave && !fs.existsSync("database/leave.json")) await processLeaveDatabase(filepaths[1])

    // Read the database/master.json and database/leave.json
    const masterDatabase: MasterData = JSON.parse(fs.readFileSync("database/master.json", "utf-8"));
    const masterRegNos: Set<string> = new Set(Object.keys(masterDatabase))
    const leaveDatabase: Set<string> = new Set(JSON.parse(fs.readFileSync("database/leave.json", "utf-8")));

    // Process the turnstile data
    const [date, turnstileDatabase]: [string, TurnstileData] = await processTurnstyleData(filepaths[2])

    // onLeave and isNewEntry are not set in processTurnstyleData, so we set them here
    for (const regNo of Object.keys(turnstileDatabase)) {
        turnstileDatabase[regNo].isNewEntry = !masterRegNos.has(regNo);
        turnstileDatabase[regNo].isOnLeave = leaveDatabase.has(regNo);
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
    await saveRecords(date, turnstileDatabase)
}
main({}).then().catch(console.error)
