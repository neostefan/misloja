import React, { Component } from 'react';
import Product from '../../components/Product/Product';
import { connect } from 'react-redux';
import Spinner from '../../components/Spinner/spinner';
import Error from '../../components/ErrorPage/Error';
import Aux from '../../hoc/Aux';
import Pagination from '../../components/Pagination/pagination';
import * as actionCreators from '../../store/actions';
import './Products.css';

class Main extends Component {

    state = {
        currentPage: 1,
        postsPerPage: 3
    }

    componentDidMount() {
       this.props.InitProducts();
    }

    editHandler = (id) => {
        let url = this.props.match.params.store + "/admin/edit?Id=" + id;
        this.props.history.push("/" + url);
    }

    prevHandler = () => {
        this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }));
    }

    nextHandler = () => {
        this.setState(prevState => ({currentPage: prevState.currentPage + 1}));
    }

    render() {
        let products;
        let data;
        let output;
        let total;
        

        if(this.props.loading === true) {
            products = null;
        } 
        
        if(this.props.error !== null) {
            output = <Error show={this.props.error} status={this.props.error.response.status}
            message={this.props.error.response.data} />
        }

        if(this.props.products !== null) {
            total = this.props.products.length;
            let lastProdIndex = this.state.currentPage * this.state.postsPerPage;
            let firstProdInex = lastProdIndex - this.state.postsPerPage;
            data = this.props.products.slice(firstProdInex, lastProdIndex);
            products = data.map((product) => {
                return ( 
                    <Product key={product._id} id={product._id} name={product.name} price={product.price} 
                        descrption={product.descrption} images={product.images}
                        delete = {() => this.props.onDeleteProduct(product._id)} 
                        edit={() => this.editHandler(product._id)}
                        add={() => this.props.onAddProduct(product._id)}
                        buy={() => this.props.onBuyProduct(product._id)}
                        isLoggedIn={this.props.isLoggedIn}
                        isAuthenticated={this.props.isAuthenticated}/> 
                );
            });
        }

        output = 
                <Aux>
                    <main className="list">{ products }</main>
                    <Pagination currentPage={this.state.currentPage} totalProducts={total}
                    next={() => this.nextHandler()} prodPerPage={this.state.postsPerPage}
                    previous={() => this.prevHandler()}/>
                </Aux>

        if(this.props.products !== null) {
            if(this.props.products.length < 1) {
                output = <h1>No products found</h1>;
            }
        }

       

        return this.props.loading ? <Spinner/> : output
    }
}

const mapStateToProps = state => {
    return {
        products: state.products.products,
        loading: state.products.loading,
        error: state.products.error,
        isLoggedIn: state.auth.token !== null,
        isAuthenticated: state.auth.merchantToken !== null
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        InitProducts: () => dispatch(actionCreators.fetchProducts(ownProps)),
        fetchMerchData: () => dispatch(actionCreators.fetchMerchantData(ownProps)), 
        onDeleteProduct: (id) => dispatch(actionCreators.deleteProduct(ownProps, id)),
        onAddProduct: (id) => dispatch(actionCreators.addCartItem(ownProps, id)),
        onBuyProduct: (id) => dispatch(actionCreators.buyProduct(ownProps, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);