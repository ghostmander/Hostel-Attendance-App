import {NextResponse} from "next/server";


// TODO: Implement DELETE route
// @ts-ignore
export async function GET(req: Request){
    try {

        // Get filepath from request body

        // Delete file


        return new NextResponse("Forbidden", {status: 403});

    } catch (error) {
        console.error(error);
        return new NextResponse(error.message, {status: 500});
    }
}
