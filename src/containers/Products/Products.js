import React, { Component } from 'react';
import Product from '../../components/Product/Product';
import './Products.css';

class Main extends Component {

    render(){

        return(
            <main className="productslist">
                <Product/>
                <Product/>
                <Product/>
                <Product/>
                <Product/>
                <Product/>
            </main>
        )
    }
}

export default Main;