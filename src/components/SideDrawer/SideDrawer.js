import React from 'react';
import './SideDrawer.css';

const SideDrawer = props => {
    let drawerClasses = 'side';

    if(props.show) {
        drawerClasses = 'side open';
    }
    
    return (
        <div className={drawerClasses}>
            <div onClick={props.click} className="close">&times;</div>
            <div className="icon"><img alt="LOGO"></img></div>
            <ul className="ul">
                <li className="item"><a href="/">Products</a></li>
                <li className="item"><a href="/">LogIn</a></li>
                <li className="item"><a href="/">LogOut</a></li>
            </ul>
        </div>
    );
}

export default SideDrawer;