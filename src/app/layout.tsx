import React from "react";
import Header from "./_components/Header";
import "./globals.css"
import {cookies} from "next/headers";

export const metadata = {
    title: 'Hostel Attendance App',
    description: 'Made with ❤️ in India',
}

interface RootLayoutProps {
    children: React.ReactNode
}


export default function RootLayout({children}: RootLayoutProps) {
    const routes = [
        {name: `Home`, path: `/`},
        {name: `View Report`, path: `/report/old`},
        {name: `Upload Data`, path: `/upload`},
        {name: `Sign Out`, path: `/upload/leave`},
    ];
    if (cookies().get("user")?.value === "admin")
        routes.push({name: `Admin`, path: `/admin`})
    return (
        <html lang="en">
            <body>
            <Header navbarProps={{routes: routes}} isLogin={!cookies().get("user")}/>
                {children}
            </body>
        </html>
    )
}
