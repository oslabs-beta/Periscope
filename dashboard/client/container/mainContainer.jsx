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
      <div className='Memory'>
        <Memory />
      </div>
      <div className='logs'>
        <ClusterInfo />
      </div>
      <div className='CPU'>
        <CPU />
      </div>
      <div>
        <DiskUsage />
      </div>
    </div>
  );
};

export default mainContainer;
