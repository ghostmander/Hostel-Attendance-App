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
    const masterRegNosCopy: Set<string> = new Set(Object.keys(masterDatabase))

    // Process the turnstile data
    let [date, turnstileDatabase]: [string, TurnstileData] = await processTurnstyleDataHelper(file)


    console.log(masterRegNos.size)
    // onLeave and isNewEntry are not set in processTurnstyleData, so we set them here
    for (const regNo of Object.keys(turnstileDatabase)) {
        const studentData = turnstileDatabase[regNo];
        if (studentData) {
            if (masterRegNos.has(regNo)) masterRegNosCopy.delete(regNo);
            else studentData.isNewEntry = true;
            studentData.isOnLeave = leaveDatabase.has(regNo);
            if (studentData.isEntry && !studentData.isOnLeave) studentData.status = "PRESENT";
            else if (!studentData.isEntry && !studentData.isOnLeave) studentData.status = "ABSENT";
            else if (studentData.isEntry && studentData.isOnLeave) studentData.status = "LEAVE_REPORTED";
            else if (!studentData.isEntry && studentData.isOnLeave) studentData.status = "LEAVE";
            if (studentData.isNewEntry) studentData.status = `NE_${studentData.status}`;
        }
    }
    if (masterRegNosCopy.size > 0) {
        for (const regNo of masterRegNosCopy) {
            let block = masterDatabase[regNo].block;
            let bl: "" | "BHB1" | "BHB2" | "BHB3" | "GHB1" = ""
            if (/BH ?BLOCK.*?1/i.test(block)) bl = "BHB1";
            else if (/BH ?BLOCK.*?2/i.test(block)) bl = "BHB2";
            else if (/BH ?BLOCK.*?3/i.test(block)) bl = "BHB3";
            else if (/GH ?BLOCK.*?1/i.test(block)) bl = "GHB1";
            turnstileDatabase[regNo] = {
                blVal: bl,
                name: masterDatabase[regNo].name,
                isNewEntry: false,
                isEntry: false,
                isOnLeave: leaveDatabase.has(regNo),
                status: "UNKNOWN"
            };
        }
    }
    const oldData = readRecords( date.replace(/\//g, ""));
    if (oldData) for (const regNo of Object.keys(oldData)) {
        if (!turnstileDatabase[regNo]) turnstileDatabase[regNo] = oldData[regNo];
        else if (turnstileDatabase[regNo].status === "UNKNOWN") turnstileDatabase[regNo] = oldData[regNo];
    }
    await saveRecords(date, turnstileDatabase);

}

export default processTurnstyleData;
