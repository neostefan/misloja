import React, { Component } from 'react';
import axios from 'axios';
import img from '../../assets/logo512.png';
import './Detail.css';


class Detail extends Component {

    state = {
        product: { }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/product' + this.props.location.search).then(Response => {
            this.setState({ product: Response.data });
        }).catch(err => {
            console.log(err);
        });
        console.log(this.props);
    }

    render(){
        return (
            <div className="detail">
                <img src={img} alt="productImage"></img>
                <div className="price">{this.state.product.name}</div>
                <div className="price">NGN {this.state.product.price}</div>
                <div className="content">{this.state.product.description}</div>
                <div className="options">
                    <button><a href="/">Order</a></button>
                    <button><a href="/">Add To Cart</a></button>
                </div>
            </div>
        )
    }
}

export default Detail;