import React from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';

const CPU = () => {
  const data01 = [
    {
      name: 'Group A',
      value: 400,
    },
    {
      name: 'Group B',
      value: 300,
    },
    {
      name: 'Group C',
      value: 300,
    },
    {
      name: 'Group D',
      value: 200,
    },
    {
      name: 'Group E',
      value: 278,
    },
    {
      name: 'Group F',
      value: 189,
    },
  ];
  const renderLabel = (entry) => {
    return entry.name;
  };

  return (
    <div>
      <h2>CPU Usage</h2>
      <PieChart width={500} height={350}>
        <Pie
          data={data01}
          dataKey='value'
          nameKey='name'
          cx='50%'
          cy='50%'
          innerRadius={70}
          outerRadius={120}
          fill='#8884d8'
          label='name'
          paddingAngle={5}
          label={renderLabel}
        />
      </PieChart>
    </div>
  );
};

export default CPU;
