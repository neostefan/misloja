import * as actionTypes from '../actions/actionTypes';

var initialState = {
    error: null,
    cart: null,
    loading: true
}

const Reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case actionTypes.LOAD_CART_START:
            return {
                ...state,
                loading: true
            }

        case actionTypes.LOAD_CART_SUCCESS:
            return {
                ...state,
                cart: actions.products,
                loading: false
            }

        case actionTypes.LOAD_CART_FAIL:
            return {
                ...state,
                error: actions.error,
                loading: false
            }

        case actionTypes.REMOVE_CARTITEM_START:
            return {
                ...state,
                loading: false
            }

        case actionTypes.REMOVE_CARTITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                cart: actions.products
            }

        case actionTypes.REMOVE_CARTITEM_FAIL:
            return {
                ...state,
                loading: false,
                error: actions.error
            }

        case actionTypes.ADD_CARTITEM_START:
            return {
                ...state,
                loading: true
            }

        case actionTypes.ADD_CARTITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                products: actions.products
            }

        case actionTypes.ADD_CARTITEM_FAIL:
            return {
                ...state,
                loading: false,
                error: actions.error
            }

        default: return state
    }
}

export default Reducer