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

const TimeSeriesTooltip = props => {
  const { active, payload, label } = props;
  if (!active || !payload) return null;

  const nodeEntries = [];
  for (let i = 0; i < payload.length; i++) {
    nodeEntries.push(<p style={{margin: '0px', color: colors[i]}} key={i}>
    node{i + 1}: {payload[0].payload[`node${i + 1}`]}%
  </p>);
  }

  return (
  <div className="custom-tooltip" style={style}	>
    <p style={{margin: '0px'}}>
      {payload[0].payload.time}
    </p>
    {nodeEntries}
  </div>
  )
}

export default TimeSeriesTooltip;