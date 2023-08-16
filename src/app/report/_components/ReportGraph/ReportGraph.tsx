"use client"
import React, {useState} from 'react';
import "./ReportGraph.scss";
import DataViewer from "../DataViewer";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ReportGraphProps {

}

export const ReportGraph: React.FC<ReportGraphProps> = ({}) => {
    // @ts-ignore
    const [data, setData] = useState<TurnstileData | undefined>(undefined);
    // @ts-ignore
    const [date, setDate] = useState<string>("2023-07-21");
    const [block, setBlock] = useState<string | undefined>(undefined);
    fetch('/api/getData', {
        method: 'POST',
        body: JSON.stringify({date: date, block: block})
    }).then(response => {
        response.json().then(data => {
            setData(data.data)
        })
    })
    const scrollableBtns = {
        "Overall": undefined,
        "BH Block 1": "BHB1",
        "BH Block 2": "BHB2",
        "BH Block 3": "BHB3",
        "GH Block 1": "GHB1"
    }

    const getCount = (status: 'Present' | 'Absent' | 'Leave' | 'Leave_Reported' | 'Unknown') => {
        let count = 0
        for (const [_, value] of Object.entries(data || {}))
            if ((value.status.endsWith(status.toUpperCase()))) count++;
        return count;
    }
    return (
        <div id="reportGraph">
            <div id="row1">
                <div id="blockFilters">
                    {
                        Object.entries(scrollableBtns).map(([key, value], index) => {
                            return <div key={index} className={`filter ${(value === block) && 'active'}`}
                                        onClick={() => {
                                            setBlock(value)
                                        }}>{key} </div>
                        })
                    }
                </div>
                <div id="dateFilters">
                    <input type="date" name="date" id="filter-date" defaultValue={date} onChange={(e) => {
                        setDate(e.target.value)
                    }}/>
                </div>
                <div id="downloadBtns">
                    <div className="mainBtn">
                        <span>Download Report</span>
                        <div className="stack">Excel</div>
                        <div className="stack">PDF</div>
                    </div>
                </div>
            </div>
            <div id={"graph"}>
                <Doughnut data={{
                    labels: ['Present', 'Absent', 'On Leave', 'Leave Reported', 'Unknown'],
                    datasets: [
                        {
                            label: '# of Students',
                            data: [getCount('Present'), getCount('Absent'), getCount('Leave'), getCount('Leave_Reported'), getCount('Unknown')],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                }}/>
            </div>
            <div id="table">
                <DataViewer rawData={data || {}} filters={{name: undefined, regno: undefined, status: ""}}/>
            </div>
        </div>
    )
}

export default ReportGraph;
