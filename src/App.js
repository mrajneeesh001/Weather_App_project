import "./App.css";
import Search from "./Component/search/search";
import CurrentWeather from "./Component/search/current-weather/current-weather";
import Forecast from "./Component/search/forecast/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY  } from "./api";
import { useState } from "react";

function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);


  const handleonsearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse});
        setForecast({ city: searchData.label, ...forecastResponse});
      })
      .catch((err) => console.log(err));
  }

  console.log(CurrentWeather);
  console.log(forecast);

  return (
    <div className="container">
      <Search onSearchChange ={handleonsearchChange} />
      {currentWeather && <CurrentWeather data ={currentWeather} />}
      {forecast && <Forecast data={forecast}/>}
    </div>
  ); 
}

export default App;
