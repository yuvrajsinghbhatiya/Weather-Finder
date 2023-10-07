import React, { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { TbTemperature } from "react-icons/tb";
import { CgSearchLoading } from "react-icons/cg";
import clearIcon from "../img/Clear.png";
import rainIcon from "../img/Rain.png";
import snowIcon from "../img/Snow.png";
import cloudsIcon from "../img/Clouds.png";
import hazeIcon from "../img/Haze.png";
import smokeIcon from "../img/Smoke.png";
import mistIcon from "../img/Mist.png";
import drizzleIcon from "../img/Drizzle.png";

const Api_key = "31ef8800789372a8d547db37cdafc654";

const Weather = () => {
  const inputRef = useRef(null);
  const [apiData, setApiData] = useState(null);
  const [showWeather, setShowWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const WeatherIcons = {
    Clear: clearIcon,
    Rain: rainIcon,
    Snow: snowIcon,
    Clouds: cloudsIcon,
    Haze: hazeIcon,
    Smoke: smokeIcon,
    Mist: mistIcon,
    Drizzle: drizzleIcon,
  };

  const fetchWeather = async () => {
    const cityName = inputRef.current.value;
  
    if (!cityName) {
      alert("Please enter something");
      return;
    }
  
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${Api_key}`;
  
    setLoading(true);
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
  
      if (data.cod === 404) {
        alert("Sorry!! City not found.");
      } else {
        setShowWeather(data.weather.map((weather) => weather.main));
        setApiData(data);
      }
    } catch (error) {
      alert("Sorry!! City not found.");

    } finally {
      setLoading(false);
    }
  };
  
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchWeather();
    }
  };
  
  const calculateShowWeatherHeight = () => {
    if (showWeather) {
      const totalHeight = showWeather.length * 40;
      const minHeight = Math.min(totalHeight, 200);
  
      return `h-[${minHeight}px] sm:h-[${minHeight}px] md:h-[${minHeight}px] lg:h-[${minHeight}px] xl:h-[${minHeight}px]`;
    } else {
      return "h-1";
    }
  };
  

  return (
    <div className="bg-gradient-to-tr from-primary to-secondary h-screen flex flex-col items-center justify-center p-8 sm:p-6 md:p-6 lg:p-6 xl:p-6">
      <div className="bg-gradient-to-tl w-80 md:w-96 lg:w-108 xl:w-120 p-3 rounded-xl pt-8 mt-4 sm:mt-6 md:mt-6 lg:mt-6 xl:mt-6">
        <div className="flex items-center justify-center w-auto">
          <input
            type="text"
            id="locationInput"
            ref={inputRef}
            placeholder="Enter Your Location ... "
            className="text-xl text-gray-400 p-2 sm:p-3 md:p-4 border-gray-200 font-semibold uppercase flex-1 bg-gradient-to-tl rounded-l-xl h-12 px-4 max-w-full mx-auto"
            onKeyPress={handleKeyPress}
            required
          />
          <button
            onClick={fetchWeather}
            className="w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 h-12 sm:h-12 flex items-center justify-center bg-gradient-to-tl rounded-r-xl px-4"
          >
            <FaSearch size={24} className="text-primary" />
          </button>
        </div>

        <div
          className={`duration-300 delay-75 overflow-hidden mt-4 ${calculateShowWeatherHeight()}`}
        >
          {loading ? (
            <div className="grid place-items-center h-full">
              <CgSearchLoading className="w-14 h-14 mx-auto mb-2 animate-spin" />
            </div>
          ) : (
            showWeather && (
              <div className="text-center flex flex-col gap-4 mt-4">
                {apiData && (
                  <p
                    className="text-3xl text-primary font-semibold mb-4"
                    style={{ letterSpacing: "2px" }}
                  >
                    {apiData?.name + ", " + apiData?.sys?.country}
                  </p>
                )}
                <img
                  src={WeatherIcons[showWeather[0]]}
                  alt="Weather Icon"
                  className="w-32 mx-auto mb-6"
                />
                <h2
                  className="text-2xl text-primary font-semibold text-gray-600 uppercase mb-2"
                  style={{ letterSpacing: "2px" }}
                >
                  "{showWeather[0]}"
                </h2>

                {apiData && (
                  <div className="flex justify-center items-center">
                    <TbTemperature size={22} className="text-primary mr-1" />
                    <h2
                      className="text-2xl text-primary font-semibold"
                      style={{ letterSpacing: "1px" }}
                    >
                      {apiData?.main?.temp}&#176;C
                    </h2>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
