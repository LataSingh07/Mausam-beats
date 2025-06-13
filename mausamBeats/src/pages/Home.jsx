import { useState } from "react";
import axios from "axios";
import WeatherSearch from "../components/WeatherSearch";

const Home = () => {
  const [weather, setWeather] = useState(null);

  const fetchWeather = async (city) => {
    const apiKey = "de82154036e166b8c57e7d28c149e058"; // ✅ Replace this with your actual API key
    const encodedCity = encodeURIComponent(city);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${apiKey}&units=metric`
      );

      if (response.data.cod === 200) {
        setWeather(response.data);
        console.log("Weather:", response.data);
      }
    } catch (err) {
      console.error(err);
      alert("City not found!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800">🎵 MausamBeats</h1>
      <p className="text-center text-lg text-gray-600 mt-2">
        Enter your city to get weather-based song recommendations!
      </p>

      <WeatherSearch onSearch={fetchWeather} />

      {weather && (
        <div className="mt-10 text-center">
          <h2 className="text-2xl font-semibold">Weather in {weather.name}</h2>
          <p>
            {weather.weather[0].main} - {weather.main.temp}°C
          </p>
          {/* Later: Show song suggestions here */}
        </div>
      )}
    </div>
  );
};

export default Home;
