// src/components/charts/SalesChart.jsx
import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { getSales, getUsers } from '../../api/ApiService';

export default function SalesChart() {
  const [data, setData] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const [userMap, setUserMap] = useState({});

  useEffect(() => {
    Promise.all([getSales(), getUsers()])
      .then(([rawSales, users]) => {
        const map = {};
        users.forEach(u => (map[u.id] = u.name));
        setUserMap(map);

        const ids = Array.from(new Set(rawSales.map(r => r.user_id)));
        setUserIds(ids);

        const pivot = {};
        rawSales.forEach(({ date, user_id, amount }) => {
          if (!pivot[date]) pivot[date] = { date, total: 0 };
          const key = `u${user_id}`;
          pivot[date][key] = (pivot[date][key] || 0) + amount;
          pivot[date].total += amount;
        });

        const chartData = Object.values(pivot).sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setData(chartData);
      })
      .catch(err => console.error('Error loading sales:', err));
  }, []);

  if (!data.length || !userIds.length) return null;

  const USER_COLORS = [
    '#8884d8', '#82ca9d', '#ffc658', '#ff8042',
    '#8dd1e1', '#a4de6c', '#d0ed57', '#888888'
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 60, right: 20, left: 0, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" stroke="#aaa" />
        <YAxis stroke="#aaa" />
        <Tooltip
          formatter={(val) =>
            new Intl.NumberFormat('es-ES', {
              style: 'currency',
              currency: 'USD'
            }).format(val)
          }
          labelFormatter={(lbl) => `Fecha: ${lbl}`}
        />
        <Legend verticalAlign="top" wrapperStyle={{ marginBottom: 16 }} />

        {/* Trazas de usuario, animación más lenta */}
        {userIds.map((id, idx) => (
          <Line
            key={id}
            type="monotone"
            dataKey={`u${id}`}
            name={userMap[id]}
            stroke={USER_COLORS[idx % USER_COLORS.length]}
            strokeWidth={1}
            dot={false}
            opacity={0.4}
            isAnimationActive={true}
            animationBegin={0}
            animationDuration={15000}
            animationEasing="ease-in-out"
          />
        ))}

        {/* Línea de ventas totales, también lenta y suave */}
        <Line
          type="monotone"
          dataKey="total"
          name="Ventas totales"
          stroke="#ffffff"
          strokeWidth={3}
          dot={{ r: 4, fill: '#ffffff' }}
          activeDot={{ r: 6, fill: '#ffffff' }}
          isAnimationActive={true}
          animationBegin={0}
          animationDuration={15000}
          animationEasing="ease-in-out"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
