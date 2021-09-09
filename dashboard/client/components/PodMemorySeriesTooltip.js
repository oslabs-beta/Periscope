/*
 * *****************************************************************************
 * @description: Custom tooltip for hover information
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

const PodMemorySeriesTooltip = props => {
  const { active, payload, label } = props;
  if (!active || !payload) return null;

  const podEntries = [];
  for (let i = 0; i < payload.length; i++) {
    podEntries.push(<p style={{margin: '0px', color: colors[i]}} key={i}>
    {payload[i].name}: {payload[i].value}MB
  </p>);
  }

  return (
  <div className="custom-tooltip" style={style}	>
    <p style={{margin: '0px'}}>
      {payload[0].payload.time}
    </p>
    {podEntries}
  </div>
  )
}

export default PodMemorySeriesTooltip;