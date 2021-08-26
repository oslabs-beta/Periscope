import React from 'react';
import colors from '../assets/colors';

const style = {
  backgroundColor: 'darkgray',
  opacity: '0.9',
  border: 'none',
  borderRadius: '5px',	
  padding: '5px',
  color: 'whitesmoke'
}

const CustomTooltip = props => {
  const { active, payload, label } = props;
  if (!active || !payload) return null;
  
  return (
  <div className="custom-tooltip" style={style}	>
    <p style={{margin: '0px'}}>
      {payload[0].value}%
    </p>
  </div>
  )
}

export default CustomTooltip;