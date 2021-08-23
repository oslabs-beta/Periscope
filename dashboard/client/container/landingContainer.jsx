import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LandingContainer = ()=> {
useEffect(()=>{
  fetch('/prometheus').then(data=>{
    console.log('connected to prometheus', data)
  })
}, [])

  return (
    <div>
      <Link to="/dashboard" className="metrics-button">
        <button>Go to dashboard</button>
      </Link>
    </div>
  )
}

export default LandingContainer;