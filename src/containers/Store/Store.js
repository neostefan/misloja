import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Products from '../Products/Products';
import Detail from '../Detail/Detail';
import LogInAuth from '../Form/authForm/LogIn';
import SignUpMerch from '../Form/authForm/merchRegister';
import SignUpUser from '../Form/authForm/userRegister';
import Add from '../Form/addForm/addForm';
import Cart from '../Cart/Cart';
import Aux from '../../hoc/Aux';

class Store extends Component {
    render() {
        return (
            <Aux>
                <Switch>
                    <Route path="/cart" component={ Cart }/>
                    <Route path="/product" component={ Detail }/>
                    <Route path="/login" component={ LogInAuth }/>
                    <Route path="/signup" component={ SignUpUser }/>
                    <Route path="/merch/signup" component={ SignUpMerch }/>
                    <Route path="/:store/admin/add" component={Add}/>
                    <Route path="/:store/admin/login" component={ LogInAuth }/>
                    <Route path="/:store/admin/" component={ Products }/>
                    <Route path="/merchant/:store" component={ Products }/>
                    <Route path="/" component={ Products }/>
                </Switch>
            </Aux>
        )
    }
}

export default Store;