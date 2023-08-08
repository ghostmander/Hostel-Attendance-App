import React from 'react';
import "./Dataviewer.scss";
import readRecords from "src/functions/readRecords";
import Filters from "../Filters";
// import {FormData} from "next/dist/compiled/@edge-runtime/primitives";
// import axios from "axios";


interface DataViewerProps {
    isDateNeeded: boolean;
    date: string;
    searchParams: {
        name: string | undefined;
        regno: string | undefined;
        status: string | undefined;
        date: string | undefined;
        block: "BHB1" | "BHB2" | "BHB3" | "GHB1" | undefined
    }
}


export const DataViewer: React.FC<DataViewerProps> = async ({isDateNeeded, date, searchParams}) => {
    // @ts-ignore
    const blockSelection: { [key: string]: string } = {
        "BHB1": "Boys Block-1",
        "BHB2": "Boys Block-2",
        "BHB3": "Boys Block-3",
        "GHB1": "Girls Block-1"
    }
    const downloadFormats: string[] = ["Excel", "PDF", "CSV"];

    const filters = {
        name: searchParams.name ?? undefined,
        regno: searchParams.regno ?? undefined,
        status: searchParams.status ?? undefined,
        block: searchParams.block || "BHB1",
        date: searchParams.date || date
    }

    // const [block, setBlock] = useState("BHB1");

    /*
    const formdata = new FormData()
    formdata.append("date", filters.date.toString().split("-").reverse().join(""))
    try {
        const data = await axios.post('/api/getData', formdata)
        console.log(data)
        // Process the response as needed
    } catch (error) {
        console.error('Error uploading file:', error);
    }
    */
    const rawData = readRecords(filters.date.toString().split("-").reverse().join(""));
    let data: TurnstileData | undefined;
    // Filter out the data based on the filters
    if (rawData) {
        for (const [key, value] of Object.entries(rawData)) {
            if (filters.name && !value.name.includes(filters.name.toUpperCase())) continue;
            if (filters.regno && !key.includes(filters.regno.toUpperCase())) continue;
            if (filters.status && !(value.status === filters.status.toUpperCase())) continue;
            if (!(value.blVal === filters.block)) continue
            if (data === undefined) data = {};
            data[key] = value;
        }
    }
    return (
        <>
            <Filters isDateNeeded={isDateNeeded} defaultVals={filters}/>
            <div id="main-data">
                {/* <div id={"blockbtns"}>
                    {
                        Object.entries(blockSelection).map(([key, value], index) => {
                            return (
                                <React.Fragment key={index}>
                                    <input type="radio" name="block" id={`${key}-radio`} value={key}
                                           defaultChecked={key === "BHB1"} onChange={() => setBlock(key)}/>
                                    <label htmlFor={`${key}-radio`}>{value}</label>
                                </React.Fragment>
                            )
                        })
                    }
                </div> */}
                <div id={"downloadbtns"} style={{paddingTop: "2rem"}}>
                    <p>Download As:</p>
                    {
                        downloadFormats.map((value, index) => {
                            return <button id={`download-as-${value}`} key={index}>{value}</button>
                        })
                    }
                </div>
                <div id={"tableview"}>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody id={"hostel-data-body"}>
                        {
                            (data === undefined) ? <tr>
                                    <td colSpan={3}>No Data Found</td>
                                </tr> :
                                Object.entries(data).map(([key, value], index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{key}</td>
                                            {/*@ts-ignore*/}
                                            <td>{value.name}</td>
                                            <td className={
                                                // @ts-ignore
                                                value.status.replace("NE_", "").toLowerCase()
                                                // @ts-ignore
                                            }>{value.status}</td>
                                        </tr>
                                    )
                                })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default DataViewer;
