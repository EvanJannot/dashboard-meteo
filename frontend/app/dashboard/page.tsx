'use client';

import React, { useState } from 'react';
import { useFetchWeatherData } from '@/hooks/useFetchWeatherData';
import { useFetchHumidityData } from '@/hooks/useFetchHumidityData';
import { useFetchCurrentData } from '@/hooks/useFetchCurrentData';

import dynamic from 'next/dynamic';

import Navbar from '@/components/ui/Navbar';
import WeatherData from '@/components/ui/WeatherData';

const LineChartComponent = dynamic(() => import('@/components/charts/LineChart'), { ssr: false });
// const BarChartComponent = dynamic(() => import('@/components/charts/BarChart'), { ssr: false });
const PieChartComponent = dynamic(() => import('@/components/charts/PieChart'), { ssr: false });

const DashboardPage = () => {
  const [city, setCity] = useState('Montreal');

  const handleCitySearch = (newCity: string) => {
    setCity(newCity);
  };

  const { weatherData, loading: forecastLoading, error: forecastError } = useFetchWeatherData(city);
  const { humidity, loading: humidityLoading, error: humidityError } = useFetchHumidityData(city);
  const { currentWeather, loading: currentWeatherLoading, error: currentWeatherError } = useFetchCurrentData(city);
  
  if (forecastLoading || humidityLoading || currentWeatherLoading) {
    return <p>Chargement des données...</p>;
  }

  if (forecastError || humidityError || currentWeatherError) {
    return <p>Erreur : {forecastError || humidityError || currentWeatherError}</p>;
  }

  return (
    <div>
       <Navbar onSearch={handleCitySearch} />

       <WeatherData city={city} currentWeather={currentWeather} />

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
