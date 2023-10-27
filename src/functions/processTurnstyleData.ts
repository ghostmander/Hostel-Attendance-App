import fs from "fs";
import processTurnstyleDataHelper from "./processTurnstyleDataHelper";
import {readRecords, saveRecords} from "./index";
import * as console from "console";

const processTurnstyleData = async (file: File) => {
    const masterDatabase: MasterData = (!fs.existsSync("database/master.json"))
        ? {} : JSON.parse(fs.readFileSync("database/master.json", "utf-8"));
    const leaveDatabase: Set<string> = (!fs.existsSync("database/leave.json"))
        ? new Set<string>() : new Set(JSON.parse(fs.readFileSync("database/leave.json", "utf-8")));
    // Read the database/master.json and database/leave.json
    const masterRegNos: Set<string> = new Set(Object.keys(masterDatabase))

    // Process the turnstile data
    let [date, turnstileDatabase]: [string, TurnstileData] = await processTurnstyleDataHelper(file)


    console.log(masterRegNos.size)
    // onLeave and isNewEntry are not set in processTurnstyleData, so we set them here
    for (const regNo of Object.keys(turnstileDatabase)) {
        if (!masterRegNos.has(regNo)) delete turnstileDatabase[regNo];
        const studentData = turnstileDatabase[regNo];
        if (studentData) {
            studentData.isOnLeave = leaveDatabase.has(regNo);
            if (studentData.isEntry && !studentData.isOnLeave) studentData.status = "PRESENT";
            else if (!studentData.isEntry && !studentData.isOnLeave) studentData.status = "ABSENT";
            else if (studentData.isEntry && studentData.isOnLeave) studentData.status = "LEAVE_REPORTED";
            else if (!studentData.isEntry && studentData.isOnLeave) studentData.status = "LEAVE";
        }
    }
    const oldData = readRecords(date.replace(/\//g, ""));
    if (oldData) for (const regNo of Object.keys(oldData)) {
        if (!turnstileDatabase[regNo]) turnstileDatabase[regNo] = oldData[regNo];
        else if (turnstileDatabase[regNo].status === "UNKNOWN") turnstileDatabase[regNo] = oldData[regNo];
    }
    await saveRecords(date, turnstileDatabase);
}

export default processTurnstyleData;
