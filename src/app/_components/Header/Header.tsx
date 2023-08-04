import React from 'react';
import './Header.scss';
import Navbar, {NavbarProps} from "./Navbar";

interface HeaderProps {
    navbarProps?: NavbarProps;
}

export const Header: React.FC<HeaderProps> = ({navbarProps}) => {
    return (
        <header id="header">
            <div id="header-left">
                <img src="/logoblack.png" alt="VITLogo"/>
            </div>
            <div id="header-center">
                <p>Hostel attendance management system</p>
                <p>[HAMS v0.3]</p>
            </div>
            <div id="header-right">
                <Navbar routes={navbarProps?.routes || undefined}/>
            </div>
        </header>
    )
}

export default Header;
