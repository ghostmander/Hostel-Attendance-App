const fs = require("fs");

const resetAllFiles = () => {
    fs.existsSync(`database/leave.json`) && fs.unlinkSync(`database/leave.json`);
    fs.existsSync(`database/master.json`) && fs.unlinkSync(`database/master.json`);
    const date = new Date().toISOString().slice(0, 10).split("-").reverse().join("");
    fs.existsSync(`logs/${date}.json`) && fs.unlinkSync(`logs/${date}.json`);
}

export default resetAllFiles
