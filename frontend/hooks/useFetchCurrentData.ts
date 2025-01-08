import { useState, useEffect } from 'react';
import { fetchCurrentData } from '@/services/fetchCurrentData'; 

interface CurrentWeather {
  temp: number; 
  weather: string; 
  pressure: number; 
  wind: number; 
}

export const useFetchCurrentData = (city: string) => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCurrentData(city);
        if (data &&
          typeof data.currentWeather.temp === 'number' &&
          typeof data.currentWeather.weather === 'string' &&
          typeof data.currentWeather.pressure === 'number' &&
          typeof data.currentWeather.wind === 'number') {
            setCurrentWeather({
              temp: parseFloat(data.currentWeather.temp.toFixed(1)),
              weather: data.currentWeather.weather,
              pressure: data.currentWeather.pressure,
              wind: data.currentWeather.wind,
            });
        } else {
          setError("Les données météo reçues ne sont pas au bon format");
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

  return { currentWeather, loading, error };
};
