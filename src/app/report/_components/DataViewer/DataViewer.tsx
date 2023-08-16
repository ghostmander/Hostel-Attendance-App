import React from 'react';
import "./Dataviewer.scss";


interface DataViewerProps {
    rawData: TurnstileData;
    filters: {
        name: string | undefined;
        regno: string | undefined;
        status: string | undefined;
    }
}


export const DataViewer: React.FC<DataViewerProps> = ({rawData, filters}) => {
    const {name, regno, status} = filters
    let data: TurnstileData | undefined;
    // Filter out the data based on the filters
    if (rawData) {
        for (const [key, value] of Object.entries(rawData)) {
            if (name && !value.name.includes(name.toUpperCase())) continue;
            if (regno && !key.includes(regno.toUpperCase())) continue;
            if (status && !(value.status === status.toUpperCase())) continue;
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
        </>
    )
}

export default DataViewer;
