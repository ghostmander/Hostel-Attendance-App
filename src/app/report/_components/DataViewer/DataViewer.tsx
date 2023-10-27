import React from 'react';
import "./Dataviewer.scss";


interface DataViewerProps {
    date: string;
    data: TurnstileData;
}


export const DataViewer: React.FC<DataViewerProps> = ({date, data}) => {
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
                                return (
                                    <tr key={index}>
                                        <td>{key}</td>
                                        <td>{value.name}</td>
                                        {/*@ts-ignore*/}
                                        <td>{`${new Date((new Date(date)) - (3600000*24)).toISOString().split('T')[0]}`}</td>
                                        <td>{value.blVal}</td>
                                        <td className={
                                            value.status.toLowerCase()
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
