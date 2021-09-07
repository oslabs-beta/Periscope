import React, { useState, useEffect } from 'react';
import PodMemoryCurrentComponent from '../components/PodMemoryCurrentComponent.jsx';
import PodCPU from '../components/PodCPU.jsx';
import PodInfoRows from '../components/PodInfoRows.jsx';
import PodMemorySeriesComponent from '../components/PodMemorySeriesComponent.jsx';

const PodContainer = () => {
  const [podCpu, setPodCpu] = useState({});
  const [podMemorySeries, setPodMemorySeries] = useState({});
  const [podMemoryCurrent, setPodMemoryCurrent] = useState({});
  const [podInfo, setPodInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [podNums, setPodNums] = useState({});
  const [called, setCalled] = useState(false);
  const [clickedArray, setClickedArray] = useState([]);
  const [timeWindow, setTimeWindow] = useState(21600);
  const [step, setStep] = useState('5m');
  
  // time variables for promQL query range
  const endTime = Math.floor(Date.now() / 1000);
  const startTime = endTime - timeWindow;
  
  // query to graphql server
  const query = `{
    getPodCpu(startTime: "${startTime}", endTime: "${endTime}", step: "${step}") {
      data {
        result {
          metric {
            pod
          }
          values
        }
      }
    }
    getPodMemorySeries(startTime: "${startTime}", endTime: "${endTime}", step: "${step}") {
      data {
        result {
          metric {
            pod
          }
          values
        }
      }
    }
    getPodMemoryCurrent {
      data {
        result {
          metric {
            pod
          }
          value
        }
      }
    }
    getPodInfo {
      data {
        result {
          metric {
            node
            pod
            pod_ip
          }
        }
      }
    }
  }`;

  // fetch to graphql backend, set state with resulting data
  useEffect(() => {
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        const data = res.data;
        setPodCpu(data.getPodCpu);
        setPodMemorySeries(data.getPodMemorySeries);
        setPodMemoryCurrent(data.getPodMemoryCurrent);
        setPodInfo(data.getPodInfo);
        setIsLoading(false);
        setCalled(false); // reset called to false for updating with fresh data
      });
  }, [timeWindow, step]);
  
  // if data is loaded and data states are set, but called state is false
  if (!isLoading && !called) {
    const podInfoNumbers = {}; // empty object to store pod info with names
    let counter = 1; // counter to keep track of non-null pods

    for (let i = 0; i < podInfo.data.result.length; i++) {
      // create pods 1 through x based on pod names
      let pod = podInfo.data.result[i].metric;
      if (pod.node) { // skip pods with null nodes
        podInfoNumbers[pod.pod] = { // pod object with data
          node: pod.node,
          pod_ip: pod.pod_ip,
          name: `pod${counter}`,
          number: counter,
          podName: pod.pod
        };
        counter++; // counter to keep track of number of valid pods (no null nodes)
      }
    }

    for (let i = 0; i < podCpu.data.result.length; i++) {
      // update individual pod objects with cpu values and memory values
      let cpuPod = podCpu.data.result[i].metric.pod;
      if (podInfoNumbers[cpuPod]) podInfoNumbers[cpuPod].cpuValues = podCpu.data.result[i].values;
      let memPod = podMemorySeries.data.result[i].metric.pod;
      if (podInfoNumbers[memPod]) podInfoNumbers[memPod].memorySeriesValues = podMemorySeries.data.result[i].values;
    }
    
    setPodNums(podInfoNumbers);
    setCalled(true);
  }


  return (
    <div className='pod-container'>
      <div className="components" id="podInfo">
        <PodInfoRows  clickedArray={clickedArray} setClickedArray={setClickedArray} podNums={podNums} setTimeWindow={setTimeWindow} setStep={setStep} />
      </div>
      <div className="components pod-time-series" id="podMemory">
        <PodMemorySeriesComponent  clickedArray={clickedArray} />
      </div>
      <div className="components" id="podMemoryBars">
        <PodMemoryCurrentComponent podMemoryCurrent={podMemoryCurrent} podNums={podNums} />
      </div>
      <div className="components pod-time-series" id="podCpu">
        <PodCPU clickedArray={clickedArray} />
      </div>
    </div>
  )
};

export default PodContainer;
