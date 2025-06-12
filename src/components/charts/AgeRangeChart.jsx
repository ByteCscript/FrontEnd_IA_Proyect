// src/components/charts/AgeRangeChart.jsx
import React from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

const ageData = [
  { name: '18-30', value: 46 },
  { name: '30-45', value: 32 },
  { name: '45-60', value: 18 },
  { name: '60+', value: 4 },
];
const COLORS = ['#8884d8', '#ffc658', '#82ca9d', '#d0ed57'];

export default function AgeRangeChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={ageData} dataKey="value" nameKey="name" outerRadius={80} label>
          {ageData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  );
}

