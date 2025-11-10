import { useQuery } from "@tanstack/react-query";

interface WeatherData {
  location: string;
  temperatureC: number;
  humidity: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
}

interface OpenWeatherResponse {
  location: {
    name: string;
  };
  current: {
    temp_c: number;
    humidity: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
  };
}

// Function to fetch weather data from OpenWeatherMap API
async function fetchWeather(lat: string, lon: string): Promise<WeatherData> {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  if (!apiKey) {
    throw new Error("Weather API key is not configured");
  }

  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch weather: ${response.statusText}`);
  }

  const data: OpenWeatherResponse = await response.json();

  return {
    location: data.location.name,
    temperatureC: data.current.temp_c,
    humidity: data.current.humidity,
    condition: {
      text: data.current.condition.text,
      icon: data.current.condition.icon,
      code: data.current.condition.code,
    },
  };
}

export function useWeather({
  lat,
  lon,
  enabled = true,
}: {
  lat?: string;
  lon?: string;
  enabled?: boolean;
}) {
  return useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => fetchWeather(lat!, lon!),
    staleTime: 10 * 60 * 1000, // 10 minutes - weather changes frequently
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
    enabled: enabled && !!lat && !!lon, // Only run if coordinates are available
  });
}
