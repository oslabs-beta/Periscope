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


const PodMemoryCurrentComponent = ({ podMemoryCurrent, podNums, clickedArray }) => {
  const [result, setResult] = useState([]);
  const [render, setRender] = useState(false);
  let sortedData = []
 
  

  if(podMemoryCurrent.data && Object.keys(podNums).length > 0){
  const data = [];
  const podArray = podMemoryCurrent.data.result;
  for (let i = 0; i < podArray.length; i++) {
    const pod = {};
    const podName = podArray[i].metric.pod
    const newPodNumber = podNums[podName]
    // console.log(newPodNumber)
    if(newPodNumber){
    pod.name = newPodNumber.name;
    pod.value = +((+(podArray[i].value[1]) / 1000000).toFixed(2)) ;
    pod.number = newPodNumber.number
    data.push(pod)}
  }

  // console.log('data: ', data)
   sortedData = data.sort((a,b)=>(a.number > b.number) ? 1 : -1);
  // console.log('sorted', sortedData)

    if (render === false) { 
      setResult(sortedData);
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
          <Bar dataKey='value' fill="#8884d8"  />
        </BarChart>
      </div>
    </div>
  );
};

export default PodMemoryCurrentComponent;

