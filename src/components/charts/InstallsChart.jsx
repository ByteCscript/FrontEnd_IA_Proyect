// src/components/charts/InstallsChart.jsx
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

const installsData = [
  { day: 'Mon', ios: 400, android: 240 },
  { day: 'Tue', ios: 300, android: 456 },
  { day: 'Wed', ios: 300, android: 139 },
  { day: 'Thu', ios: 200, android: 980 },
  { day: 'Fri', ios: 278, android: 390 },
];

export default function InstallsChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={installsData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="ios" stackId="a" fill="#8884d8" />
        <Bar dataKey="android" stackId="a" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}
