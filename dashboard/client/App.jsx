import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainContainer from './container/mainContainer.jsx';
import LandingContainer from './container/landingContainer.jsx';
import mainContainerGraphQL from './container/mainContainerGraphQL.js';

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={LandingContainer} />
      <Route path="/dashboard" component={mainContainerGraphQL} />
    </Router>
  );
};

export default App;
