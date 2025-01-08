import React from 'react';

type WeatherDataProps = {
  city: string;
  currentWeather: {
    temp: number;
    weather: string;
    pressure: number;
    wind: number;
  } | null;
};

const WeatherData: React.FC<WeatherDataProps> = ({ city, currentWeather }) => {
  return (
    <div className="bg-blue-50 p-6 rounded-lg shadow-lg border border-blue-200">
      <h1 className="text-3xl font-extrabold mb-6">
        Meteo for <span className="capitalize">{city}</span>
      </h1>
      {currentWeather ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-blue-900">
            <div className="flex items-center">
              <span className="material-icons mr-3">thermostat</span>
              <p className="text-lg font-semibold">
                Temperature : <span className="text-black">{currentWeather.temp}°C</span>
              </p>
            </div>
            <div className="flex items-center">
              <span className="material-icons mr-3">wb_cloudy</span>
              <p className="text-lg font-semibold">
                Weather : <span className="text-black capitalize">{currentWeather.weather}</span>
              </p>
            </div>
            <div className="flex items-center">
              <span className="material-icons mr-3">speed</span>
              <p className="text-lg font-semibold">
                Pressure : <span className="text-black">{currentWeather.pressure} hPa</span>
              </p>
            </div>
            <div className="flex items-center">
              <span className="material-icons mr-3">air</span>
              <p className="text-lg font-semibold">
                Wind : <span className="text-black">{currentWeather.wind} m/s</span>
              </p>
            </div>
          </div>
        ) : (
          <p className="text-lg text-red-600 font-medium">No data available</p>
        )}
    </div>
  );
};

export default WeatherData;
