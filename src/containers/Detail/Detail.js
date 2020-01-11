import React, { Component } from 'react';
import img from '../../assets/logo512.png';
import './Detail.css';


class Detail extends Component {
    render(){
        return (
            <div className="detail">
                <img src={img} alt="productImage"></img>
                <div className="price">NGN 4000</div>
                <div className="content">Once upon a time there was a boy called chivana he 
                was a nasty lil twerp that found a golden egg called opnoid, opnoid is a rare 
                form of bird yh a fictious one but roll with it,  it had the powers of breaking 
                through the 4th wall</div>
                <div className="options">
                    <button><a href="/">Order</a></button>
                    <button><a href="/">Add To Cart</a></button>
                </div>
            </div>
        )
    }
}

export default Detail;