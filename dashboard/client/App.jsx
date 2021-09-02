import React, { Component, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainContainer from './container/mainContainer.jsx';
import LandingContainer from './container/landingContainer.jsx';
import mainContainerGraphQL from './container/mainContainerGraphQL.js';

const App = () => {
  // useEffect with prometheus port forwarding 
    useEffect(() => {
    fetch('/prometheus').then((data) => {
      console.log('connected to prometheus', data);
    });
  }, []);

  return (
    <Router>
      <Route exact path="/" component={LandingContainer} />
      <Route path="/dashboard" component={mainContainerGraphQL} />
    </Router>
  );
};

export default App;
