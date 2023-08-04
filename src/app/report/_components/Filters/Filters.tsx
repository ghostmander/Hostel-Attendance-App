import React from 'react';
import './Filters.scss';
interface FiltersProps {
    isDateNeeded: boolean;
}

export const Filters: React.FC<FiltersProps> = ({isDateNeeded}) => {
        return (
            <div id="form-data">
                <form id="viewform">
                    <input type="text" name="name" id="filter-name" placeholder="Name"/>
                    <input type="text" name="regno" id="filter-regno" placeholder="Registration Number"/>
                    {isDateNeeded && <input type="date" name="date" id="filter-date"/>}
                    <select name="status" id="filter-status">
                        <option value="All">All</option>
                        <option value="present">Present</option>
                        <option value="absent">Absent</option>
                        <option value="onleave">On Leave</option>
                        <option value="reported">Leave But Reported</option>
                        <option value="ne-present">New Entry - Present</option>
                        <option value="ne-absent">New Entry - Absent</option>
                        <option value="ne-leave">New Entry - On Leave</option>
                        <option value="ne-reported">New Entry - Reported from Leave</option>
                    </select>
                    <input type="submit" value="Go"/>
                </form>
            </div>
        )
}

export default Filters;
