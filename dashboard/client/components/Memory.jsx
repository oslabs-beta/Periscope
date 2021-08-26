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
import MemoryTooltip from './MemoryTooltip';
import colors from '../assets/colors';


const Memory = ({ nodeMemory, nodeNums }) => {
  // if (!nodeMemory.data) return null;
  const resultArr = [];
  const [result, setResult] = useState([]);
  const [render, setRender] = useState(false);
  if (nodeMemory.data) {
    const nodes = nodeMemory.data.result;
    nodes.forEach((node, i) => {
      // match length of instance to length of ip addresses in node list
      const len = nodeNums[0].length;
      const internal_ip = node.metric.instance.slice(0, len);
      // find position of node in reference list
      const position = nodeNums.findIndex((ip) => ip === internal_ip);
      const dataPoint = {};

      dataPoint.node = 'node' + (position + 1);
      dataPoint.ip = internal_ip;
      dataPoint.percentageMemoryUsed = (parseFloat(node.value[1])*100).toFixed(2);
      resultArr[position] = dataPoint;
    });
    if (render === false) {
      setResult(resultArr);
      setRender(true);
    }
  }

  return (
    <div className='memory-container'>
      <h2>Memory Usage</h2>
      <div id='barChart'>
        <BarChart
          width={500}
          height={275}
          data={result}
          margin={{
            top: 5,
            right: 25,
            left: 5,
            bottom: 5,
          }}
          barSize={20}>
          <CartesianGrid stroke='grey' />
          {render && <XAxis dataKey='node' tick={{ fontSize: 10 }} />}
          <YAxis tickFormatter={(tick) => {
            return `${tick}%`;
          }}
        />
          <Tooltip cursor={{ fill: 'transparent' }} content={MemoryTooltip}/>
          <Bar dataKey='percentageMemoryUsed' background={{ fill: 'grey' }}>
            {resultArr.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Bar>
        </BarChart>
      </div>
    </div>
  );
};

export default Memory;

