export const fetchCurrentData = async (city: string) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await fetch(`${backendUrl}/weather/current?city=${city}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch current weather data: ${response.statusText}`);
  }

  return response.json();
};