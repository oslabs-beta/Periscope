import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const CPU = (props) => {

  if (!props.cpu.data) return null;
  
  const nodes = props.cpu.data.result; 
  const resultArr = [];
  nodes[0].values.forEach((x, i) => {
    const dataPoint = {};
    let current = new Date(x[0]*1000);
    dataPoint.time = current.toLocaleString();
    for (let j = 0; j < nodes.length; j++) { 
      dataPoint[`node${j + 1}`] = parseFloat(nodes[j].values[i][1]).toFixed(4);
    }
    resultArr.push(dataPoint);
  });

  const lines = [];
  const colors = ['red', 'green', 'blue'];
  for (let i = 0; i < nodes.length; i++) {
    lines.push(<Line type="monotone" dot={false} dataKey={`node${i + 1}`} key={i} stroke={colors[i]} />)
  };
 
  return (
    <div>
      <h2>CPU Usage</h2>
      <ResponsiveContainer>
      <LineChart
          width={500}
          height={300}
          data={resultArr}
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