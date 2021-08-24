import React from 'react';
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
import colors from '../assets/colors';

const Memory = ({ nodeMemory }) => {
  if (!nodeMemory.data) return null;

  console.log('in memory component', nodeMemory);

  const nodes = nodeMemory.data.result;
  const resultArr = [];
  nodes.forEach((node, i) => {
    const dataPoint = {};
    dataPoint.node = 'node' + (i + 1);
    dataPoint.percentageMemoryUsed = +parseFloat(node.value[1]).toFixed(4);
    resultArr.push(dataPoint);
  });
  console.log(resultArr);

  // const colors = ['red', 'green', 'blue'];

  return (
    <div>
      <h2>Memory Usage</h2>
      <div id='barChart'>
        <BarChart
          width={500}
          height={300}
          data={resultArr}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='node' tick={{ fontSize: 10 }} />
          <YAxis />
          <Tooltip />
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

// const data = [
//   {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: 'Page D',
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: 'Page E',
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: 'Page F',
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];
