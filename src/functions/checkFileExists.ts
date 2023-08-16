const fs = require("fs");

const checkFileExists = (): {
    hostelData: boolean,
    leaveData: boolean
} => {
    const returnData = {
        hostelData: true,
        leaveData: true
    }
    if (!fs.existsSync(`database/leave.json`)) returnData.leaveData = false;
    if (!fs.existsSync(`database/master.json`)) returnData.hostelData = false;
    return returnData;
}

export default checkFileExists;
