import React, { Component } from 'react';
import axios from 'axios';
import Product from '../../components/Product/Product';
import './Products.css';

class Main extends Component {

    state = {
        products: [],
        isAuth: false
    }

    componentDidMount() {
        console.log(this.props);

        var url = 'http://localhost:8080' + this.props.match.url;

        axios.get(url, { headers: { "Authorization": localStorage.getItem('token') } }).then(Response => {
            this.setState({products: Response.data.goods, isAuth: Response.data.isAuth});
        }).catch(err => {
            console.log(err);
        });
    }

    render(){

        let products = this.state.products.map(product => {
            return ( <Product id={product._id} name={product.name} price={product.price} 
                    descrption={product.descrption} key={product._id} isAuth={this.state.isAuth}/> 
                );
        });

        return(
            <main className="productslist">
                { products }
            </main>
        )
    }
}

export default Main;