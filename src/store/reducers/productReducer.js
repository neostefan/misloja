import * as actionTypes from '../actions/actionTypes';

var initialState = {
    products: null,
    loading: false,
    error: null,
    merchantData: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PRODUCTS_START:
            return {
                ...state,
                loading: true
            }

        case actionTypes.FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.products,
                loading: false
            }

        case actionTypes.FETCH_PRODUCTS_FAIL: 
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case actionTypes.ADD_START:
            return {
                ...state,
                loading: true
            }
        
        case actionTypes.ADD_SUCCESS:
            return {
                ...state,
                loading: false
            }

        case actionTypes.ADD_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            }

        case actionTypes.DELETE_START:
            return {
                ...state,
                loading: true
            }

        case actionTypes.DELETE_SUCCESS: 
            return {
                ...state,
                loading: false,
                products: action.products
            }

        case actionTypes.DELETE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case actionTypes.BUY_START:
            return {
                ...state,
                loading: true
            }

        case actionTypes.BUY_SUCCESS:
            return {
                ...state,
                loading: false
            }

        case actionTypes.BUY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case actionTypes.EDIT_START:
            return {
                ...state,
                loading: true
            }

        case actionTypes.EDIT_SUCCESS:
            return {
                ...state,
                loading: false
            }

        case actionTypes.EDIT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case actionTypes.CREATE_START:
            return {
                ...state,
                loading: true
            }

        case actionTypes.CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.products
            }

        case actionTypes.CREATE_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            }

        case actionTypes.FETCH_MERCHANT_DATA_START:
            return {
                ...state,
                loading: true
            }

        case actionTypes.FETCH_MERCHANT_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.products,
                merchantData: action.merchantData
            }

        case actionTypes.FETCH_MERCHANT_DATA_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        default: return state;
    }
}

export default reducer;