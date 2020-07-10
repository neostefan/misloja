import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions';
import Error from '../../components/ErrorPage/Error';
import Cartitem from '../../components/Cartitem/Cartitem';
import './Cart.css';
import Spinner from '../../components/Spinner/spinner';

class Cart extends Component {

    componentDidMount() {
        this.props.LoadCart();
    }

    render() {

        let products;

        console.log(this.props.cart);

        if(this.props.error !== null) {
            products = <Error status={this.props.error.response.status} 
            message={this.props.error.response.message}/>
        }

        if(this.props.cart !== null) {
            products = this.props.cart.map(cartItem => <Cartitem key={cartItem._id} 
                name={cartItem.productId.name} price={cartItem.productId.price}
                number={cartItem.productId.seller.mobile} qty={cartItem.qty}
                delete={() => this.props.DeleteCartItem(cartItem.productId._id)} />
            );
        }

        return this.props.loading ? <Spinner/> : <div className="cart">{ products }</div>
    }
}

const MapStateToProps = state => {
    return {
        cart: state.cart.cart,
        error: state.cart.error,
        loading: state.cart.loading
    }
}

const MapDispatchToProps = (dispatch) => {
    return {
        LoadCart: () => dispatch(actionCreators.loadCart()),
        DeleteCartItem: (id) => dispatch(actionCreators.removeCartItem(id))
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(Cart);