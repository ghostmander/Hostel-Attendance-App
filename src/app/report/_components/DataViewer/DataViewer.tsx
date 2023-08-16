import React from 'react';
import "./Dataviewer.scss";


interface DataViewerProps {
    date: string;
    rawData: TurnstileData;
    filters: {
        name: string | undefined;
        regno: string | undefined;
        status: string | undefined;
        showNE: boolean;
    };
}


export const DataViewer: React.FC<DataViewerProps> = ({date, rawData, filters}) => {
    const {name, regno, status, showNE} = filters
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
    return (
        <>
            <div id={"tableview"}>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Last Seen</th>
                        <th>Block</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody id={"hostel-data-body"}>
                    {
                        (data === undefined) ? <tr>
                                <td colSpan={5} style={{textAlign: "center"}}>No Data Found</td>
                            </tr> :
                            Object.entries(data).map(([key, value]: [string, PersonData], index) => {
                                let status = value.status;
                                if (value.status === "UNKNOWN") status = "ABSENT"
                                // @ts-ignore
                                return (
                                    <tr key={index}>
                                        <td>{key}</td>
                                        <td>{value.name}</td>
                                        {/*@ts-ignore*/}
                                        <td>{`${value.time ? date: new Date((new Date(date)) - (3600000*24)).toISOString().split('T')[0]} ${value.time}`}</td>
                                        <td>{value.blVal}</td>
                                        <td className={
                                            value.status.replace("NE_", "").toLowerCase()
                                        }>{status}</td>
                                    </tr>
                                )
                            })
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default DataViewer;
