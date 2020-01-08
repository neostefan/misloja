import React from 'react';
import './Hamburger.css';

const Hamburger = props => {
    return (
        <button onClick={props.click} className="hamburg__btn">
            <div className="hamburg__line"/>
            <div className="hamburg__line"/>
            <div className="hamburg__line"/>
        </button>
    )
}

export default Hamburger;