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
      <nav className="w-full p-4 sm:p-6 flex flex-col items-center sm:flex-row sm:justify-between gap-4 sm:gap-0">
        <h1
          className="font-extrabold tracking-wide text-4xl sm:text-5xl bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg text-center"
          style={{
            textShadow: "2px 2px 8px rgba(0,0,0,0.3)",
            letterSpacing: "0.05em",
            lineHeight: "1.2"
          }}
        >
          Weather App
        </h1>
        <div className="bg-white w-full sm:w-[15rem] mx-auto sm:mx-0 overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2">
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
          {/* Filter values to get one forecast per day */}
          {(() => {
            const dailyForecasts = [];
            const seenDays = new Set();
            for (let i = 0; i < values.length; i++) {
              const date = new Date(values[i].dt_txt);
              const day = date.toLocaleDateString("en", {
                weekday: "long",
                year: "numeric",
                month: "numeric",
                day: "numeric",
              });
              if (!seenDays.has(day)) {
                dailyForecasts.push(values[i]);
                seenDays.add(day);
              }
              if (dailyForecasts.length === 6) break;
            }
            return dailyForecasts.map((curr, index) => (
              <MiniCard
                key={index}
                time={curr.dt_txt}
                temp={curr.main.temp}
                iconString={curr.weather[0].main}
              />
            ));
          })()}
        </div>
      </main>
    </div>
  );
}

export default App;
