/*
 * *****************************************************************************
 * @description Custom tooltip that provides hover information
 * *****************************************************************************
 */

import React from 'react';
import colors from '../assets/colors';

const style = {
  backgroundColor: '#1F1B24',
  opacity: '0.9',
  border: 'none',
  borderRadius: '5px',
  padding: '5px',
  color: 'gray',
  textAlign: 'left',
  fontSize: '14px',
}

const MemoryTooltip = props => {
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

export default MemoryTooltip;