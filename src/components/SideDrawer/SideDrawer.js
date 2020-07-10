import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/misloja48x48.png';
import './SideDrawer.css';

const SideDrawer = props => {

    const [ state, setState ] = useState({
        open: false 
    });

    let click = () => {
        setState({ open: !state.open });
    }

    let opt;
    let opt2;

    let routeCheckerHandler = (url) => {
        let route = "/";
        let value = url.split('/');

        if(value[1] === 'merch') {
            return route = "/" + value[1] + "/" + value[2] + "/";
        }
    
        if(value[2] === 'admin') {
            return route = "/" + value[1] + "/" + value[2] + "/";
        }

        return route;
    }

    if(state.open) {
        opt = ( 
            <ul className="item__ul">
                <li><Link to={location => { let url = routeCheckerHandler(location.pathname); return {...location, pathname: url + "category", search: "?type=clothes"}}}>Clothes</Link></li>
                <li><Link to={location => { let url = routeCheckerHandler(location.pathname); return {...location, pathname: url + "category", search: "?type=accessories"}}}>Accessories</Link></li>
                <li><Link to={location => { let url = routeCheckerHandler(location.pathname); return {...location, pathname: url + "category", search: "?type=shoes"}}}>Shoes</Link></li>
                <li><Link to={location => { let url = routeCheckerHandler(location.pathname); return {...location, pathname: url + "category", search: "?type=phones"}}}>Phones</Link></li>
                <li><Link to={location => { let url = routeCheckerHandler(location.pathname); return {...location, pathname: url + "category", search: "?type=cosmetics"}}}>Cosmetics</Link></li>
                <li><Link to={location => { let url = routeCheckerHandler(location.pathname); return {...location, pathname: url + "category", search: "?type=electronics"}}}>Electronics</Link></li>
            </ul>
        )
    }

    //opt2 = (<li className="item"><Link to="/logout">LogOut</Link></li>); 
    //opt2 = (<li className="item"><Link to="/login">LogIn</Link></li>);

    let drawerClasses = 'side';

    if(props.show) {
        drawerClasses = 'side open';
    }
    
    return (
        <div className={drawerClasses}>
            <div onClick={props.click} className="close">&times;</div>
            <div className="icon"><img src={img} alt="LOGO"></img></div>
            <ul className="ul">
                <li className="item"><Link to={location => {let url = routeCheckerHandler(location.pathname); return {...location, pathname: url + "products", search: null}}}>Products</Link>{ props.isAuth ? null :<span onClick={() => click()}> &darr;</span> }
                    { opt }
                </li>
                { opt2 }
            </ul>
        </div>
    );
}

export default SideDrawer;