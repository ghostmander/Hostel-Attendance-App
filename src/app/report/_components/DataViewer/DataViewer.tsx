import React from 'react';
import "./Dataviewer.scss";


interface DataViewerProps {
    rawData: TurnstileData;
    filters: {
        name: string | undefined;
        regno: string | undefined;
        status: string | undefined;
        showNE: boolean;
    }
    showBlock?: boolean;
}


export const DataViewer: React.FC<DataViewerProps> = ({rawData, filters, showBlock}) => {
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
                        <th>Status</th>
                        {showBlock && <th>Block</th>}
                    </tr>
                    </thead>
                    <tbody id={"hostel-data-body"}>
                    {
                        (data === undefined) ? <tr>
                                <td colSpan={showBlock ? 4: 3} style={{textAlign: "center"}}>No Data Found</td>
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
        </>
    )
}

export default DataViewer;
