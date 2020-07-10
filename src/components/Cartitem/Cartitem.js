import React from 'react';
import img from '../../assets/logo512.png';
import './Cartitem.css';

const Cartitem = props => {

    return (
        <div className="cartItem">
            <img src={img} alt="prodImg"></img>
            <div className="cartOpt">
                <h4>{ props.name } <span style={{"color": "blue"}}> X{props.qty}</span></h4>
                <div className="cartOptInfo">
                    <h4>NGN { props.price }</h4>
                    <h4>Call { props.number } to Order</h4>
                    <button onClick={ props.delete } className="delbtn">Remove</button>
                </div> 
            </div> 
        </div>
    );
}

export default Cartitem;