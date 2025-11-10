import { useQuery } from "@tanstack/react-query";
import { locations } from "./locations";

interface CoordinatesStructure {
  name: string;
  x: string;
  y: string;
}

interface GeocodeResponse {
  lat: string;
  lon: string;
  display_name: string;
}

async function fetchCoordinates(
  location: string
): Promise<CoordinatesStructure> {
  const apiKey = process.env.NEXT_PUBLIC_COORDINATES_API_KEY;

  if (!apiKey) {
    throw new Error("API key to retrieve coordinates is missing");
  }

  const response = await fetch(
    `https://geocode.maps.co/search?q=${encodeURIComponent(
      location
    )}&format=json&limit=1&api_key=${apiKey}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch coordinates: ${response.statusText}`);
  }

  const data: GeocodeResponse[] = await response.json();

  if (!data || data.length === 0) {
    throw new Error(`No coordinates found for location: ${location}`);
  }

  const result = data[0];
  return {
    name: location,
    x: result.lon,
    y: result.lat,
  };
}

export function useCoordinates(location: (typeof locations)[number]) {
  return useQuery({
    queryKey: ["coordinates", location],
    queryFn: () => fetchCoordinates(location),
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 7 * 24 * 60 * 60 * 1000,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
    enabled: !!location, // Only run query if location is provided
  });
}
