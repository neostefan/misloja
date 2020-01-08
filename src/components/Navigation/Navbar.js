import React from 'react';
import Hamburger from '../Hamburger/Hamburger';
import './Navbar.css';

const Navbar = (props) => {
    return (
        <header className="topbar">
            <div className="toggle">
                <Hamburger click={props.clicked}/>
            </div>
            <div className="logo">LOGO</div>
            <div className="spacer"></div>
            <nav className="nav">   
                <ul className="nav__ul">
                    <li className="Item"><a href="/">Products</a></li>
                    <li className="Item"><a href="/">LogIn</a></li>
                    <li className="Item"><a href="/">LogOut</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;