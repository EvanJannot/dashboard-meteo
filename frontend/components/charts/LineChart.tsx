'use client';

import { LineChart, ResponsiveContainer, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { TransformedWeatherData } from '@/types/weather.types';

interface LineChartComponentProps {
  data: TransformedWeatherData[]; 
}

const formatDate = (timestamp: string) => {
  const dateParts = timestamp.split(' ');
  const date = dateParts[0].split('-'); 
  const time = dateParts[1].split(':'); 

  const formattedDate = `${date[1]}/${date[2]}`;
  const formattedTime = `${time[0]}h`; 

  return `${formattedDate} ${formattedTime}`;
};

const LineChartComponent: React.FC<LineChartComponentProps> = ({ data }) => {
  return (
    <ResponsiveContainer  height="85%">
      <LineChart width={500} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" tickFormatter={(value) => formatDate(value)} />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
