import * as actionTypes from './actionTypes';
import axios from '../../axios-inst';

export const fetchStart = () => {
    return {
        type: actionTypes.FETCH_PRODUCTS_START
    }
}

export const fetchProducts = (props) => {
    return dispatch => {
        dispatch(fetchStart());

        const token = localStorage.getItem('token');

        let value = props.location.pathname.split('/');

        let url;

        if(!props.location.search) {
            url = props.match.url
        } else {
            if(value[1] === "category") {
                url = props.match.url + props.location.search;
            } else if(!value[2]) {
                url = "/merchcategory" + props.location.search;
            } else {
                url = value[3] + props.location.search + "&&store=" + value[2];
            }
        }

        axios.get(url, { headers: { "Authorization": token }}).then(response => {
            dispatch(fetchSuccess(response.data.goods));
        }).catch(err => {
            dispatch(fetchFailed(err));
        });
    }
}

export const fetchSuccess = (products) => {
    return {
        type: actionTypes.FETCH_PRODUCTS_SUCCESS,
        products: products
    }
}

export const fetchFailed = (error) => {
    return {
        type: actionTypes.FETCH_PRODUCTS_FAIL,
        error: error
    }
}

export const createStart = () => {
    return {
        type: actionTypes.CREATE_START
    }
}


export const createProduct = (props, fd) => {
    return dispatch => {
        let url = props.match.url;
        let token = localStorage.getItem('token');

        dispatch(createStart());

        axios.post(url, fd, { headers: { "Authorization": token }}).then(response => {
            dispatch(createSuccess(response.data.products));
            props.history.push("/" + props.match.params.store + "/admin/products");  
        }).catch(err => {
            dispatch(createFail(err));
        });
    }
}


export const createSuccess = (products) => {
    return {
        type: actionTypes.CREATE_SUCCESS,
        products: products
    }
}


export const createFail = (err) => {
    return {
        type: actionTypes.CREATE_FAIL,
        error: err
    }
}

export const buyStart = () => {
    return {
        type: actionTypes.BUY_START
    }
}

export const buyProduct = (props, id) => {
    return dispatch => {

        dispatch(buyStart());

        const token = localStorage.getItem('token');
        let url = "/addToCart?Id=" + id;

        axios.put(url, null, { headers: { "Authorization": token } })
        .then(Response => {
            dispatch(buySuccess());
            props.history.push('/cart');           
        }).catch(err => {
            dispatch(buyFail(err));
        });
    }
}

export const buySuccess = () => {
    return {
        type: actionTypes.BUY_SUCCESS
    }
}

export const buyFail = (err) => {
    return {
        type: actionTypes.BUY_FAIL,
        error: err
    }
}

export const deleteStart = () => {
    return {
        type: actionTypes.DELETE_START
    }
}

export const deleteProduct = (props, id) => {
    return dispatch => {

        dispatch(deleteStart());

        let url;
        url = props.match.params.store + '/admin/delete?Id=' + id;
        const token = localStorage.getItem('token');

        axios.delete(url, { headers: { "Authorization": token } } ).then(Response => {
            dispatch(deleteSuccess(Response.data));
        }).catch(err => {
            dispatch(deleteFail(err));
        });
    }
}

export const deleteSuccess = (products) => {
    return {
        type: actionTypes.DELETE_SUCCESS,
        products: products
    }
}

export const deleteFail = (err) => {
    return {
        type: actionTypes.DELETE_FAIL,
        error: err
    }
}

export const editStart = () => {
    return {
        type: actionTypes.EDIT_START
    }
}

export const editProduct = (props, id, fd) => {
    return dispatch => {
        
        dispatch(editStart());

        const token = localStorage.getItem('token');
        let url = "/" + props.match.params.store + '/admin/edit' + props.location.search;


        let headers = { 
            "Authorization": token,
            "Content-Type": "multipart/form-data"
        };

        axios.put(url, fd, { headers: headers }).then(Response => {
            dispatch(editSuccess());
            props.history.push("/" + props.match.params.store + '/admin/products');
        }).catch(err => {
            dispatch(editFail(err));
        });
    }
}

export const editSuccess = () => {
    return {
        type: actionTypes.EDIT_SUCCESS
    }
}

export const editFail = (err) => {
    return {
        type: actionTypes.EDIT_FAIL,
        error: err
    }
}

export const fetchMerchantDataStart = () => {
    return {
        type: actionTypes.FETCH_MERCHANT_DATA_START
    }
}

export const fetchMerchantData = (props) => {
    return dispatch => {
        const token = localStorage.getItem('token');

        axios.get(props.match.url, { headers: { "Authorization": token } }).then(response => {
            dispatch(fetchMerchantDataSuccess(response.data.prodData, response.data.merchData));
        }).catch(err => {
            dispatch(fetchMerchantDataFail(err));
        });
    }
}

export const fetchMerchantDataSuccess = (prodData, merchData) => {
    return {
        type: actionTypes.FETCH_MERCHANT_DATA_SUCCESS,
        products: prodData,
        merchantData: merchData
    }
}

export const fetchMerchantDataFail = (err) => {
    return {
        type: actionTypes.FETCH_MERCHANT_DATA_FAIL,
        error: err
    }
}