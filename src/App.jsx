import { useState } from "react";
import "./App.css";
import search from "./assets/icons/search.svg";
import { useStateContext } from "./Context";
import { BackgroundLayout, WeatherCard, MiniCard } from "./Components";

function App() {
  const [input, setInput] = useState("");
  const { weather, thisLocation, values, place, setPlace } = useStateContext();

  const submitCity = () => {
    setPlace(input);
    setInput("");
  };

  return (
    <div className="w-full h-screen text-white px-8">
      <nav className="w-full p-3 flex justify-between items-center">
        <h1 className="font-bold tracking-wide text-3xl">Weather App</h1>
        <div className="bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2">
          <img src={search} alt="search" className="w-[1.5rem] h-[1.5rem]" />
          <input
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                submitCity();
              }
            }}
            type="text"
            placeholder="Search city"
            className="focus:outline-none w-full text-[#212121] text-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </nav>
      <BackgroundLayout />
      <main className="w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center">
        <WeatherCard
          place={thisLocation}
          windspeed={weather.windspeed} // Ensure this matches your StateContext property
          humidity={weather.humidity} // Ensure this matches your StateContext property
          temperature={weather.temp} // Ensure this matches your StateContext property
          heatIndex={weather.heatIndex} // Ensure this matches your StateContext property
          iconString={weather.conditions} // Ensure this matches your StateContext property
          conditions={weather.conditions}
        />

        <div className="flex justify-center gap-8 flex-wrap w-[60%]">
          {values.slice(0, 6).map((curr, index) => (
            <MiniCard
              key={index} // Ensure a unique key for each MiniCard
              time={curr.dt_txt} // Ensure this matches the format from the API response
              temp={curr.main.temp} // Ensure this matches the format from the API response
              iconString={curr.weather[0].main} // Ensure this matches the format from the API response
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
