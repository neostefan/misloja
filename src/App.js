import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './containers/Layout/Layout';
import Products from './containers/Products/Products';
import Detail from './containers/Detail/Detail';
import Footer from './components/Footer/Footer';
import Cart from './containers/Cart/Cart';
import Auth from './containers/Form/authForm/authForm';
import Add from './containers/Form/addForm/addForm';
import Aux from './hoc/Aux';
import './App.css';

function App() {
  return (
    <Aux>
      <Layout/>
      <div className="Main">
        <Switch>
          <Route path="/cart" component={Cart}/>
          <Route path="/detail" component={Detail}/>
          <Route path="/auth" component={Auth}/>
          <Route path="/merch/admin/add-product" component={Add}/>
          <Route path="/merch/admin/auth" component={ Auth }/>
          <Route path="/merch/admin/" component={ Products }/>
          <Route path="/" component={ Products }/>
        </Switch>
      </div>
      <Footer/>
    </Aux>
  );
}

export default App;
