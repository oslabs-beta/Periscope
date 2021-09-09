/*
 * *****************************************************************************
 * @description Component that renders Pod CPU usage chart
 * *****************************************************************************
 */

import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import PodCpuToolTip from './PodCpuToolTip';
import colors from '../assets/colors';

const PodCPU = ({ clickedArray, timeWindow, step }) => {
  const [results, setResults] = useState([]);
  const [render, setRender] = useState(false);
  const [clickedLength, setClickedLength] = useState(0);
  const [timeWindowChange, setTimeWindowChange] = useState(timeWindow);
  const [stepChange, setStepChange] = useState(step);
  const lines = [];
  const resultArray = [];

  // clickedArray is the user selected list of pods, passed down from Pod Container

  if (clickedLength !== clickedArray.length) { // use clickedLength to trigger re-render when new clicked array is received
    if (clickedArray.length === 0) setClickedLength(0);
    setRender(false);
  }

  if (clickedArray.length > 0) {
    // create datapoint objects for each point in time series with values for first pod in clicked array
      clickedArray[0].cpuValues.forEach((x, i) => {
        const dataPoint = {};
        let time = new Date(x[0] * 1000);
        dataPoint.time = time.toLocaleString();

        // add values for other pods
        for (let j = 0; j < clickedArray.length; j++) {
          dataPoint[clickedArray[j].name] = +(
            parseFloat(clickedArray[j].cpuValues[i][1]) * 100
          ).toFixed(2);
        }
        resultArray.push(dataPoint); // results array contains datapoint objects 

    if (render === false) {
      setResults(resultArray);
      setClickedLength(clickedArray.length);
      setRender(true);
    }

    for (let i = 0; i < clickedArray.length; i++) {
      lines.push(
        <Line
          type='monotone'
          dot={false}
          dataKey={clickedArray[i].name}
          key={i}
          stroke={colors[i]}
        />
      );
    }
  }

  return (
    <div className='chart-container'>
      <h2>CPU Usage</h2>

      <LineChart
        width={500}
        height={275}
        data={results}
        margin={{
          top: 5,
          right: 25,
          left: 5,
          bottom: 5,
        }}>
        <CartesianGrid stroke={'grey'} />
        <XAxis
          tick={{ fontSize: 10 }}
          dataKey='time'
          ticks={[20, 40, 60, 80, 100]}
        />
        <YAxis
          tick={{ fontSize: 14 }}
          tickFormatter={(tick) => {
            return `${tick}%`;
          }}
        />
        <Tooltip content={PodCpuToolTip} />
        <Legend align='left' wrapperStyle={{ paddingLeft: '30px' }} />
        {lines}
      </LineChart>
    </div>
  );
};

export default PodCPU;
