import * as actionTypes from '../actions/actionTypes';

var initialState = {
    token: null,
    loading: false,
    error: null,
    merchantToken: null,
    msg: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: 
            return {
                ...state,
                loading: true,
                error: null
            }
        
        case actionTypes.AUTH_USER_SUCCESS:
            return {
                ...state,
                token: action.data,
                loading: false,
                merchantToken: null,
                error: null
            }

        case actionTypes.AUTH_MERCHANT_SUCCESS:
            return {
                ...state,
                token: action.token,
                merchantToken: action.merchantToken,
                loading: false,
                error: null
            }

        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
            
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
               token: null,
               merchantToken: null
            }

        case actionTypes.RESET_PASSWORD_START:
            return {
                ...state,
                loading: true,
                error: null
            }

        case actionTypes.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                msg: action.msg,
                error: null
            }

        case actionTypes.RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
                msg: null
            }

        case actionTypes.SET_PASSWORD_START:
            return {
                ...state,
                loading: true
            }

        case actionTypes.SET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                msg: action.msg
            }

        case actionTypes.SET_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case actionTypes.INIT_FORM:
            return {
                ...state,
                error: null,
                msg: null
            }
            
        default: return state
    }
}

export default authReducer;