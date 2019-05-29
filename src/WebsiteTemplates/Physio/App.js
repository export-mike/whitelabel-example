import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Home from './Home';
import {createGlobalStyle} from 'styled-components';
const Wrapper = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
  .Home {
    text-align: center;
  }
  
  .Home-logo {
    animation: Home-logo-spin infinite 20s linear;
    height: 80px;
  }
  
  .Home-header {
    background-color: #222;
    height: 150px;
    padding: 20px;
    color: white;
  }
  
  .Home-intro {
    font-size: large;
  }
  
  .Home-resources {
    list-style: none;
  }
  
  .Home-resources > li {
    display: inline-block;
    padding: 1rem;
  }
  
  @keyframes Home-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
`
const App = () => (<React.Fragment>
    <Wrapper/>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </React.Fragment>
);

export default App;
