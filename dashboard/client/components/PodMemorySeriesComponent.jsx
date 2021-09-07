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
import PodMemorySeriesTooltip from './PodMemorySeriesTooltip';
import colors from '../assets/colors';

const PodMemorySeriesComponent = ({ clickedArray }) => {
  const [results, setResults] = useState([]);
  const [render, setRender] = useState(false);
  const [clickedLength, setClickedLength] = useState(0);
  const lines = [];
  const resultArray = [];

  if (clickedLength !== clickedArray.length) {
    if (clickedArray.length === 0) setClickedLength(0);
    setRender(false);
  }

  // console.log('clicked array in podCpu', clickedArray);
  // console.log('set render', render);

  if (clickedArray.length > 0) {
    clickedArray[0].memorySeriesValues.forEach((x, i) => {
      const dataPoint = {};
      let time = new Date(x[0] * 1000);
      dataPoint.time = time.toLocaleString();

      for (let j = 0; j < clickedArray.length; j++) {
        dataPoint[clickedArray[j].name] = +(
          parseFloat(clickedArray[j].memorySeriesValues[i][1]) / 1000000
        ).toFixed(4);
      }
      resultArray.push(dataPoint);
    });

    if (render === false) {
      // console.log(resultArray);
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
      <h2>Memory Usage</h2>

      <LineChart
        width={750}
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
            return `${tick}MB`;
          }}
        />
        <Tooltip content={PodMemorySeriesTooltip} />
        <Legend align='left' wrapperStyle={{ paddingLeft: '30px' }} />
        {lines}
      </LineChart>
    </div>
  );
};

export default PodMemorySeriesComponent;
