import React, { useState } from 'react';
import Hamburger from '../Hamburger/Hamburger';
import { Link } from 'react-router-dom';
import img from '../../assets/misloja32x32.png';
import './Navbar.css';

const Navbar = (props) => {

    const [state, setState] = useState({ show: false });

    let clickHandler = () => {
        setState({show: !state.show});
    }

    let Class;

    if(state.show === true) {
        Class = "open";
    } else {
        Class = "dropdown"
    }

   

    let option1;
    //let option2 = null;

    if(props.isLoggedIn === true) {
        option1 =  (<li className="Item"><Link to="/logout">LogOut</Link></li>); 
    } 
    
    // if(props.isAuth === true) {
    //     option2 = <li><Link to={location => ({...location, pathname: location.pathname + "add"})}>Add</Link></li>
    // }

    return (
        <header className="topbar">
            <div className="toggle">
                <Hamburger click={props.clicked}/>
            </div>
            <div className="logo"><Link to={location => { let url = routeCheckerHandler(location.pathname); return {...location, pathname: url, search: null}}}><img alt="logo" src={img}/></Link></div>
            <div className="spacer"></div>
            <nav className="nav">
                <ul className="nav__ul">
                    <li className="ItemDropdown"><Link to={location => {let url = routeCheckerHandler(location.pathname); return {...location, pathname: url + "products", search: null}}}>Products</Link>{props.isAuth ? null : <span onClick={() => clickHandler()}> &darr;</span>}
                        <ul className={Class}>
                            <li><Link to={location => { let url = routeCheckerHandler(location.pathname); return {...location, pathname: url + "category", search: "?type=clothes"}}}>Clothes</Link></li>
                            <li><Link to={location => { let url = routeCheckerHandler(location.pathname); return {...location, pathname: url + "category", search: "?type=accessories"}}}>Accessories</Link></li>
                            <li><Link to={location => { let url = routeCheckerHandler(location.pathname); return {...location, pathname: url + "category", search: "?type=shoes"}}}>Shoes</Link></li>
                            <li><Link to={location => { let url = routeCheckerHandler(location.pathname); return {...location, pathname: url + "category", search: "?type=phones"}}}>Phones</Link></li>
                            <li><Link to={location => { let url = routeCheckerHandler(location.pathname); return {...location, pathname: url + "category", search: "?type=cosmetics"}}}>Cosmetics</Link></li>
                            <li><Link to={location => { let url = routeCheckerHandler(location.pathname); return {...location, pathname: url + "category", search: "?type=electronics"}}}>Electronics</Link></li>
                        </ul>
                    </li>
                    { option1 }
                </ul>
                <Link to={location => {return {...location}}}/>
            </nav>
        </header>
    );
}

const routeCheckerHandler = (pathname) => {
    let url = "/";

    let value = pathname.split('/');
    
    if(value[1] === 'merch') {
        return url = "/" + value[1] + "/" + value[2] + "/";
    }

    if(value[2] === 'admin') {
        return url = "/" + value[1] + "/" + value[2] + "/";
    }

    return url;
}

export default Navbar;