import { locations } from "@/app/api/coordinates/locations";
import { useCoordinates } from "@/app/api/coordinates/useCoordinates";
import { useWeather } from "@/app/api/weather/useWeather";
import { useState } from "react";
import styles from "./WeatherInfo.module.css";
import Image from "next/image";
import LocationSelector from "./LocationSelector";
import Loader from "../common/Loader";

export default function WeatherInfo() {
  const [location, setLocation] =
    useState<(typeof locations)[number]>("edinburgh");
  const { data, isLoading } = useCoordinates(location);
  const { data: weatherData, isLoading: isWeatherLoading } = useWeather({
    lat: data?.y,
    lon: data?.x,
  });

  if (isLoading || isWeatherLoading) {
    return (
      <div className={styles.wrapper}>
        <Loader />
      </div>
    );
  }

  console.log("Coordinates data:", data);
  console.log("Weather data:", weatherData);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span>
          Weather Info for <i>{weatherData?.location}</i>
        </span>
        <LocationSelector onLocationChange={setLocation} />
      </div>
      <div className={styles.body}>
        <div className={styles.iconWrapper}>
          <Image
            src={"https:" + weatherData?.condition.icon}
            alt={weatherData?.condition.text || "Weather Icon"}
            width={64}
            height={64}
          />
          <p className={styles.condition}>{weatherData?.condition.text}</p>
        </div>
        <div className={styles.dataWrapper}>
          <p className={styles.temperature}>{weatherData?.temperatureC}°C</p>
          <p className={styles.humidity}>Humidity: {weatherData?.humidity}%</p>
        </div>
      </div>
    </div>
  );
}
