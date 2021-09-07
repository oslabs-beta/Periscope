import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/periscopeTextLogoTransparent.png';

const LandingContainer = () => {

  return (
    <div className='landing'>
      <Link to='/nodeDashboard' className='metrics-button'>
        <img id='periscopeLogo' src={Logo}  />
      </Link>
    </div>
  );
};

export default LandingContainer;
