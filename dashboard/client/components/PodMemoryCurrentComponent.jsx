/*
 * *****************************************************************************
 * @description ????????
 * *****************************************************************************
 */


import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import PodMemoryTooltip from './PodMemoryTooltip';
import colors from '../assets/colors';

// component to render current memory usage of all pods in cluster 

const PodMemoryCurrentComponent = ({ podMemoryCurrent, podNums, clickedArray }) => {
  const [result, setResult] = useState([]); // data to pass to the chart
  const [render, setRender] = useState(false); // render state to allow recharts animation but prevent constant re-rendering
  let sortedData = []

  // check if current memory data has been received from query AND if podNums list contains pods
  if(podMemoryCurrent.data && Object.keys(podNums).length > 0) {
    
    const data = [];
    const podArray = podMemoryCurrent.data.result;
    for (let i = 0; i < podArray.length; i++) {
      const pod = {}; // create objects for each pod with relevant data from current memory query and pod number from podNums
      const podName = podArray[i].metric.pod;
      const newPodNumber = podNums[podName];
      if(newPodNumber) { // if pod exists in podNums (doesn't have a null node), assign values and push to data array
        pod.name = newPodNumber.name; 
        pod.value = +((+(podArray[i].value[1]) / 1000000).toFixed(2)) ;
        pod.number = newPodNumber.number
        data.push(pod)
      } 
    }

    sortedData = data.sort((a,b)=>(a.number > b.number) ? 1 : -1); // sort data array by pod number

    if (render === false) {
      setResult(sortedData); // set results with sorted data array 
      setRender(true);
    }
  }

  return (
    <div className='pod-memory-container'>
      <h2>Pod Memory Usage</h2>
      <div id='barChart'>
        <BarChart
          width={750}
          height={275}
          data={result}
          margin={{
            top: 5,
            right: 25,
            left: 5,
            bottom: 5,
          }}
          barSize={7}>
          <CartesianGrid stroke='grey' />
          {render && <XAxis dataKey='name' tick={{ fontSize: 10 }} ticks={[20, 40, 60, 80, 100]}/>}
          <YAxis tick={{ fontSize: 14 }} />
          <Tooltip cursor={{ fill: 'transparent' }} content={PodMemoryTooltip}/>
          <Bar dataKey='value' fill="#ff8505"  />
        </BarChart>
      </div>
    </div>
  );
};

export default PodMemoryCurrentComponent;

