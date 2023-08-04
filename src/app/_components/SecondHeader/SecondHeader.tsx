import React from 'react';
import './SecondHeader.scss'

interface SecondHeaderProps {
    title?: string;
    needButton?: boolean;
}


export const SecondHeader: React.FC<SecondHeaderProps> = ({title, needButton}) => {
    return (
        <h2 id="title">
            {title || "Hostel Attendance App"}
            {(needButton && <button id="button">Generate Report</button>) || null}
        </h2>
    )
}

export default SecondHeader;
