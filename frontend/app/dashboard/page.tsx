'use client';

import React, { useState } from 'react';
import { useFetchWeatherData } from '@/hooks/useFetchWeatherData';
import { useFetchHumidityData } from '@/hooks/useFetchHumidityData';
import { useFetchCurrentData } from '@/hooks/useFetchCurrentData';

import dynamic from 'next/dynamic';

const LineChartComponent = dynamic(() => import('@/components/charts/LineChart'), { ssr: false });
// const BarChartComponent = dynamic(() => import('@/components/charts/BarChart'), { ssr: false });
const PieChartComponent = dynamic(() => import('@/components/charts/PieChart'), { ssr: false });

const DashboardPage = () => {
  const [city] = useState('Montreal');
  
  const { weatherData, loading: forecastLoading, error: forecastError } = useFetchWeatherData(city);
  const { humidity, loading: humidityLoading, error: humidityError } = useFetchHumidityData(city);
  const { currentWeather, loading: currentWeatherLoading, error: currentWeatherError } = useFetchCurrentData(city);

  console.log(currentWeather);
  
  if (forecastLoading || humidityLoading || currentWeatherLoading) {
    return <p>Chargement des données...</p>;
  }

  if (forecastError || humidityError || currentWeatherError) {
    return <p>Erreur : {forecastError || humidityError || currentWeatherError}</p>;
  }

  return (
    <div>
      <div className="bg-blue-50 p-6 rounded-lg shadow-lg border border-blue-200">
        <h1 className="text-3xl font-extrabold mb-6">
          Météo à <span className="capitalize">{city}</span>
        </h1>
        {currentWeather ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-blue-900">
            <div className="flex items-center">
              <span className="material-icons mr-3">thermostat</span>
              <p className="text-lg font-semibold">
                Température : <span className="text-black">{currentWeather.temp}°C</span>
              </p>
            </div>
            <div className="flex items-center">
              <span className="material-icons mr-3">wb_cloudy</span>
              <p className="text-lg font-semibold">
                Temps : <span className="text-black capitalize">{currentWeather.weather}</span>
              </p>
            </div>
            <div className="flex items-center">
              <span className="material-icons mr-3">speed</span>
              <p className="text-lg font-semibold">
                Pression : <span className="text-black">{currentWeather.pressure} hPa</span>
              </p>
            </div>
            <div className="flex items-center">
              <span className="material-icons mr-3">air</span>
              <p className="text-lg font-semibold">
                Vent : <span className="text-black">{currentWeather.wind} m/s</span>
              </p>
            </div>
          </div>
        ) : (
          <p className="text-lg text-red-600 font-medium">Aucune donnée disponible</p>
        )}
      </div>
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="shadow-lg rounded-lg bg-white p-4 w-full">
          <h2 className="text-xl font-bold mb-4">Températures au fil du temps</h2>
          <LineChartComponent data={weatherData} />
        </div>
        {/* <div className="shadow-lg rounded-lg bg-white p-4">
          <h2 className="text-xl font-bold mb-4">Revenue by Month</h2>
          {loading ? <p>Chargement des données...</p> : <BarChartComponent data={weatherData} />}
        </div> */}
        <div className="shadow-lg rounded-lg bg-white p-4">
          <h2 className="text-xl font-bold mb-4">Pourcentage d&apos;humidité</h2>
          <PieChartComponent humidity={humidity ?? 0} />
        </div> 
      </div>
    </div>
  );
};

export default DashboardPage;
