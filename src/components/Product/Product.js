import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/logo512.png';
import './Product.css';

const Product = props => {
    return (
        <div className="card__lg">
            <Link to="/product">
                <img src={img} alt="productImg"></img>
                <div className="name">Iphone 8s Max</div>
                <div className="name">NGN: 500</div>
            </Link>
            <div className="opt">
                <button className="btn__opt">Add to Cart</button>
                <button className="btn__opt"><Link to="/">Buy</Link></button>
            </div>
        </div>
    )
};

export default Product;
