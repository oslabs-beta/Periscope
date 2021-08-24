import React from 'react';

const NodeInfo = (props) => {


  return (
    <div>
      <div>{props.time}</div>
      <div>{`${props.nodeNumber}: ${props.nodeName}`}</div>
      <div>{`Internal ip address: ${props.internal_ip}`}</div>
    </div>
  )
};

export default NodeInfo;