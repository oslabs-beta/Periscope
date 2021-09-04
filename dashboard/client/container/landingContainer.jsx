import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, useLocation, Route} from 'react-router-dom';
import Logo from '../assets/periscopeLogoTransparent.png';

const LandingContainer = () => {
  // useEffect(() => {
  //   fetch('/prometheus').then((data) => {
  //     console.log('connected to prometheus', data);
  //   });
  // }, []);


  return (
    <div className='landing'>
      <Link to='/dashboard' className='metrics-button'>
        <img id='periscopeLogo' src={Logo}  />
      </Link>
      <Link to='/podDashboard' className='metrics-button'>
        <button>PODS</button>
      </Link>
    </div>
  );
};

export default LandingContainer;
