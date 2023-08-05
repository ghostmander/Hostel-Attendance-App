import fs from 'fs';

const readRecords = (date: string): TurnstileData => {
    if (!fs.existsSync(`logs/${date}.json`)) return {}
    return JSON.parse(fs.readFileSync(`logs/${date}.json`, "utf-8"));
}

export default readRecords;
