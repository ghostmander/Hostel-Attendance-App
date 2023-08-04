const fs = require('fs');
export const saveRecords = async (date:string, data: TurnstileData) => {
    date = date.replace(/\//g, "");
    fs.writeFile(`logs/${date}.json`, JSON.stringify(data, null, 0), (err: any) => {
        if (err) throw err;
        console.log(`Saved records to logs/${date}.json`);
    });
}

export default saveRecords;
