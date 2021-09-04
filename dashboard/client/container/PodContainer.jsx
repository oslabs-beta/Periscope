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
  const [podNames, setPodNames] = useState([]);
  const [clickedArray, setClickedArray] = useState([]);
  const [render, setRender] = useState(false);


  // time variables
  const sixHours = 21600;
  const endTime = Math.floor(Date.now() / 1000);
  const startTime = endTime - sixHours;
  const step = '5m';
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
        console.log(data);
        setPodCpu(data.getPodCpu);
        setPodMemorySeries(data.getPodMemorySeries);
        setPodMemoryCurrent(data.getPodMemoryCurrent);
        setPodInfo(data.getPodInfo);
        setIsLoading(false);
      });
  }, []);

  // if data is loaded and data states are set, but called state is false
  if (!isLoading && !called) {
    const podInfoNumbers = {}; // empty object to store pod info with names
    let counter = 1; // counter to keep track of non-null pods
    const podList = []; // array of pod list items for rendering

    for (let i = 0; i < podInfo.data.result.length; i++) {
      // create nodes 1 through x based on internal Ip addresses
      let pod = podInfo.data.result[i].metric;
      if (pod.node) {
        // console.log(pod.node);
        podInfoNumbers[pod.pod] = {
          node: pod.node,
          pod_ip: pod.pod_ip,
          name: `pod${counter}`,
          number: counter,
          podName: pod.pod
          // clicked: false,
        };
        // podList.push(<li onClick={()=>{newclick(pod.pod)}} key={i}>{podInfoNumbers[pod.pod].name} {pod.pod}</li>)
        counter++
      }
    }

    for (let i = 0; i < podCpu.data.result.length; i++) {
      let cpuPod = podCpu.data.result[i].metric.pod;
      if (podInfoNumbers[cpuPod]) podInfoNumbers[cpuPod].cpuValues = podCpu.data.result[i].values;
      let memPod = podMemorySeries.data.result[i].metric.pod;
      if (podInfoNumbers[memPod]) podInfoNumbers[memPod].memorySeriesValues = podMemorySeries.data.result[i].values;
    }

    // onclick function to keep track of selected pods


    // create and set podlist

    setPodNums(podInfoNumbers);
    setPodNames(podList);
    setCalled(true);
  }


  return (<div>
    <PodInfoRows clickedArray={clickedArray} setClickedArray={setClickedArray} podNums={podNums} />
    <PodMemoryCurrentComponent podMemoryCurrent={podMemoryCurrent} podNums={podNums} />
    <PodMemorySeriesComponent clickedArray={clickedArray} />
    <PodCPU clickedArray={clickedArray} />
  </div>)
};

export default PodContainer;
