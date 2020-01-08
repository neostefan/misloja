import React from 'react';

const Footer = () => {

    let date = new Date().getFullYear();

    return (
        <div className="footer">
            <span>Copyright UniMall {date}</span>
        </div>
    )
}

export default Footer;