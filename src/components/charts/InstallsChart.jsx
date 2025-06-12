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
  Cell
} from 'recharts';
import { getProductivity } from '../../api/ApiService';

export default function StackedProductivityChart() {
  const [data, setData] = useState([]);
  const [userIds, setUserIds] = useState([]);

  useEffect(() => {
    getProductivity()
      .then(raw => {
        // 1) Averiguar todos los user_id únicos
        const ids = Array.from(new Set(raw.map((r) => r.user_id)));
        setUserIds(ids);

        // 2) Pivotar: para cada fecha, crear un objeto { date, u1: value, u2: value, ... }
        const pivot = {};
        raw.forEach(({ date, user_id, value }) => {
          if (!pivot[date]) pivot[date] = { date };
          const key = `u${user_id}`;
          pivot[date][key] = (pivot[date][key] || 0) + value;
        });

        // 3) Ordenar cronológicamente y pasar a array
        const chartData = Object.values(pivot).sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setData(chartData);
      })
      .catch((err) => console.error('Error cargando productividad:', err));
  }, []);

  if (!data.length) return null;

  // Colores para cada usuario (cicla si hay más de 5)
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

        {userIds.map((id, idx) => (
          <Bar
            key={id}
            dataKey={`u${id}`}
            stackId="a"
            fill={COLORS[idx % COLORS.length]}
            isAnimationActive={false}
          />
        ))}

      </BarChart>
    </ResponsiveContainer>
  );
}
