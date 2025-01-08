'use client';

import React, { useState, useEffect } from 'react';
import { fetchWeatherData, fetchHumidityData } from '@/services/weather';
import { TransformedWeatherData, ForecastEntry } from '@/types/weather.types';

import dynamic from 'next/dynamic';

const LineChartComponent = dynamic(() => import('@/components/charts/LineChart'), { ssr: false });
// const BarChartComponent = dynamic(() => import('@/components/charts/BarChart'), { ssr: false });
const PieChartComponent = dynamic(() => import('@/components/charts/PieChart'), { ssr: false });

const DashboardPage = () => {
  const [weatherData, setWeatherData] = useState<TransformedWeatherData[]>([]);
  const [humidityData, setHumidityData] = useState<number | null>(null);
  const [city] = useState('Montreal');
  const [loading, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWeatherData(city);
        const humidityData = await fetchHumidityData(city);

        if (data && data.forecast && data.forecast.length > 0) {  
          const transformedData = data.forecast.map((entry: ForecastEntry) => ({
            date: new Date(entry.timestamp * 1000).toLocaleString(), 
            temperature: parseFloat(entry.temp.toFixed(1)),  
          }));
  
          setWeatherData(transformedData);
        } else {
          console.error("Aucune donnée disponible");
        }

        if (humidityData && humidityData.humidity) {
          setHumidityData(humidityData.humidity);
        } else {
          console.error("Aucune donnée d'humidité disponible");
        }

      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Une erreur inconnue est survenue');
        }
      } finally {
        setLoading(false);
      }
    };

    getData(); 
  }, [city]); 

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="shadow-lg rounded-lg bg-white p-4 w-full">
        <h2 className="text-xl font-bold mb-4">Températures au fil du temps</h2>
        {loading ? <p>Chargement des données...</p> : <LineChartComponent data={weatherData} />}
      </div>
      {/* <div className="shadow-lg rounded-lg bg-white p-4">
        <h2 className="text-xl font-bold mb-4">Revenue by Month</h2>
        {loading ? <p>Chargement des données...</p> : <BarChartComponent data={weatherData} />}
      </div> */}
      <div className="shadow-lg rounded-lg bg-white p-4">
        <h2 className="text-xl font-bold mb-4">Pourcentage d&apos;humidité</h2>
        {loading ? <p>Chargement des données...</p> : <PieChartComponent humidity={humidityData ?? 0} />}
      </div> 
    </div>
  );
};

export default DashboardPage;
