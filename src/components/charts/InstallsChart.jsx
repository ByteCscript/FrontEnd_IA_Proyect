// src/components/charts/StackedProductivityChart.jsx
import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { getProductivity, getUsers } from '../../api/ApiService';

export default function StackedProductivityChart() {
  const [data, setData] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const [userMap, setUserMap] = useState({});

  useEffect(() => {
    Promise.all([getProductivity(), getUsers()])
      .then(([rawMetrics, users]) => {
        const map = {};
        users.forEach(u => (map[u.id] = u.name));
        setUserMap(map);

        const ids = Array.from(new Set(rawMetrics.map(r => r.user_id)));
        setUserIds(ids);

        const pivot = {};
        rawMetrics.forEach(({ date, user_id, value }) => {
          if (!pivot[date]) pivot[date] = { date };
          const key = `u${user_id}`;
          pivot[date][key] = (pivot[date][key] || 0) + value;
        });

        const chartData = Object.values(pivot).sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setData(chartData);
      })
      .catch(console.error);
  }, []);

  if (!data.length || !userIds.length) return null;

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1'];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
        barCategoryGap="30%"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" stroke="#aaa" />
        <YAxis stroke="#aaa" />
        <Tooltip
          formatter={val => val.toFixed(1)}
          labelFormatter={lbl => `Día: ${lbl}`}
        />
        <Legend verticalAlign="top" wrapperStyle={{ marginBottom: 24 }} />

        {userIds.map((id, idx) => (
          <Bar
            key={id}
            dataKey={`u${id}`}
            name={userMap[id] || `User ${id}`}
            stackId="a"
            fill={COLORS[idx % COLORS.length]}
            // Animaciones
            isAnimationActive={true}
            animationBegin={idx * 200}
            animationDuration={800}
            animationEasing="ease-out"
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
