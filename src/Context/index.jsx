import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [values, setValues] = useState([]);
  const [place, setPlace] = useState("Jaipur");
  const [thisLocation, setLocation] = useState("");

  // Fetch weather and forecast data from OpenWeatherMap
  const fetchWeather = async () => {
    const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${place}&units=metric&appid=${apiKey}`;

    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        axios.get(weatherUrl),
        axios.get(forecastUrl),
      ]);

      const weatherData = weatherResponse.data;
      const forecastData = forecastResponse.data.list;

      // Set weather and location data
      setLocation(weatherData.name);
      setWeather({
        temp: weatherData.main.temp,
        conditions: weatherData.weather[0].main,
        windspeed: weatherData.wind.speed,
        humidity: weatherData.main.humidity,
        heatIndex: weatherData.main.feels_like, // or another appropriate value
      });
      setValues(forecastData);
    } catch (e) {
      console.error(e);
      alert("This place does not exist or could not be reached");
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [place]);

  return (
    <StateContext.Provider
      value={{
        weather,
        setPlace,
        values,
        thisLocation,
        place,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
