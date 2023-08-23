"use client"
import React, {useState} from 'react';
import "./ReportGraph.scss";
import DataViewer from "../DataViewer";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ReportGraphProps {

}

const DownloadButton = (format: string, data: TurnstileData, date: string, block: string, index: number) => {
    // Handle click event
    const handleClick = async () => {
        // Create request body
        const requestBody = {
            // Add your parameters here
            format: format,
            data: data,
            date: date,
            block: block

        };
        console.log(format + " " + date + " " + block);
        try {
            // Send POST request
            const response = await fetch('/api/download', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            // Check if request was successful
            if (response.ok) {
                console.log(response.body);
                response.json().then(data => {
                    console.log(data.filepath);
                    const link = document.createElement('a');
                    link.href = data.filepath;
                    link.download = data.filename;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                })

            } else {
                // Handle error
                console.error('Error:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    // Render download button
    return (
        <div className="stack" onClick={handleClick} key={index}>
            {format}
        </div>
    );
};


export const ReportGraph: React.FC<ReportGraphProps> = ({}) => {
    // @ts-ignore
    const [data, setData] = useState<TurnstileData | undefined>(undefined);
    // @ts-ignore
    const [date, setDate] = useState("2023-07-21");
    const [block, setBlock] = useState("");
    const [status, setStatus] = useState("");
    const [showNE, setShowNE] = useState(true);
    const [name, setName] = useState("");
    const [regno, setRegno] = useState("");
    fetch('/api/getData', {
        method: 'POST',
        body: JSON.stringify({date: date, block: block})
    }).then(response => {
        response.json().then(data => {
            setData(data.data)
        })
    })


    const filterData = ( rawData: TurnstileData ) => {
        let data: TurnstileData | undefined;
        // Filter out the data based on the filters
        if (rawData) {
            for (const [key, value] of Object.entries(rawData)) {
                if (name && !value.name.includes(name.toUpperCase())) continue;
                if (regno && !key.includes(regno.toUpperCase())) continue;
                if (!showNE) {
                    if (status && !(value.status === status.toUpperCase())) continue;
                    else if (value.status.startsWith("NE_")) continue
                } else {
                    if (status && !(value.status.endsWith(status.toUpperCase()))) continue;
                }
                if (data === undefined) data = {};
                data[key] = value;
            }
        }
        return data || {};
    }


    const scrollableBtns = {
        "Overall": "",
        "BH Block 1": "BHB1",
        "BH Block 2": "BHB2",
        "BH Block 3": "BHB3",
        "GH Block 1": "GHB1"
    }
    const getCount = (status: string) => {
        let count = 0
        if (status === "All") return Object.keys(data || {}).length
        for (const [_, value] of Object.entries(data || {})) {
            if ((value.status.endsWith(status.toUpperCase()))) count++;
            else if (status.toUpperCase() === "ABSENT" && value.status === "UNKNOWN") count++;
        }
        return count;
    }
    const formats = ['Excel', 'PDF'];
    // @ts-ignore
    return (
        <div id="reportGraph">
            <div id="filters">
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

                            {
                                formats.map((format, index) => (
                                    DownloadButton(format, filterData(data || {}), date, block, index)
                                ))
                            }

                        </div>
                    </div>
                </div>

            </div>
            <div id={"graph"}>
                <Doughnut data={{
                    labels: ['Present', 'Absent', 'Leave', 'Leave_Reported'],
                    datasets: [
                        {
                            label: '# of Students',
                            data: [getCount('Present'), getCount('Absent'), getCount('Leave'), getCount('Leave_Reported')],
                            backgroundColor: [
                                'rgba(133, 205, 61, 0.2)',
                                'rgba(245, 109, 109, 0.2)',
                                'rgba(239, 202, 72, 0.2)',
                                'rgba(86, 131, 204, 0.2)',
                            ],
                            borderColor: [
                                'rgba(133, 205, 61, 1)',
                                'rgba(245, 109, 109, 1)',
                                'rgba(239, 202, 72, 1)',
                                'rgba(86, 131, 204, 1)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                }} options={{
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {font: {size: 19}}
                        }
                    }
                }} />
                <div id={"counts"}>
                    {
                        ['All', 'Present', 'Absent', 'Leave', 'Leave_Reported'].map((v, idx) =>
                            <p key={idx} onClick={() => {
                                setStatus(v === "All" ? "" : v)
                            }}><b>{v}:</b> {getCount(v)}</p>)
                    }
                </div>
            </div>
            <div id="table">
                <div id="row2">
                    <input type="text" name="name" id="filter-name" placeholder="Name" defaultValue={name}
                           onChange={e => setName(e.target.value)}/>
                    <input type="text" name="regno" id="filter-regno" placeholder="Registration Number"
                           defaultValue={regno} onChange={e => setRegno(e.target.value)}/>
                    <label>
                        Show New Entries
                        <input type="checkbox" name="showNE" id="filterNE" defaultChecked={showNE}
                               onChange={() => setShowNE(!showNE)}/>
                    </label>
                </div>
                <DataViewer date={date} data={filterData(data || {})}/>
            </div>
        </div>
    )
}

export default ReportGraph;
