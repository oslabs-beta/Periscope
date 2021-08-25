import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/periscopeLogoTransparent.png';

const LandingContainer = () => {
  useEffect(() => {
    fetch('/prometheus').then((data) => {
      console.log('connected to prometheus', data);
    });
  }, []);

  return (
    <div className='landing'>
      <Link to='/dashboard' className='metrics-button'>
        <img id='periscopeLogo' src={Logo} />
      </Link>
    </div>
  );
};

export default LandingContainer;
