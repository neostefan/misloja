import React, { Component } from 'react';
import Error from '../../components/ErrorPage/Error';
import { connect } from 'react-redux';
import axios from '../../axios-inst';
import './Detail.css';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: { },
            mainImg: null,
            images: [],
            error: null
        }
        this.scrollRef = React.createRef();
        this.updateMainImgHandler = this.updateMainImgHandler.bind(this);
    }

    componentDidMount() {
        let url;
        let token = localStorage.getItem('token');
        if(this.props.isAuthenticated) {
            url = this.props.match.url + this.props.location.search;
        } else {
            url = "/product" + this.props.location.search;
        }

        axios.get(url, {headers: { "Authorization": token }})
        .then(Response => {
            this.setState({ product: Response.data, mainImg: Response.data.images[0], images: Response.data.images });
        }).catch(err => {
            this.setState({error: err});
        });
    }

    updateMainImgHandler = (index, arr) => {
        this.setState({mainImg: arr[index]});
    }

    scrollHandlerLeft = () => {
        this.scrollRef.current.scrollLeft += 290;
    }

    scrollHandlerRight = () => {
        this.scrollRef.current.scrollLeft -= 290;
    }

    render(){

        // let options = this.props.isLoggedIn ? 
        // (   <div className="options">
        //         <button>Order</button>
        //         <button>Add To Cart</button>
        //     </div>
        // ) : null;

        let imgUrl;

        let mainImgUrl = 'http://localhost:8080/' + this.state.mainImg;

        let images = this.state.images.map((image, i, arr) => {
            imgUrl = "http://localhost:8080/" + image;
            return (<img key={image} onClick={() => this.updateMainImgHandler(i, arr)} src={`${imgUrl}`} alt="productImg"></img>)
        });

        const formatter = new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN'
        });

        let price = formatter.format(this.state.product.price);

        let output = ( 
            <div className="detail">
                <img className="mainImg" src={`${mainImgUrl}`} alt="mainImg"></img>
                <div className="slide">
                    <button onClick={this.scrollHandlerRight}>&larr;</button>
                    <div className="imgshow" ref={this.scrollRef}>
                        { images }
                    </div>
                    <button onClick={this.scrollHandlerLeft}>&rarr;</button>
                </div>
                <div className="price">{this.state.product.name}</div>
                <div className="price">{price}</div>
                <div className="content">{this.state.product.description}</div>
                {/* { options } */}
            </div>
        );
        
        if(this.state.error !== null) {
            output = <Error message={this.state.error.response.data} 
            status={this.state.error.response.status} show={this.state.error !== null}/>
        }

        return output;
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.token !== null,
        isAuthenticated: state.auth.merchantToken !== null
    }
}

export default connect(mapStateToProps)(Detail);