'use client';

import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { TransformedWeatherData } from '@/types/weather.types';

interface BarChartComponentProps {
  data: TransformedWeatherData[];
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ data }) => {
  return (
    <BarChart width={500} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="temperature" fill="#8884d8" />
    </BarChart>
  );
};

export default BarChartComponent;
