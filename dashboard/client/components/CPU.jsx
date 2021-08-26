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
    const nodeNums = props.nodeNums;
    nodes[0].values.forEach((x, i) => {
      const dataPoint = {};
      let current = new Date(x[0] * 1000);
      dataPoint.time = current.toLocaleString();

      for (let j = 0; j < nodes.length; j++) {
      // match length of instance to length of ip addresses in node list
       const len = nodeNums[0].length;
       const internal_ip = nodes[j].metric.instance.slice(0, len);
       // find position of node in reference list
       const position = nodeNums.findIndex((ip) => ip === internal_ip);
        dataPoint[`node${position + 1}`] = (parseFloat(nodes[j].values[i][1])*100).toFixed(
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
    <div className='chart-container'>
      <h2>CPU Usage</h2>

      <LineChart
        width={750}
        height={275}
        data={results}
        margin={{
          top: 5,
          right: 25,
          left: 5,
          bottom: 5,
        }}
        padding={{right: 0, left: 0}}
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
        <Legend 
          align='left'
          wrapperStyle={{ paddingLeft: "30px" }}
        />
        {lines}
      </LineChart>
    </div>
  );
};

export default CPU;
