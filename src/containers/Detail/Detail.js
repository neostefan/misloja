import React, { Component } from 'react';
import img from '../../assets/logo512.png';
import './Detail.css';


class Detail extends Component {
    render(){
        return (
            <div className="detail">
                <img src={img} alt="productImage"></img>
                <div className="price">NGN 4000</div>
                <div className="content">A really fantastic phone</div>
                <div className="options">
                    <button><a href="/">Order</a></button>
                    <button><a href="/">Add To Cart</a></button>
                </div>
            </div>
        )
    }
}

export default Detail;