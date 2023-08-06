const fs = require("fs");

const readRecords = (date: string): TurnstileData | undefined => {
    if (!fs.existsSync(`logs/${date}.json`)) return undefined;
    return JSON.parse(fs.readFileSync(`logs/${date}.json`, "utf-8"));
}

export default readRecords;
