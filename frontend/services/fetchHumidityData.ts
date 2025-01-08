export const fetchHumidityData = async (city: string) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await fetch(`${backendUrl}/weather/humidity?city=${city}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch humidity data: ${response.statusText}`);
  }

  return response.json();
};