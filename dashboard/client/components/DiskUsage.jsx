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


const DiskUsage = (props) => {
  if (!props.total.data) return null;
  if (!props.free.data) return null;


  const total = props.total.data?.result;
  const free = props.free.data?.result;

  // nodes object ==> name of node: total diskSpace
  const nodes = {};
  const data = [];

  // loop through freediskspace and get the times
  if (total && free) {

    // loops through totalDiskSpace query and pushes the name of node and total diskspace of node into an object
    for (let i = 0; i < total.length; i++) {
      // push each node #: diskSpace
      nodes[`node${i + 1}`] = total[i].value[1];
    }


    // loops through FreeDiskSpace and sends time and value @ time to new object
    for (let i = 0; i < free.length; i++) {
      const nodeNum = `node${i + 1}`;
      const values = free[i].values;

      // grab all the times from the first index of the array
      if (i === 0) {
        for (let j = 0; j < values.length; j++) {
          // grab the time: values[j][0] and convert time to human readable format
          const time = new Date(values[j][0] * 1000).toLocaleString();
          data.push({ time: time });
        }
      }
      // put the node # & it's value in each time object
      for (let k = 0; k < data.length; k++)
      {
        // (total size - value at each time) / total size
        const totalDisk = nodes[nodeNum];
        const freeDiskSpace = values[k][1];
        data[k][nodeNum] = +(((totalDisk - freeDiskSpace) / totalDisk).toFixed(4));
      }
    }
  }




  // create the lines for each node
  // <Line type='monotone' dataKey='10.142.0.3:9100' stroke='#82ca9d' />;
  // grab the names & the number of nodes from our nodes object
  const numNodes = Object.keys(nodes);
  const lines = [];
  for (let i = 0; i < numNodes.length; i++) {
    lines.push(
      <Line type='monotone' dataKey={`node${i + 1}`} key={i} stroke={lineColors[i]} />
    );
  }


  return (
    <div>
      <h2>Disk Usage</h2>
      <LineChart
        width={800}
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
        <XAxis dataKey="time" ticks={[20, 40, 60, 80, 100]}/>
        <YAxis />
        <Tooltip />
        <Legend />
        {lines}
      </LineChart>
    </div>
  );
};

export default DiskUsage;
