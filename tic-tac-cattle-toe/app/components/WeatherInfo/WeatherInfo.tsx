import { useCoordinates } from "@/app/api/coordinates/useCoordinates";

export default function WeatherInfo() {
  const { data, isLoading } = useCoordinates("edinburgh");

  if (isLoading) {
    return <div>Loading weather info...</div>;
  }

  console.log("Coordinates data:", data);

  return <div>see console</div>;
}
