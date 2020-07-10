import * as actionTypes from './actionTypes';
import axios from '../../axios-inst';

export const loadCartStart = () => {
    return {
        type: actionTypes.LOAD_CART_START
    }
}

export const loadCartSuccess = (products) => {
    return {
        type: actionTypes.LOAD_CART_SUCCESS,
        products: products
    }
}

export const loadCart = () => {
    return dispatch => {

        dispatch(loadCartStart());

        const token = localStorage.getItem('token');

        axios.get("/cart", { headers: { "Authorization": token }  })
        .then(Response => {
            console.log('loading cart ...');
            dispatch(loadCartSuccess(Response.data));
        }).catch(err => {
            dispatch(loadCartFail(err));
        });

    }
}

export const loadCartFail = (err) => {
    return {
        type: actionTypes.LOAD_CART_FAIL,
        error: err
    }
}

export const removeCartItemStart = () => {
    return {
        type: actionTypes.REMOVE_CARTITEM_START
    }
}

export const removeCartItemSuccess = (products) => {
    return {
        type: actionTypes.REMOVE_CARTITEM_SUCCESS,
        products: products
    }
}

export const removeCartItem = (id) => {
    return dispatch => {

        dispatch(removeCartItemStart());

        const token = localStorage.getItem('token');

        axios.delete('/delete?Id=' + id, { "headers": { "Authorization": token } })
        .then(Response => {
            dispatch(removeCartItemSuccess(Response.data));
;        }).catch(err => {
            dispatch(removeCartItemFail(err));
        });
    }
}

export const removeCartItemFail = (err) => {
    return {
        type: actionTypes.REMOVE_CARTITEM_FAIL,
        error: err
    }
}

export const addCartItemStart = () => {
    return {
        type: actionTypes.ADD_CARTITEM_START
    }
}

export const addCartItemSuccess = (products) => {
    return {
        type: actionTypes.ADD_CARTITEM_SUCCESS,
        products: products
    }
}

export const addCartItem = (props, id) => {
    return dispatch => {
        dispatch(addCartItemStart());
        
        const token = localStorage.getItem('token');
        let url = "/addToCart?Id=" + id;

        axios.put(url, null, { headers: { "Authorization": token } })
        .then(Response => {
            console.log(Response.data);
            dispatch(addCartItemSuccess(Response.data));
            console.log('adding to cart a product ...');
            props.history.push('/cart');           
        }).catch(err => {
            dispatch(addCartItemFail(err));
        });
    }
}

export const addCartItemFail = (err) => {
    return {
        type: actionTypes.ADD_CARTITEM_FAIL,
        error: err
    }
}