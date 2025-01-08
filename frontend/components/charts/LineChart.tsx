'use client';

import { LineChart, ResponsiveContainer, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { TransformedWeatherData } from '@/types/weather.types';

interface LineChartComponentProps {
  data: TransformedWeatherData[];  // Les données météorologiques à afficher
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({ data }) => {
  return (
    <ResponsiveContainer  height="85%">
      <LineChart width={500} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
