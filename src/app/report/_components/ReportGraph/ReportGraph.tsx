"use client"
import React, {useState} from 'react';
import "./ReportGraph.scss";
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



    return (
        <div id="reportGraph">
            <div id="row1">
                <div id="blockFilters">
                    {
                        Object.entries(scrollableBtns).map(([key, value], index) => {
                            return <div key={index} className={`filter ${(value === block) && 'active'}`} onClick={() => {
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

            </div>
        </div>
    )
}

export default ReportGraph;
