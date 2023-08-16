import {readRecords} from "../../../functions";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
    const {date, block} = JSON.parse(await request.text());
    const data = readRecords(date.split("-").reverse().join("")) || {};
    const newData: TurnstileData = {}
    for (const [key, value] of Object.entries(data)) {
        if (block && !(value.blVal === block)) continue;
        newData[key] = value;
    }
    return NextResponse.json({
        data: newData,
        success: true,
        status: 200,
    });

}
