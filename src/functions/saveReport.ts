import { Workbook } from "exceljs";

//@ts-ignore
export const generatePDF = (data,filters) => {
    const total = Object.keys(data).length;
    // @ts-ignore
    const present = Object.values(data).filter((value) => value.status === "PRESENT").length;
    // @ts-ignore
    const absent = Object.values(data).filter((value) => value.status === "ABSENT").length;
    

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

    let filename = `Report_${filters.block}_${filters.date}.pdf`;

    // create and return the pdf file

    const pdf = require('html-pdf');
    const options = { format: 'Letter' };

    // @ts-ignore
    pdf.create(htmlString, options).toFile(filename, function (err, res) {
        if (err) return console.log(err);
        console.log(res);
    });

    return filename;
}

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

    workbook.xlsx.writeFile(filename)
        .then(function () {
            console.log("file saved!");
        });

    return filename;


}
