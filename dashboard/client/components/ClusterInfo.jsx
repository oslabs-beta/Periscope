import React from 'react';
import Table from './table.jsx';
import { useTable } from 'react-table';

const ClusterInfo = ({ clusterInfo }) => {
  if (clusterInfo.data) {
    const clusterInfoArr = clusterInfo.data.result;

    // component for each node
    const nodes = [];
    console.log('nodes', nodes);
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
      // nodes.push(
      //   <Node
      //     key={i}
      //     nodeName={nodeName}
      //     nodeNumber={nodeNumber}
      //     internal_ip={internal_ip}
      //     time={time}
      //   />
      // );
    }
    console.log('nodes', nodes);

    // const data = React.useMemo(() => {
    //   nodes;
    // }, []);
    // console.log('data', data);
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
        Header: 'Interal Ip',
        accessor: 'internal_ip',
      },
    ];
    // const columns = React.useMemo(
    //   () => [
    //     {
    //       Header: 'Node Name',
    //       accessor: 'nodeName', //
    //     },
    //     {
    //       Header: 'Node Number',
    //       accessor: 'nodeNumber',
    //     },
    //     {
    //       Header: 'Interal Ip',
    //       accessor: 'internal_ip',
    //     },
    //   ],
    //   []
    // );

    // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    //   useTable({ columns, data });
    return (
      <div className='table'>
        <h2>Cluster Info</h2>
        <Table columns={columns} data={nodes} />
      </div>
    );
  }
};

export default ClusterInfo;
