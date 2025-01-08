import { useState, useEffect } from 'react';
import { fetchHumidityData } from '@/services/fetchHumidityData'; // Ajustez le chemin vers votre fonction API

export const useFetchHumidityData = (city: string) => {
  const [humidity, setHumidity] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchHumidityData(city);
        if (data && data.humidity !== undefined) {
          setHumidity(data.humidity);
        } else {
          setError('Aucune donnée disponible pour l\'humidité');
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

  return { humidity, loading, error };
};
