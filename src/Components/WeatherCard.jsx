/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useDate } from "../Utils/useDate";
import sun from "../assets/icons/sun.png";
import cloud from "../assets/icons/cloud.png";
import fog from "../assets/icons/fog.png";
import rain from "../assets/icons/rain.png";
import snow from "../assets/icons/snow.png";
import storm from "../assets/icons/storm.png";
import wind from "../assets/icons/windy.png";
import "../index.css";

const WeatherCard = ({
  temperature,
  windspeed,
  humidity,
  place,
  heatIndex,
  iconString,
  conditions,
}) => {
  const [icon, setIcon] = useState(sun);
  const { time } = useDate();

  useEffect(() => {
    if (iconString) {
      if (iconString.toLowerCase().includes("cloud")) {
        setIcon(cloud);
      } else if (iconString.toLowerCase().includes("rain")) {
        setIcon(rain);
      } else if (iconString.toLowerCase().includes("clear")) {
        setIcon(sun);
      } else if (iconString.toLowerCase().includes("thunder")) {
        setIcon(storm);
      } else if (iconString.toLowerCase().includes("fog")) {
        setIcon(fog);
      } else if (iconString.toLowerCase().includes("snow")) {
        setIcon(snow);
      } else if (iconString.toLowerCase().includes("wind")) {
        setIcon(wind);
      }
    }
  }, [iconString]);

  return (
    <div className="w-[22rem] min-w-[22rem] min-h-[30rem] glassCard p-6 flex flex-col">
      <div className="flex w-full justify-center items-center gap-4 mt-8 mb-6">
        <img src={icon} alt="weather_icon" className="w-20 h-20" />
        <p className="font-bold text-5xl flex justify-center items-center">
          {temperature} &deg;C
        </p>
      </div>
      <div className="font-bold text-center text-xl mb-6">{place}</div>
      <div className="w-full flex justify-between items-center mb-6">
        <p className="flex-1 text-center p-2 text-sm sm:text-base">{new Date().toDateString()}</p>
        <p className="flex-1 text-center p-2 text-sm sm:text-base">{time}</p>
      </div>
      <div className="w-full flex justify-between items-center mb-6 gap-3">
        <div className="flex-1 text-center p-3 font-bold bg-blue-600/80 shadow rounded-lg">
          <p className="text-sm sm:text-base">Wind Speed</p>
          <p className="font-normal text-sm sm:text-base">{windspeed} km/h</p>
        </div>
        <div className="flex-1 text-center p-3 font-bold rounded-lg bg-green-600/80">
          <p className="text-sm sm:text-base">Humidity</p>
          <p className="font-normal text-sm sm:text-base">{humidity} gm/m³</p>
        </div>
      </div>
      <div className="w-full p-3 mb-4 flex justify-between items-center bg-slate-800/50 rounded-lg">
        <p className="font-semibold text-base sm:text-lg">Heat Index</p>
        <p className="text-base sm:text-lg">{heatIndex ? heatIndex : "N/A"}</p>
      </div>
      <div className="mt-auto">
        <hr className="border-slate-600 my-3" />
        <div className="w-full p-2 flex justify-center items-center text-xl sm:text-2xl font-semibold text-center">
          {conditions}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
