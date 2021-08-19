import React, { useState, useEffect } from 'react';
import Memory from '../components/Memory.jsx';
import CPU from '../components/CPU.jsx';
import ClusterInfo from '../components/ClusterInfo.jsx';
import DiskUsage from '../components/DiskUsage.jsx';

const mainContainer = () => {
  // const [metrics, setMetrics] = useState([]);

  // useEffect(() => {
  //   fetch('/metrics')
  //     .then((res) => res.json)
  //     .then((data) => {
  //       setMetrics(data);
  //     });
  // }, []);

  return (
    <div className='main-container'>
      <div className='components' id='Memory'>
        <Memory />
      </div>
      <div id='logs' className='components'>
        <ClusterInfo />
      </div>
      <div id='CPU' className='components'>
        <CPU />
      </div>
      <div id='disk-usage' className='components'>
        <DiskUsage />
      </div>
    </div>
  );
};

export default mainContainer;
