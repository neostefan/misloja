import React from 'react';
import Layout from './containers/Layout/Layout';
import Footer from './components/Footer/Footer';
import Store from './containers/Store/Store';
import Aux from './hoc/Aux';
import './App.css';

function App() {
  return (
    <Aux>
      <Layout/>
      <div className="Main">
        <Store/>
      </div> 
      <Footer/>
    </Aux>
  );
}

export default App;
