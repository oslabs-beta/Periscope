/*
 * *****************************************************************************
 * @description Table to display pod info
 * *****************************************************************************
 */


import React from 'react';
import PodTable from './PodTable.jsx';
import { useTable } from 'react-table';
import {MDBTable} from 'mdbreact'



const PodInfoTableSetup = ({ podNums, newClick, clickedArray }) => {
  
  if (podNums) {
    const podNames = Object.keys(podNums);
    const pods = [];
    // create an object for each pod in podnums with relevant data; store objects in pods array to pass as data to table
    for (let i = 0; i < podNames.length; i++) {
      const newObj = {};
      const podName = podNames[i];
      newObj['podName'] = podName;
      newObj['podNumber'] = podNums[podName].number;
      newObj['internal_ip'] = podNums[podName].pod_ip;
      newObj['node'] = podNums[podName].node;
      pods.push(newObj);
    }

    // columns for pod table 
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
