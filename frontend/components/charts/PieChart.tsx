'use client';

import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { TransformedWeatherData } from '@/types/weather.types';

interface PieChartComponentProps {
  data: TransformedWeatherData[];
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({ data }) => {
  return (
    <PieChart width={600} height={300}>
      <Pie data={data} dataKey="temperature" nameKey="date" outerRadius={150} fill="#8884d8" label>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#8884d8' : '#82ca9d'} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;
