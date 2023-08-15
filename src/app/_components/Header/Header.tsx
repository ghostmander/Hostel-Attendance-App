import React from 'react';
import './Header.scss';
import Navbar, {NavbarProps} from "./Navbar";
import Image from "next/image";

interface HeaderProps {
    navbarProps?: NavbarProps;
    isLogin?: boolean;
}

export const Header: React.FC<HeaderProps> = ({navbarProps, isLogin}) => {
    return (
        <header id="header">
            <div id="header-left">
                <Image src="/logoblack.png" width={0} height={0} sizes="100vw" alt="VITLogo" style={{
                    height: "90%",
                    width: "auto",
                    margin: "auto 0 auto 1rem",
                }}/>
            </div>
            <div id="header-center">
                <p>Hostel attendance management system</p>
                <p>[HAMS v0.6.9rc]</p>
            </div>
            <div id="header-right">
                {!isLogin && <Navbar routes={navbarProps?.routes || undefined}/>}
            </div>
        </header>
    )
}

export default Header;
