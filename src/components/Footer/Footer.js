import React from 'react';
import './Footer.css';

const Footer = () => {

    let date = new Date().getFullYear();

    return (
        <div className="footer">
            <span>&copy;Copyright Misloja {date}</span>
        </div>
    )
}

export default Footer;