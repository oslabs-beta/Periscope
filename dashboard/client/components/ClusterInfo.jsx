/*
 * *****************************************************************************
 * @description Component that renders Node cluster info
 * *****************************************************************************
 */

import React from 'react';
import Table from './table.jsx';
import { useTable } from 'react-table';

const ClusterInfo = ({ clusterInfo }) => {
  if (clusterInfo.data) {
    const clusterInfoArr = clusterInfo.data.result;
    const nodes = [];

    //loops through each node and saves the node information in an object then pushes to an array. This data will be passed to react-table.
    for (let i = 0; i < clusterInfoArr.length; i++) {
      const nodeName = clusterInfoArr[i].metric.node;
      const nodeNumber = 'node' + (i + 1);
      const internal_ip = clusterInfoArr[i].metric.internal_ip;
      const time = new Date(clusterInfoArr[i].value[0] * 1000).toLocaleString();
      const newObj = {};
      newObj['nodeName'] = nodeName;
      newObj['nodeNumber'] = nodeNumber;
      newObj['internal_ip'] = internal_ip;
      nodes.push(newObj);
    }
    
      //creates header titles for react-table and binds them to key in node object. 
    const columns = [
      {
        Header: 'Node Number',
        accessor: 'nodeNumber',
      },
      {
        Header: 'Node Name',
        accessor: 'nodeName',
      },
      {
        Header: 'Internal Ip',
        accessor: 'internal_ip',
      },
    ];


    return (
      <div>
        <h2>Cluster Info</h2>
        <div className='table'>
          <Table columns={columns} data={nodes} />
        </div>
      </div>
    );
  }
};

export default ClusterInfo;
