import {NextResponse} from "next/server";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export async function POST(request: Request) {
    // @ts-ignore
    const {username, password} = JSON.parse(await request.text());

    // Replace 'staticUsername' and 'staticPassword' with your actual static values
    if (username === 'admin' && password === 'admin') {
        return NextResponse.json({
            token: 'admin',
            message: 'Logged in successfully as admin',
            success: true,
            status: 200,
        })
    } else {
        return NextResponse.json({
            token: "invalid",
            message: 'Invalid username or password',
            success: false,
            status: 401,
        });
    }
}

export async function GET() {
    cookies().delete('user');
    redirect('/login')
}
