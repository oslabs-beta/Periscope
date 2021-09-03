import React, { useState, useEffect } from 'react';
import podMemoryCurrent from '../components/podMemoryCurrent.jsx';

const podContainer = () => {
  const [podCpu, setPodCpu] = useState({});
  const [podMemorySeries, setPodMemorySeries] = useState({});
  const [podMemoryCurrent, setPodMemoryCurrent] = useState({});
  const [podInfo, setPodInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [podNums, setPodNums] = useState({});
  const [called, setCalled] = useState(false);

  const sixHours = 21600;
  const endTime = Math.floor(Date.now() / 1000);
  // const startTime = '1630286575';
  // const endTime = new Date.now() / 1000;
  const startTime = endTime - sixHours;
  const step = '5m';

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

  //cpuDataSetObject: {pod1: [timeseries data]}

  //<cpu component data={dataSetObject}>
  //function coudl check first if the pod exists as an key on the object. and if it does delete. and if it doesn't add. it
  //cpuDataSetObect = ...cpuDataSetObject{pod2: [timeSeriesData]}
  //onclick if cpuDataSetObject[pod2] then delete

  if (!isLoading && !called) {
    console.log('podinfo', podInfo);
    const result = {};
    for (let i = 0; i < podInfo.data.result.length; i++) {
      // create nodes 1 through x based on internal Ip addresses
      let pod = podInfo.data.result[i].metric;
      result[pod.pod] = {
        node: pod.node,
        pod_ip: pod.pod_ip,
      };
    }
    console.log('object of pod names: ', result);
    setPodNums(result);
    setCalled(true);
  }

  return <div>pod Container</div>;
};

export default podContainer;
