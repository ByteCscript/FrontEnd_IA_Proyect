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
    // Fetch productivity metrics and user list in parallel
    Promise.all([getProductivity(), getUsers()])
      .then(([rawMetrics, users]) => {
        // Build user_id → name map
        const map = {};
        users.forEach((u) => {
          map[u.id] = u.name;
        });
        setUserMap(map);

        // Unique user IDs from metrics
        const ids = Array.from(new Set(rawMetrics.map((r) => r.user_id)));
        setUserIds(ids);

        // Pivot metrics into date buckets per user
        const pivot = {};
        rawMetrics.forEach(({ date, user_id, value }) => {
          if (!pivot[date]) pivot[date] = { date };
          const key = `u${user_id}`;
          pivot[date][key] = (pivot[date][key] || 0) + value;
        });

        // Sort by date
        const chartData = Object.values(pivot).sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setData(chartData);
      })
      .catch((err) => console.error('Error cargando datos:', err));
  }, []);

  if (!data.length || !userIds.length) return null;

  // Some nice colors to cycle through
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1'];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        data={data}
        margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip 
          formatter={(val) => val.toFixed(1)} 
          labelFormatter={(lbl) => `Día: ${lbl}`} 
        />
        <Legend verticalAlign="top" />

        {userIds.map((id, idx) => (
          <Bar
            key={id}
            dataKey={`u${id}`}
            name={userMap[id] || `User ${id}`}
            stackId="a"
            fill={COLORS[idx % COLORS.length]}
            isAnimationActive={false}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
