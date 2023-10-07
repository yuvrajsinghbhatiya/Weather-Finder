import React, { useRef, useState } from "react";
import clearIcon from "../img/Clear.png";
import rainIcon from "../img/Rain.png";
import snowIcon from "../img/Snow.png";
import cloudsIcon from "../img/Clouds.png";
import hazeIcon from "../img/Haze.png";
import smokeIcon from "../img/Smoke.png";
import mistIcon from "../img/Mist.png";
import drizzleIcon from "../img/Drizzle.png";
import notFoundIcon from "../img/NotFound.png";
import searchIcon from "../img/Searchicon.png";
import loadingIcon from "../img/loading.png";
import tempIcon from "../img/temp.png";
import homeIcon from "../img/Home.png";

const Api_key = "31ef8800789372a8d547db37cdafc654";

const App = () => {
  const inputRef = useRef(null);
  const [apiData, setApiData] = useState(null);
  const [showWeather, setShowWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const WeatherTypes = [
    {
      type: "Clear",
      img: clearIcon,
    },
    {
      type: "Rain",
      img: rainIcon,
    },
    {
      type: "Snow",
      img: snowIcon,
    },
    {
      type: "Clouds",
      img: cloudsIcon,
    },
    {
      type: "Haze",
      img: hazeIcon,
    },
    {
      type: "Smoke",
      img: smokeIcon,
    },
    {
      type: "Mist",
      img: mistIcon,
    },
    {
      type: "Drizzle",
      img: drizzleIcon,
    },
  ];

  const fetchWeather = async () => {
    const cityName = inputRef.current.value;
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${Api_key}`;

    setLoading(true);
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      if (
        data.cod === 404 ||
        data.cod === 400 ||
        !data.weather ||
        data.weather.length === 0
      ) {
        setShowWeather([
          {
            type: "Not Found",
            img: notFoundIcon,
          },
        ]);
      } else {
        setShowWeather(
          WeatherTypes.filter(
            (weather) => weather.type === data.weather[0].main
          )
        );
        setApiData(data);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gray-300 h-screen flex flex-col ">
        <div className="bg-gray-300">
          <button onClick={() => window.location.reload()}>
            <img
              src={homeIcon}
              alt="Home"
              className="w-12 cursor-pointer mt-6 ml-6"
            />
          </button>
            <h1
              className="text-4xl font-bold uppercase text-center mb-9"
              style={{
                letterSpacing: "5px",
                fontFamily: "'Sofia Sans', sans-serif",
              }}
            >
              {" "}
              Weather Finder
            </h1>
        </div>

        <div className="flex flex-col items-center justify-center pt-4">
          <div className="bg-white w-96 p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <input
                type="text"
                id="locationInput"
                ref={inputRef}
                placeholder="Enter Your Location ... "
                className="text-xl text-gray-400 border-b p-2 border-gray-200 font-semibold uppercase flex-1 pt-4"
              />
              <button onClick={fetchWeather}>
                <img src={searchIcon} alt="..." className="w-11 h-11" />
              </button>
            </div>
            <div
              className={`duration-300 delay-75  overflow-hidden
         ${showWeather ? "h-[27rem]" : "h-0"}`}
            >
              {loading ? (
                <div className="grid place-items-center h-full">
                  <img
                    src={loadingIcon}
                    alt="..."
                    className="w-14 mx-auto mb-2 animate-spin"
                  />
                </div>
              ) : (
                showWeather && (
                  <div className="text-center flex flex-col gap-6 mt-10">
                    {apiData && (
                      <p className="text-3xl font-semibold">
                        {apiData?.name + ", " + apiData?.sys?.country}
                      </p>
                    )}
                    <img
                      src={showWeather[0]?.img}
                      alt="..."
                      className="w-52 mx-auto"
                    />
                    <h3 className="text-3xl font-bold text-zinc-800 text-gray-600">
                      {showWeather[0]?.type}
                    </h3>

                    {apiData && (
                      <>
                        <div className="flex justify-center items-center">
                          <img src={tempIcon} alt="..." className="h-9 mr-4" />
                          <h2 className="text-3xl font-bold ">
                            {apiData?.main?.temp}&#176;C
                          </h2>
                        </div>
                      </>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
