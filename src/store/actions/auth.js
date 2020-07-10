import * as actionTypes from './actionTypes';
import axios from '../../axios-inst';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authUserSuccess = (token) => {
    return {
        type: actionTypes.AUTH_USER_SUCCESS,
        data: token
    }
}

export const auth = (values, props) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(props.match.url, values).then(Response => {

            let expirationDate = new Date((Response.data.expires * 1000) + new Date().getTime());
            
            localStorage.setItem('token', Response.data.token);
            localStorage.setItem('expires', Response.data.expires);
            localStorage.setItem('expiration', expirationDate);
            localStorage.setItem('merchToken', Response.data.merchantToken);

            if(Response.data.merchantToken === null) {
                dispatch(authUserSuccess(Response.data.token));
                dispatch(checkAuthTimeout(Response.data.expires));
                props.history.push('/');
            } else {
                dispatch(authMerchantSuccess(Response.data.token, Response.data.merchantToken));
                dispatch(checkAuthTimeout(Response.data.expires));
                props.history.push('/' + props.match.params.store + '/admin/', { status: Response.data.merchantToken });
            }
        }).catch(err => {
            dispatch(authFail(err));
        });
    }
}

export const authMerchantSuccess = (token, merchToken) => {
    return {
        type: actionTypes.AUTH_MERCHANT_SUCCESS,
        token: token,
        merchantToken: merchToken
    }
}

//add the registration function;

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut());
        }, expirationTime * 1000)
    }
}

export const logOut = () => {
    localStorage.removeItem('expires');
    localStorage.removeItem('expiration');
    localStorage.removeItem('token');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authFail = (err) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err
    }
}

export const setAuth = () => {
    return dispatch => {
        const expire = localStorage.getItem('expiration');
        const token = localStorage.getItem('token');
        const merchToken = localStorage.getItem('merchToken');
        
        if(!token) {
            dispatch(logOut())
        } else {
            if(expire > new Date()) {
                if(!merchToken) {
                    dispatch(authUserSuccess(token));
                } else {
                    dispatch(authMerchantSuccess(token, merchToken));
                }
            } else {
                dispatch(logOut())
            }
        }
    }
}

export const postResetEmailStart = () => {
    return {
        type: actionTypes.RESET_PASSWORD_START
    }
}

export const postResetEmail = (values, props) => {
    return dispatch => {
        dispatch(postResetEmailStart());
        axios.post(props.match.url, values).then(Response => {
            dispatch(postResetEmailSuccess(Response.data.msg));
        }).catch(err => {
            dispatch(postResetEmailFail(err));
        })
    }
}

export const postResetEmailSuccess = (msg) => {
    return {
        type: actionTypes.RESET_PASSWORD_SUCCESS,
        msg: msg
    }
}

export const postResetEmailFail = err => {
    return {
        type: actionTypes.RESET_PASSWORD_FAIL,
        error: err
    }
}

export const postNewPasswordStart = () => {
    return {
        type: actionTypes.SET_PASSWORD_START
    }
}

export const postNewPassword = (values, props) => {
    return dispatch => {
        let url = props.match.url;

        dispatch(postNewPasswordStart());

        axios.post(url, values).then(response => {
            dispatch(postNewPasswordSuccess(response.data.msg));
        }).catch(err => {
            dispatch(postNewPasswordFail());
        });
    }
}

export const postNewPasswordSuccess = (msg) => {
    return {
        type: actionTypes.SET_PASSWORD_SUCCESS,
        msg: msg
    }
}

export const postNewPasswordFail = (err) => {
    return {
        type: actionTypes.SET_PASSWORD_FAIL,
        error: err
    }
}
