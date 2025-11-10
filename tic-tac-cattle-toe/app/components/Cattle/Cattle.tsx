import Image from "next/image";
import cattlePic from "./cattle.png";
import { Tooltip } from "@heroui/tooltip";
import { useState } from "react";
import WeatherInfo from "../WeatherInfo/WeatherInfo";
import styles from "./Cattle.module.css";

export default function Cattle() {
  const [showWeatherInfo, setShowWeatherInfo] = useState(false);

  const handleClick = () => {
    setShowWeatherInfo(!showWeatherInfo);
  };

  return (
    <>
      <Tooltip content='Click me' placement='bottom' showArrow={true}>
        <button className={styles.Button} onClick={handleClick}>
          <Image src={cattlePic} width={100} height={100} alt='Cattle' />
        </button>
      </Tooltip>
      {showWeatherInfo && <WeatherInfo />}
    </>
  );
}
