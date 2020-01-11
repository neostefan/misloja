import React, { Component } from 'react';
import Cartitem from '../../components/Cartitem/Cartitem';
import './Cart.css';

class Cart extends Component {
    render() {
        return (
            <div className="cart">
                <Cartitem/>
                <Cartitem/>
                <Cartitem/>
                <Cartitem/>
            </div>
        );
    }
}

export default Cart;