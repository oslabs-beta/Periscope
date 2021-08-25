import React from 'react';
import Node from './NodeInfo.jsx';

const ClusterInfo = ({ clusterInfo }) => {
  const nodes = [];
  if (clusterInfo.data) {
    const clusterInfoArr = clusterInfo.data.result;

    // component for each node

    for (let i = 0; i < clusterInfoArr.length; i++) {
      const nodeName = clusterInfoArr[i].metric.node;
      const nodeNumber = 'node' + (i + 1);
      const internal_ip = clusterInfoArr[i].metric.internal_ip;
      const time = new Date(clusterInfoArr[i].value[0] * 1000).toLocaleString();

      nodes.push(
        <Node
          key={i}
          nodeName={nodeName}
          nodeNumber={nodeNumber}
          internal_ip={internal_ip}
          time={time}
        />
      );
    }
  }
  return (
    <div>
      <h2>ClusterInfo</h2>
      <div>{nodes}</div>
    </div>
  );
};

export default ClusterInfo;
