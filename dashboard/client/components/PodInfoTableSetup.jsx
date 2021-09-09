/*
 * *****************************************************************************
 * @description ????????
 * *****************************************************************************
 */


import React from 'react';
import PodTable from './PodTable.jsx';
import { useTable } from 'react-table';
import {MDBTable} from 'mdbreact'

const PodInfoTableSetup = ({ podNums, newClick, clickedArray }) => {
  // if(podNums)
  if (podNums) {
    const podNames = Object.keys(podNums);
    // component for each node
    const pods = [];
    // console.log('nodes', nodes);
    for (let i = 0; i < podNames.length; i++) {
      const newObj = {};
      const podName = podNames[i];
      newObj['podName'] = podName;
      newObj['podNumber'] = podNums[podName].number;
      newObj['internal_ip'] = podNums[podName].pod_ip;
      newObj['node'] = podNums[podName].node;
      pods.push(newObj);
    }

    const columns = [
      {
        Header: 'Pod#',
        accessor: 'podNumber',
      },
      {
        Header: 'Pod Name',
        accessor: 'podName',
      },
      {
        Header: 'Pod Ip',
        accessor: 'internal_ip',
      },
      {
        Header: 'Node',
        accessor: 'node',
      },
    ];

    //   ];
    //   // const columns = React.useMemo(
    //   //   () => [
    //   //     {
    //   //       Header: 'Node Name',
    //   //       accessor: 'nodeName', //
    //   //     },
    //   //     {
    //   //       Header: 'Node Number',
    //   //       accessor: 'nodeNumber',
    //   //     },
    //   //     {
    //   //       Header: 'Interal Ip',
    //   //       accessor: 'internal_ip',
    //   //     },
    //   //   ],
    //   //   []
    //   // );

    //   // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    //   //   useTable({ columns, data });
    return (
        <div className='table'>
          <MDBTable scrollY >
            <PodTable columns={columns} data={pods} newClick={newClick} clickedArray={clickedArray}/>
          </MDBTable>
        </div>
    );
  }
};

export default PodInfoTableSetup;
