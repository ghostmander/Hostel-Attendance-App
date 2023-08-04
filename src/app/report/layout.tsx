import type {Metadata} from 'next'
import React from "react";


export const metadata: Metadata = {
    title: 'Hostel Attendance App',
    description: 'Made with ❤️ by Mewtkursh',
}

export default function ReportLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <h1>Report</h1>
            {children}
        </div>
    )
}
