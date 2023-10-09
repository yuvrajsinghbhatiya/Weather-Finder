import React, { useRef, useState } from "react";
// import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { BiLoaderCircle } from "react-icons/bi";
import {
  WiDaySunny,
  WiRain,
  WiSnow,
  WiCloudy,
  WiFog,
  WiSmoke,
  WiDayShowers,
  WiStrongWind,
  WiHumidity,
  WiThermometer,
  WiHorizonAlt,
} from "react-icons/wi";
import { RiMistFill } from "react-icons/ri";

const Api_key = "31ef8800789372a8d547db37cdafc654";

const Weather = () => {
  const inputRef = useRef(null);
  const [apiData, setApiData] = useState(null);
  const [showWeather, setShowWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [windSpeed, setWindSpeed] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [visibility, setVisibility] = useState(null);
  const [feelsLike, setFeelsLike] = useState(null);
  // const [cityName, setCityName] = useState("");
  // console.log(cityName)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const ipResponse = await axios.get("https://api.ipify.org/?format=json");
  //       const cityResponse = await axios.get(
  //         `https://ipapi.co/${ipResponse.data.ip}/json/`
  //       );
  //       setCityName(cityResponse.data.city);
  //     } catch (error) {
  //       console.error("Error fetching IP or city name:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const WeatherIcons = {
    Clear: <WiDaySunny size={48} />,
    Rain: <WiRain size={48} />,
    Snow: <WiSnow size={48} />,
    Clouds: <WiCloudy size={48} />,
    Haze: <WiFog size={48} />,
    Smoke: <WiSmoke size={48} />,
    Mist: <RiMistFill size={48} />,
    Drizzle: <WiDayShowers size={48} />,
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
        setWindSpeed(data.wind.speed);
        setHumidity(data.main.humidity);
        setVisibility(data.visibility / 1000);
        setFeelsLike(data.main.feels_like);
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

  return (
    <>
    <div className="bg-bodyclr from-primary to-secondary min-h-screen flex flex-col items-center justify-center p-8 sm:p-6 md:p-6 lg:p-6 xl:p-6">
      <div className="bg-gradient-to-tl w-80 md:w-96 lg:w-108 xl:w-120 p-3 rounded-xl pt-8 mt-4 sm:mt-6 md:mt-6 lg:mt-6 xl:mt-6 shadow-lg">
        <div className="flex items-center justify-center w-auto mb-4 ">
          <input
            type="text"
            id="locationInput"
            ref={inputRef}
            placeholder="Enter Your Location ... "
            className="text-xl text-gray-200 p-2 sm:p-3 md:p-4 border-gray-300 font-semibold uppercase flex-1 bg-gradient-to-tl rounded-l-xl h-12 px-4 max-w-full mx-auto"
            onKeyPress={handleKeyPress}
            required
          />
          <button
            onClick={fetchWeather}
            className="w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 h-12 sm:h-12 flex items-center justify-center bg-gradient-to-tl rounded-r-xl px-4"
          >
            <FaSearch size={24} className="text-gray-200" />
          </button>
        </div>

        <div className="duration-300 delay-75 overflow-hidden mt-4">
          {loading ? (
            <div className="grid place-items-center h-full">
              <BiLoaderCircle className="w-14 h-14 mx-auto mb-2 animate-spin text-gray-400" />
            </div>
          ) : (
            !loading &&
            showWeather && (
              <div className="text-center flex flex-col gap-4 mt-4 w-full sm:w-auto ">
                <div className="flex justify-between items-center w-full p-4 bg-gradient-to-tr rounded-lg ">
                  <div className="flex flex-col items-center ml-4 mr-4">
                    <h2 className="text-5xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl text-gray-200 font-semibold mb-2">
                      {Math.floor(apiData?.main?.temp)}&#176;C
                    </h2>
                    <p className="text-xl sm:text-xl md:text-xl lg:text-1xl xl:text-1xl text-gray-200">
                      {apiData?.name + ", " + apiData?.sys?.country}
                    </p>
                  </div>
                  <div className="flex flex-col items-center ml-4 mr-2 text-gray-200 ">
                    {WeatherIcons[showWeather[0]]}
                    <p
                      className="text-xl sm:text-xl md:text-xl lg:text-xl xl:text-xl mt-2 lg:mt-4 xl:mt-4"
                      style={{ fontFamily: "monospace" }}
                    >
                      '{showWeather[0]}'
                    </p>
                  </div>
                </div>
                <div className="flex sm:justify-around justify-around items-center text-gray-200 w-full p-4 bg-gradient-to-tl rounded-lg">
                  <div className="flex items-center">
                    <WiStrongWind size={24} style={{ marginRight: "8px" }} />
                    <p className="text-1xl">{windSpeed} m/s</p>
                  </div>
                  <div className="flex items-center ml-4 sm:ml-6">
                    <WiHumidity size={24} style={{ marginRight: "8px" }} />
                    <p className="text-1xl">{humidity}%</p>
                  </div>
                </div>
                <div className="flex sm:justify-around justify-around items-center text-gray-200 w-full p-4 bg-gradient-to-tr rounded-lg">
                  <div className="flex items-center ml-4 sm:ml-6">
                    <WiHorizonAlt size={24} style={{ marginRight: "8px" }} />
                    <p className="text-1xl">{visibility} km</p>
                  </div>
                  <div className="flex items-center ml-4 sm:ml-6">
                    <WiThermometer size={24} style={{ marginRight: "8px" }} />
                    <p className="text-1xl">{feelsLike}°C</p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default Weather;
