import React from 'react';
import img from '../../assets/logo512.png'
import './Cartitem.css';

const Cartitem = props => {
    
    return (
        <div className="cartItem">
            <img src={img} alt="prodImg"></img>
            <div className="cartOpt">
                <h4>Iphone 11 pro</h4>
                <div className="cartOptInfo">
                    <h4>NGN 400000</h4>
                    <h4>Call 08080598674 to Order</h4>
                </div> 
            </div> 
        </div>
    );
};

export default Cartitem;