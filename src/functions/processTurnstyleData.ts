import fs from "fs";
import saveRecords from "./saveRecords";
import processTurnstyleDataHelper from "./processTurnstyleDataHelper";

const processTurnstyleData = async (file: File) => {
    const masterDatabase: MasterData = (!fs.existsSync("database/master.json"))
        ? {} : JSON.parse(fs.readFileSync("database/master.json", "utf-8"));
    const leaveDatabase: Set<string> = (!fs.existsSync("database/leave.json"))
        ? new Set<string>() : new Set(JSON.parse(fs.readFileSync("database/leave.json", "utf-8")));
    // Read the database/master.json and database/leave.json
    const masterRegNos: Set<string> = new Set(Object.keys(masterDatabase))

    // Process the turnstile data
    const [date, turnstileDatabase]: [string, TurnstileData] = await processTurnstyleDataHelper(file)

    // onLeave and isNewEntry are not set in processTurnstyleData, so we set them here
    for (const regNo of Object.keys(turnstileDatabase)) {
        const studentData = turnstileDatabase[regNo];
        if (studentData) {
            studentData.isNewEntry = !masterRegNos.has(regNo);
            studentData.isOnLeave = leaveDatabase.has(regNo);
            if (studentData.isEntry && !studentData.isOnLeave) studentData.status = "PRESENT";
            else if (!studentData.isEntry && !studentData.isOnLeave) studentData.status = "ABSENT";
            else if (studentData.isEntry && studentData.isOnLeave) studentData.status = "LEAVE_REPORTED";
            else if (!studentData.isEntry && studentData.isOnLeave) studentData.status = "LEAVE";
            if (studentData.isNewEntry) studentData.status = `NE_${studentData.status}`;
        }
    }
    await saveRecords(date, turnstileDatabase)

}

export default processTurnstyleData;
