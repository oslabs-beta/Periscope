import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const CPU = (props) => {

  if (!props.cpu.data) return null;
  
  const cpu = props.cpu.data?.result;
  const [results, setResults] = useState([]);
  const [resultsBool, setResultsBool] = useState(false);
  const lines = [];
  const colors = ['red', 'green', 'blue'];
  for (let i = 0; i < cpu.length; i++) {
    // console.log('cpu: ', cpu[i].metric.node);
    lines.push(<Line type="monotone" dot={false} dataKey={`node${i + 1}`} key={i} stroke={colors[i]} />)
    // console.log('value arr lengths: ', cpu[i].values.length);
  }
   
  useEffect(()=>{
    const resultArr = [];
    const node1 = cpu[0].metric.node;
    const node2 = cpu[1].metric.node;
    const node3 = cpu[2].metric.node;
    const node1vals = cpu[0].values;
    const node2vals = cpu[1].values;
    const node3vals = cpu[2].values;
    
        
    node1vals.forEach(x => {
      const dataPoint = {};
      let current = new Date(x[0]*1000)
      dataPoint.time = current.toLocaleString();
      dataPoint.node1 = parseFloat(x[1]).toFixed(4);
      resultArr.push(dataPoint);
    });
    resultArr.forEach((x, i) => {
      x.node2 = parseFloat(node2vals[i][1]).toFixed(4);
      x.node3 = parseFloat(node3vals[i][1]).toFixed(4);
    });
    // console.log(resultsBool);
    if (resultsBool === false) {
      setResults(resultArr);
      setResultsBool(true); 
    }
  }, [])

  // const node1name = cpu[0].metric.node;
  // const node1values = cpu[0].values;
  // console.log('node1: ', node1name);
  // console.log('node1vals: ', node1values);
  //data[i][nodename] = value subarray[i]
  // const data01 = [
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
  console.log('lines: ', lines);
 
  
  return (
    <div>
      <h2>CPU Usage</h2>
      <ResponsiveContainer>
      <LineChart
          width={500}
          height={300}
          data={results}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis scaleToFit={true} tick={{fontSize: 10}} dataKey="time" ticks={[20, 40, 60, 80, 100]}/>
          <YAxis />
          <Tooltip />
          <Legend />
          {lines || null}
        </LineChart>
        </ResponsiveContainer>
      </div>
  
  );
};

export default CPU;
