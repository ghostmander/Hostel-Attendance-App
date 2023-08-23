import {Workbook} from "exceljs";
import puppeteer from "puppeteer";

export const generatePDF = async (data: PersonData[], date: string, block: string) => {

    // @ts-ignore
    const total = Object.keys(data).length;
    // @ts-ignore
    const present = Object.values(data).filter((value) => value.status === "PRESENT").length;
    // @ts-ignore
    const absent = Object.values(data).filter((value) => value.status === "ABSENT").length;

    const filename = `Report_${block}_${date}`;

    let htmlString = "";
    htmlString += `<h1>Attendance Report ${block} ${date}</h1>`;
    htmlString += `<p>Total: ${total}</p>`;
    htmlString += `<p>Present: ${present}</p>`;
    htmlString += `<p>Absent: ${absent}</p>`;
    htmlString += `<table><thead><tr><th>ID</th><th>Name</th><th>Last Seen</th><th>Status</th></tr></thead><tbody>`;

    // @ts-ignore
    for (const [key, value] of Object.entries(data)) {
        // @ts-ignore
        htmlString += `<tr><td>${key}</td><td>${value.name}</td><td>${value.time ? date : new Date((new Date(date)) - (3600000 * 24)).toISOString().split('T')[0]} ${value.time}</td><td>${value.status}</td></tr>`
    }

    htmlString += `</tbody></table>`;

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <style>
    table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
        }
    </style>
    <title>PDF File</title>
    </head>
    <body>
    ${htmlString}
    </body>
    </html>
    `;

    await (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(html);
        // await page.pdf({ path: `public/reports/${filename}.pdf`, format: 'A4' });
        await page.pdf({path: `public/reports/${filename}.pdf`, format: 'A4'});
        await browser.close();
    })();

    return `${filename}.pdf`;

};

//@ts-ignore
export const generateExcel = async (data, date, block) => {
    const total = Object.keys(data).length;
    // @ts-ignore
    const present = Object.values(data).filter((value) => value.status === "PRESENT").length;
    // @ts-ignore
    const absent = Object.values(data).filter((value) => value.status === "ABSENT").length;

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');
    // @ts-ignore
    worksheet.addRow([`Attendance Report ${block} ${date}`]);
    worksheet.addRow(["Total", total]);
    worksheet.addRow(["Present", present]);
    worksheet.addRow(["Absent", absent]);

    // Add data
    worksheet.addRow(["ID", "Name", "LastSeen", "Status"]);
    // @ts-ignore
    for (const [key, value] of Object.entries(data)) {
        // @ts-ignore
        worksheet.addRow([key, value.name, `${value.time ? date : new Date((new Date(date)) - (3600000 * 24)).toISOString().split('T')[0]} ${value.time}`, value.status]);
    }
    let filename = `Report_${block}_${date}.xlsx`;

    // create and return the excel file
    await workbook.xlsx.writeFile(`public/reports/${filename}`)
        .then(() => {
            console.log("File saved!");
        })
        .catch((err) => {
                console.log(err);
            }
        );

    return filename;

}
