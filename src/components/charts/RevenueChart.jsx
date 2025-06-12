import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

const revenueData = [
  { name: 'Mon', revenue: 1200 },
  { name: 'Tue', revenue: 2100 },
  { name: 'Wed', revenue: 800 },
  { name: 'Thu', revenue: 1600 },
  { name: 'Fri', revenue: 900 },
];

export default function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={revenueData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} dot />
      </LineChart>
    </ResponsiveContainer>
  );
}
