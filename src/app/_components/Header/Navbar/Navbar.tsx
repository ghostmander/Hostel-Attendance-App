import React from 'react';
import './Navbar.scss';

interface Route {
    name: string;
    path: string;
}

export interface NavbarProps {
    routes?: Route[];
}

export const Navbar: React.FC<NavbarProps> = ({routes}) => {
    routes = routes || [
        {name: `Home`, path: `/`},
        {name: `View Today's Attendance Report`, path: `/report`},
        {name: `View Previous Reports`, path: `/report/old`},
        {name: `Upload Turnstile Data`, path: `/upload/turnstile`},
        {name: `Upload Hostel Masterdata`, path: `/upload/hostel`},
        {name: `Upload Hosteler Leave Data`, path: `/upload/leave`},
    ];
    return (
        <nav id="navbar">
            <label>
                <input type="checkbox"/>
                <span className="menu"> <span className="hamburger"></span> </span>
                <ul>
                    {routes.map(({name, path}, index) => (
                        <li key={index}><a href={path}>{name}</a></li>
                    ))}
                </ul>
            </label>
            <div className="overlay"></div>
        </nav>
    )
}

export default Navbar;
