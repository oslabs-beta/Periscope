import React, { useState, useEffect } from 'react';
import Memory from '../components/Memory.jsx';
import CPU from '../components/CPU.jsx';
import ClusterInfo from '../components/ClusterInfo.jsx';
import DiskUsage from '../components/DiskUsage.jsx';

const mainContainer = () => {
  const [cpu, setCPU] = useState({});
  const [totalDisk, setTotalDisk] = useState({});
  const [freeDisk, setFreeDisk] = useState({});
  const [nodeMemory, setNodeMemory] = useState({});
  const [clusterInfo, setClusterInfo] = useState({});

  useEffect(() => {
    fetch('/metrics')
      .then((res) => res.json())
      .then((data) => {
        setCPU(data.nodeCPU);
        setTotalDisk(data.totalDisk);
        setFreeDisk(data.freeDisk);
        setNodeMemory(data.nodeMemory);
        console.log(data.clusterInfo)
        setClusterInfo(data.clusterInfo);
       
      });
  }, []);
  // const td = totalDisk.data?.result;

  return (

    
    <div className='main-container'>
          <div id='CPU' className='components'>
        <CPU cpu={cpu} />
      </div>
      <div className='components' id='Memory'>
        <Memory nodeMemory={nodeMemory} />
      </div>
      <div id='disk-usage' className='components'>
        <DiskUsage total={totalDisk} free={freeDisk} />
      </div>
      <div id='logs' className='components'>
        <ClusterInfo clusterInfo={clusterInfo} />
      </div>
     
    </div>
  );
};

export default mainContainer;
