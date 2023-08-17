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
            const response = await fetch('/api/download');
            
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            
            // the filename you want
            a.download = `Report_${block}_${date}.${format === "Excel" ? "xlsx" : "pdf"}`;
            
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            console.log('Your file has downloaded!');



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
      <button onClick={handleClick} key={index} >
        {format}
      </button>
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
                                    DownloadButton(format, data || {}, date, block, index)
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
                }}/>
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
                <DataViewer date={date} rawData={data || {}}
                            filters={{name: name, regno: regno, status: status, showNE: showNE}}/>
            </div>
        </div>
    )
}

export default ReportGraph;
