import { useState, useEffect } from 'react';
import { fetchWeatherData } from '@/services/fetchWeatherData'; 
import { TransformedWeatherData, ForecastEntry } from '@/types/weather.types';

export const useFetchWeatherData = (city: string) => {
  const [weatherData, setWeatherData] = useState<TransformedWeatherData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWeatherData(city);
        if (data && data.forecast && data.forecast.length > 0) {
          const transformedData = data.forecast.map((entry: ForecastEntry) => ({
            date: new Date(entry.timestamp * 1000).toLocaleString(),
            temperature: parseFloat(entry.temp.toFixed(1)),
          }));
          setWeatherData(transformedData);
        } else {
          setError('Aucune donnée disponible pour le forecast');
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

    fetchData();
  }, [city]);

  return { weatherData, loading, error };
};
