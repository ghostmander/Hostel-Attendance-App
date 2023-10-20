import {NextResponse} from "next/server";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {users} from "./users.json";

export async function POST(request: Request) {
    // @ts-ignore
    const {username, password} = JSON.parse(await request.text());

    // Loop over the users array and check if the username and password match
    for (const {uname, pword} of users) {
        if (username === uname && password === pword) {
            return NextResponse.json({
                token: uname,
                message: `Logged in successfully as ${uname}`,
                success: true,
                status: 200,
            })
        }
    }
    return NextResponse.json({
        token: "invalid",
        message: 'Invalid username or password',
        success: false,
        status: 401,
    });
}

export async function GET() {
    cookies().delete('user');
    redirect('/login')
}
