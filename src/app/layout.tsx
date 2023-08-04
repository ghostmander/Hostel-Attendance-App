import React from "react";
import Header from "./_components/Header";
import "./globals.css"

export const metadata = {
    title: 'Hostel Attendance App',
    description: 'Made with ❤️ in India',
}

interface RootLayoutProps {
    children: React.ReactNode
}


export default function RootLayout({children}: RootLayoutProps) {
    return (
        <html lang="en">
        <body>
        <Header/>
        {children}
        </body>
        </html>
    )
}
