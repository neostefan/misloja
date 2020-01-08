import React from 'react';
import Layout from './containers/Layout/Layout';
import Main from './containers/Main/main';
import Aux from './hoc/Aux';
import './App.css';

function App() {
  return (
    <Aux>
      <Layout/>
      <Main/>
    </Aux>
  );
}

export default App;
