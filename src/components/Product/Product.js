import React from 'react';
import img from '../../assets/logo512.png';
import './Product.css';

const Product = props => {
    return (
        <div className="card__lg">
            <img src={img} alt="productImg"></img>
            <a href="/">
                <div className="name">Iphone 8s Max</div>
                <div className="name">NGN: 500</div>
            </a>
            <div className="opt">
                <button className="btn__opt"><a href="/">Add to Cart</a></button>
                <button className="btn__opt"><a href="/">Buy</a></button>
            </div>
        </div>
    )
};

export default Product;
