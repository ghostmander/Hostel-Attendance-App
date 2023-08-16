import resetAllFiles from "../../../functions/resetFiles";
import {NextResponse} from "next/server";

export async function POST() {
    resetAllFiles();
    return NextResponse.json({
        success: true,
        status: 200,
    });

}
