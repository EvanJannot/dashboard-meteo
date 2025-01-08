'use client';

import { PieChart, ResponsiveContainer, Pie, Cell, Tooltip, Legend } from 'recharts';

interface PieChartComponentProps {
  humidity: number;
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({ humidity }) => {
  const remaining = 100 - humidity;

  const data = [
    { name: 'Humidité', value: humidity },
    { name: 'Sec', value: remaining },
  ];

  const COLORS = ['#8884d8', '#82ca9d'];
  return (
    <ResponsiveContainer  height="85%">
      <PieChart width={500} height={300}>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label={(entry) => `${entry.name}: ${entry.value}%`}>
        {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
        <Tooltip formatter={(value: number) => `${value}%`} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
