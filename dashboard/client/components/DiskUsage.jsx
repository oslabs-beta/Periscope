import React, { useState } from 'react';
import lineColors from '../assets/colors';
import TimeSeriesTooltip from './TimeSeriesTooltip';
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
  // nodes object ==> name of node: total diskSpace
  const nodes = {};
  const data = [];
  const lines = [];
  const [diskUsage, setDiskUsage] = useState([]);
  const [render, setRender] = useState(false);
  if (props.free.data) {
    const total = props.total.data?.result;
    const free = props.free.data?.result;
    const nodes = {};
    const nodeNums = props.nodeNums;
    // loop through freediskspace and get the times

    // loops through totalDiskSpace query and pushes the name of node and total diskspace of node into an object
    for (let i = 0; i < total.length; i++) {
      // push each node #: diskSpace

      // match length of instance to length of ip addresses in node list
      const len = nodeNums[0].length;
      const internal_ip = total[i].metric.instance.slice(0, len);
      // // find position of node in reference list
      const position = nodeNums.findIndex((ip) => ip === internal_ip);

      nodes[`node${position + 1}`] = total[i].value[1];
    }

    // loops through FreeDiskSpace and sends time and value @ time to new object
    for (let i = 0; i < free.length; i++) {
      const values = free[i].values;
      //find correct nodeNum
      // match length of instance to length of ip addresses in node list
      const len = nodeNums[0].length;
      const internal_ip = free[i].metric.instance.slice(0, len);
      // // find position of node in reference list
      const position = nodeNums.findIndex((ip) => ip === internal_ip);

      // grab all the times from the first index of the array
      if (i === 0) {
        for (let j = 0; j < values.length; j++) {
          const time = new Date(values[j][0] * 1000).toLocaleString();
          data.push({ time: time });
        }
      }
      // put the node # & it's value in each time object
      for (let k = 0; k < data.length; k++) {
        // (total size - value at each time) / total size
        const totalDisk = nodes[`node${position + 1}`];
        const freeDiskSpace = values[k][1];
        data[k][`node${position + 1}`] = (((totalDisk - freeDiskSpace) / totalDisk)*100).toFixed(2);
      }
    }

    if (render === false) {
      setDiskUsage(data);
      setRender(true);
    }

    for (let i = 0; i < total.length; i++) {
      lines.push(
        <Line
          type='monotone'
          dot={false}
          dataKey={`node${i + 1}`}
          key={i}
          stroke={lineColors[i]}
        />
      );
    }
  }
  return (
    <div>
      <h2>Disk Usage</h2>
      <LineChart
        width={800}
        height={300}
        data={diskUsage}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}>
        <CartesianGrid stroke='grey' />
        <XAxis
          dataKey='time'
          ticks={[20, 40, 60, 80, 100]}
          tick={{ fontSize: 10 }}
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

export default DiskUsage;
