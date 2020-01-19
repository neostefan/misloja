import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import img from '../../assets/logo512.png';
import './Product.css';

const Product = props => {

    let onClickHandler = (id) => {
        console.log(props);
        let url;
        if(props.isAuth) {
            url = 'http://localhost:8080/' + props.match.params.store + '/admin/delete?Id=' + id;
            console.log(url);
            axios.delete(url, { headers: { "Authorization": localStorage.getItem('token') } } ).then(Response => {
                console.log(Response);
            }).catch(err => {
                console.log(err);
            })
        }
    }

    return (
        <div className="card__lg">
            <Link to={{ pathname: "/product", search: "?Id=" + props.id}}>
                <img src={img} alt="productImg"></img>
                <div className="name">{props.name}</div>
                <div className="name">NGN {props.price}</div>
            </Link>
            <div className="opt">
                <button className="btn__opt">{props.isAuth ? <div>Edit</div> : <div>Add to Cart</div>}</button>
                <button className="btn__opt" onClick={() => onClickHandler(props.id)}>{props.isAuth ? <div>Delete</div> : <div>Buy</div>}</button>
            </div>
        </div>
    )
};

export default withRouter(Product);
