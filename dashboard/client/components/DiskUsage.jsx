import React from 'react';
import lineColors from '../assets/colors';

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
/*
{
  time: #
  node1: val
  node2: val
  node3: val 
}

{
  time: 10am 
  node1@10am
  node2@10am
  node3@10am
}
*/

const DiskUsage = (props) => {
  const total = props.total.data?.result;
  const free = props.free.data?.result;

  // nodes object ==> name of node: total diskSpace
  const nodes = {};
  const data = [];

  // loop through freediskspace and get the times
  if (total && free) {
    // loops through totalDiskSpace query and pushes the name of node and total diskspace of node into an object
    for (let i = 0; i < total.length; i++) {
      // push each nodename: diskSpace
      nodes[total[i].metric.instance] = total[i].value[1];
    }

    // console.log(free);

    // loops through FreeDiskSpace and sends time and value @ time to new object
    for (let i = 0; i < free.length; i++) {
      // each free[index].metric.instance ==> name of the node
      const nodeName = free[i].metric.instance;
      const values = free[i].values;
      // free[index].values is an array
      // loop through the array and each index in that array [time, value]

      // grab all the times from the first index of the array
      if (i === 0) {
        for (let j = 0; j < values.length; j++) {
          // grab the time: values[j][0] and convert time to human readable format
          const time = new Date(values[j][0] * 1000).toLocaleString();
          data.push({ time: time });
        }
      }
      // put the node name & it's value in each time object
      for (let k = 0; k < data.length; k++) {
        // (total size - value at each time) / total size
        const totalDisk = nodes[nodeName];
        const freeDiskSpace = values[k][1];
        data[k][nodeName] = (totalDisk - freeDiskSpace) / totalDisk;
      }
    }
  }

  // create the lines for each node
  <Line type='monotone' dataKey='10.142.0.3:9100' stroke='#82ca9d' />;
  // grab the names & the number of nodes from our nodes object
  const numNodes = Object.keys(nodes);
  const lines = [];
  for (let i = 0; i < numNodes.length; i++) {
    lines.push(
      <Line type='monotone' dataKey={numNodes[i]} stroke={lineColors[i]} />
    );
  }

  // console.log(data);

  // const dataNm = [
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

  return (
    <div>
      <h2>Disk Usage</h2>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='time' />
        <YAxis />
        <Tooltip />
        <Legend />
        {lines}
      </LineChart>
    </div>
  );
};

export default DiskUsage;
