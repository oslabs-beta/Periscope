import React, { useState, useEffect } from 'react';
import Memory from '../components/Memory.jsx';
import CPU from '../components/CPU.jsx';
import ClusterInfo from '../components/ClusterInfo.jsx';
import DiskUsage from '../components/DiskUsage.jsx';
import loading from '../assets/loading.gif';


const mainContainer = () => {
  const [cpu, setCPU] = useState({});
  const [totalDisk, setTotalDisk] = useState({});
  const [freeDisk, setFreeDisk] = useState({});
  const [nodeMemory, setNodeMemory] = useState({});
  const [clusterInfo, setClusterInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [nodeNums, setNodeNums] = useState([]);
  const [called, setCalled] = useState(false);

  useEffect(async () => {
    const response = await fetch('/metrics');
    const data = await response.json();
    setCPU(data.nodeCPU);
    setTotalDisk(data.totalDisk);
    setFreeDisk(data.freeDisk);
    setNodeMemory(data.nodeMemory);
    setClusterInfo(data.clusterInfo);
    setIsLoading(false);
  }, []);

  if (!isLoading && !called) {
    const result = [];
    console.log(clusterInfo.data.result);
    for (let i = 1; i <= clusterInfo.data.result.length; i++){
      // create nodes 1 through x based on internal Ip addresses
      result.push(clusterInfo.data.result[i - 1].metric.internal_ip);
    }
    setNodeNums(result);
    setCalled(true);
  }

  return (
    (isLoading)
    ?
    <img id='loading' src={loading} />
    :
    <div className='main-container'>
      <div id='CPU' className='components'>
        <CPU cpu={cpu} />
      </div>
      <div className='components' id='Memory'>
        <Memory nodeMemory={nodeMemory} nodeNums={nodeNums} />
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
