import React, { Component, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingContainer from './container/LandingContainer.jsx';
import NodeContainer from './container/NodeContainer.jsx';
import PodContainer from './container/PodContainer.jsx';
import Header from './components/Header.jsx';

const App = () => {
  // useEffect with prometheus port forwarding
    useEffect(() => {
    fetch('/prometheus').then((data) => {
      console.log('connected to prometheus');
    });
  }, []);

  return (
    <Router>
      <Header />
      <Route exact path="/" component={LandingContainer} />
      <Route path="/nodeDashboard" component={NodeContainer} />
      <Route path="/podDashboard" component={PodContainer} />
    </Router>
  );
};

export default App;
