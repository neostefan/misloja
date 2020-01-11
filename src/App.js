import React from 'react';
import Layout from './containers/Layout/Layout';
import Products from './containers/Products/Products';
import Detail from './containers/Detail/Detail';
import Footer from './components/Footer/Footer';
import Cart from './containers/Cart/Cart';
import Aux from './hoc/Aux';
import './App.css';

function App() {
  return (
    <Aux>
      <Layout/>
      <div className="Main">
        <Products/>
        <Detail/>
        <Cart/>
      </div>
      <Footer/>
    </Aux>
  );
}

export default App;
