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
import TimeSeriesTooltip from './TimeSeriesTooltip';
import colors from '../assets/colors';

const CPU = (props) => {
  const resultArr = [];
  const lines = [];
  const [results, setResults] = useState([]);
  const [render, setRender] = useState(false);
  if (props.cpu.data) {
    const nodes = props.cpu.data.result;
    nodes[0].values.forEach((x, i) => {
      const dataPoint = {};
      let current = new Date(x[0] * 1000);
      dataPoint.time = current.toLocaleString();
      for (let j = 0; j < nodes.length; j++) {
        dataPoint[`node${j + 1}`] = (parseFloat(nodes[j].values[i][1])*100).toFixed(
          2);
      }
      resultArr.push(dataPoint);
    });
    if (render === false) {
      setResults(resultArr);
      setRender(true);
    }

    for (let i = 0; i < nodes.length; i++) {
      lines.push(
        <Line
          type='monotone'
          dot={false}
          dataKey={`node${i + 1}`}
          key={i}
          stroke={colors[i]}
        />
      );
    }
  };


  return (
    <div>
      <h2>CPU Usage</h2>

      <LineChart
        width={800}
        height={300}
        data={results}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        >
        <CartesianGrid stroke={'grey'} />
        <XAxis
          tick={{ fontSize: 10 }}
          dataKey='time'
          ticks={[20, 40, 60, 80, 100]}
        />
        <YAxis tickFormatter={(tick) => {
            return `${tick}%`;
          }}
        />
        <Tooltip content={TimeSeriesTooltip}/>
        <Legend />
        {lines}
      </LineChart>
    </div>
  );
};

export default CPU;
