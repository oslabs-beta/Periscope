import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/periscope_logo_transparent.png'

const Header = () => {

  return (
    <div className='header'>
      <Link to='/' className='header-logo'><img src={Logo} id='logo' /></Link>
      <div>
        <Link className='header-button' to='/nodeDashboard'><button>Node Dashboard</button></Link>
        <Link className='header-button' to='/podDashboard'><button>Pod Dashboard</button></Link>
      </div>
    </div>
  )
}

export default Header;


