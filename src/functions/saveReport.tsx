import { Workbook } from "exceljs";
import puppeteer from "puppeteer";

export const generatePDF = (data: PersonData[], filters: {date: string, block: string}) => {
    
    // @ts-ignore
    const total = Object.keys(data).length;
    // @ts-ignore
    const present = Object.values(data).filter((value) => value.status === "PRESENT").length;
    // @ts-ignore
    const absent = Object.values(data).filter((value) => value.status === "ABSENT").length;

    const filename = `Attendance Report ${filters.block} ${filters.date}`;

    let htmlString = "";
    htmlString += `<h1>Attendance Report</h1>`;
    htmlString += `<p>Total: ${total}</p>`;
    htmlString += `<p>Present: ${present}</p>`;
    htmlString += `<p>Absent: ${absent}</p>`;
    htmlString += `<table><thead><tr><th>ID</th><th>Name</th><th>Status</th></tr></thead><tbody>`;

    // @ts-ignore
    for (const [key, value] of Object.entries(data)) {
        // @ts-ignore
        htmlString += `<tr><td>${key}</td><td>${value.name}</td><td>${value.status}</td></tr>`
    }

    htmlString += `</tbody></table>`;

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
    <style>
    table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
        }
    </style>
    </head>
    <body>
    ${htmlString}
    </body>
    </html>
    `;

    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(html);
        await page.pdf({ path: `reports/${filename}.pdf`, format: 'A4' });
        await browser.close();
    })();
    return `${filename}.pdf`;

};

//@ts-ignore
export const generateExcel = (data, filters) => {
    const total = Object.keys(data).length;
    // @ts-ignore
    const present = Object.values(data).filter((value) => value.status === "PRESENT").length;
    // @ts-ignore
    const absent = Object.values(data).filter((value) => value.status === "ABSENT").length;

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');
    // @ts-ignore
    worksheet.addRow([`Attendance Report ${filters.block} ${filters.date}`]);
    worksheet.addRow(["Total", total]);
    worksheet.addRow(["Present", present]);
    worksheet.addRow(["Absent", absent]);

    // Add data
    worksheet.addRow(["ID", "Name", "Status"]);
    // @ts-ignore
    for (const [key, value] of Object.entries(data)) {
        // @ts-ignore
        worksheet.addRow([key, value.name, value.status]);
    }
    let filename = `Report_${filters.block}_${filters.date}.xlsx`;

    // create and return the excel file

    workbook.xlsx.writeFile("reports/"+filename)
        .then(function () {
            console.log("file saved!");
        });

    return filename;


}
