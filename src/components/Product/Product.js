import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

const Product = props => {
    let options;
    
    if(props.isAuthenticated) {
        options = (
            <div className="opt">
                <button className="btn__opt" onClick={ props.edit }>Edit</button>
                <button className="btn__opt" onClick={ props.delete }>Delete</button>
            </div>
        );
    } else if(props.isLoggedIn) {
        options = (      
            <div className="opt">
                <button className="btn__opt" onClick={ props.add }>Add</button>
                <button className="btn__opt" onClick={ props.buy }>Buy</button>
            </div>
        )
    } else {
        options = null
    }

    let formatter = new Intl.NumberFormat('en-NG', {
        style: "currency",
        currency: "NGN"
    });

    let price = formatter.format(props.price);
    let image = "http://localhost:8080/" + props.images[0];

    return (
        <div className="card__lg">
            <Link to={location => { let url = routeCheckerHandler(location.pathname); return {...location, pathname: url + "product", search: "?Id=" + props.id}}}>
                <img src={`${image}`} alt="productImg"></img>
                <div className="name">{props.name}</div>
                <div className="name">{price}</div>
            </Link>
            { options }
        </div>
    )
};

const routeCheckerHandler = (pathname) => {
    let url;

    let some = pathname.split('/');
    console.log(some[1]);

    if(some[1] === 'merch') {
        return url = '/merch/svens/';
    }

    if(some[1] === 'category') {
        return url = "/"
    }

    if(some[2] === 'admin') {
        return url = "/" + some[1] + "/" + some[2] + "/";
    }

    url = '/';
    return url;
}

export default Product;
