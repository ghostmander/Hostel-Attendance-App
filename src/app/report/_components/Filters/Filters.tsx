import React from 'react';
import './Filters.scss';

interface FiltersProps {
    isDateNeeded: boolean;
    defaultVals: {
        name: string | undefined;
        regno: string | undefined;
        status: string | undefined;
        date: string | undefined;
        block: "BHB1" | "BHB2" | "BHB3" | "GHB1" | undefined
    }

}

export const Filters: React.FC<FiltersProps> = ({isDateNeeded, defaultVals}) => {
    const blockSelection: { [key: string]: string } = {
        "BHB1": "Boys Block-1",
        "BHB2": "Boys Block-2",
        "BHB3": "Boys Block-3",
        "GHB1": "Girls Block-1"
    }

    const {name, regno, status, date, block} = defaultVals;
    return (
        <div id="form-data">
            <form id="viewform">
                <input type="text" name="name" id="filter-name" placeholder="Name" defaultValue={name}/>
                <input type="text" name="regno" id="filter-regno" placeholder="Registration Number"
                       defaultValue={regno}/>
                {isDateNeeded && <input type="date" name="date" id="filter-date" defaultValue={date}/>}
                <select name="status" id="filter-status" defaultValue={status}>
                    <option value="">All</option>
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="leave">On Leave</option>
                    <option value="leave_reported">Leave But Reported</option>
                    <option value="ne_present">New Entry - Present</option>
                    <option value="ne_absent">New Entry - Absent</option>
                    <option value="ne_leave">New Entry - On Leave</option>
                    <option value="ne_leave_reported">New Entry - Reported from Leave</option>
                    <option value="unknown">Unkown</option>
                </select>
                <select name="block" id="filter-block" defaultValue={block || "BHB1"}>
                    {
                        Object.entries(blockSelection).map(
                            ([key, value], index) => <option key={index} value={key}>{value}</option>
                        )
                    }
                </select>
                <input type="submit" value="Go"/>
            </form>
        </div>
    )
}

export default Filters;
