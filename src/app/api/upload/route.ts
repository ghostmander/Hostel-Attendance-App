import {NextResponse} from "next/server";
import {processLeaveDatabase, processMasterDatabase, processTurnstyleData} from "src/functions";

// @ts-ignore
export async function POST(request: Request) {
    try {
        const formdata = await request.formData();

        // Leave files
        const numLeaveFiles = parseInt(formdata.get('numLeaveFiles') as string)
        const leaveFiles: File[] = []
        for (let i = 0; i < numLeaveFiles; i++) leaveFiles.push(formdata.get(`leavefile${i}`) as File)

        // Turnstile files
        const numTurnstileFiles = parseInt(formdata.get('numTurnstileFiles') as string)
        const turnstileFiles: File[] = []
        for (let i = 0; i < numTurnstileFiles; i++) turnstileFiles.push(formdata.get(`turnstilefile${i}`) as File)

        // Hostel files
        const numMasterFiles = parseInt(formdata.get('numMasterFiles') as string)
        const masterFiles: File[] = []
        for (let i = 0; i < numMasterFiles; i++) masterFiles.push(formdata.get(`masterfile${i}`) as File)


        // Process files
        for (const leaveFile of leaveFiles) await processLeaveDatabase(leaveFile)
        for (const turnstileFile of turnstileFiles) await processTurnstyleData(turnstileFile)
        for (const masterFile of masterFiles) await processMasterDatabase(masterFile)

        return NextResponse.json({
            message: 'Files uploaded successfully',
            success: true
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error, status: 500})
    }
}
