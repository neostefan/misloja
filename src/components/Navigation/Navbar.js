import React from 'react';
import Hamburger from '../Hamburger/Hamburger';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = (props) => {
    return (
        <header className="topbar">
            <div className="toggle">
                <Hamburger click={props.clicked}/>
            </div>
            <div className="logo"><Link to="/">LOGO</Link></div>
            <div className="spacer"></div>
            <nav className="nav">   
                <ul className="nav__ul">
                    <li className="Item"><Link to="/products">Products</Link></li>
                    <li className="Item"><Link to="/auth">LogIn</Link></li>
                    <li className="Item"><Link to="/">LogOut</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;