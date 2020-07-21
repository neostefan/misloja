import React, { Component } from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import Products from '../Products/Products';
import Detail from '../Detail/Detail';
import LogInAuth from '../Auth/authForm/LogIn';
import SignUpMerch from '../Auth/authForm/merchRegister';
import SignUpUser from '../Auth/authForm/userRegister';
import Add from '../Auth/addForm/addForm';
import Email from '../Auth/resetForm/email';
import Password from '../Auth/resetForm/password';
import Cart from '../Cart/Cart';
import Home from '../../containers/Home/Home';
import Dashboard from '../Dashboard/dashboard';
import Logout from '../Logout/logout';
import Aux from '../../hoc/Aux';
import * as actionCreators from '../../store/actions';

class Store extends Component {

    componentDidMount() {
        this.props.checkAuthStatus();
    }

    render() {

        let routes = (
            <Switch>
                <Route path="/category" component={ Products } />
                <Route path="/product" component={ Detail }/>
                <Route path="/login" component={ LogInAuth }/>
                <Route path="/merchant/signup" component={ SignUpMerch }/>
                <Route path="/:store/admin/login" component={ LogInAuth }/>
                <Route path="/" exact component={ Home }/>
                <Route path="/merch/:store" exact component={ Products }/>
                <Route path="/merch/:store/category" component={ Products }/>
                <Route path="/merch/:store/product" component={ Detail }/>
                <Route path="/products" component={ Products }/>
                <Route path="/signup" component={ SignUpUser }/>
                <Route path="/cart" component={ Cart }/>
                <Route path="/reset-password" component={ Email }/>
                <Route path="/set-password" component={ Password }/>
                <Redirect to="/"/>
            </Switch>
        )

        if(this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/:store/admin/add" component={ Add }/>
                    <Route path="/:store/admin/product" component={ Detail }/>
                    <Route path="/:store/admin/edit" component={ Add }/>
                    <Route path="/:store/admin/products" component={ Products }/>
                    <Route path="/:store/admin/" component={ Dashboard }/>
                    <Route path="/logout" component={ Logout }/>
                    <Redirect to="/logout"/>
                </Switch>
            )
        }

        return (
            <Aux>
                { routes }
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.token !== null,
        isAuthenticated: state.auth.merchantToken !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        checkAuthStatus: () => dispatch(actionCreators.setAuth())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Store);