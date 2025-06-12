import { useEffect, useState } from "react";
import axios from "axios";
import MoodSelector from "./components/MoodSelector";
import SongList from "./components/SongList";

const App = () => {
  const [weather, setWeather] = useState("");
  const [mood, setMood] = useState("Happy");
  const [songs, setSongs] = useState([]);
  const [loadingSongs, setLoadingSongs] = useState(false);

  // ✅ Get background image based on weather
  const getBackgroundImage = (weather) => {
    switch (weather.toLowerCase()) {
      case "rain":
        return "url('/rainy.jpg')";
      case "clouds":
        return "url('/cloudy.jpg')";
      case "clear":
      case "sunny":
        return "url('/sunny.jpg')";
      case "snow":
        return "url('/snow.jpg')";
      default:
        return "url('/default.jpg')";
    }
  };

  const fetchWeather = async (lat, lon) => {
    const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your actual key
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const mainWeather = res.data.weather[0].main;
      setWeather(mainWeather);
    } catch (err) {
      console.error("Weather fetch error:", err);
      setWeather("Sunny"); // fallback
    }
  };

  const fetchSongs = async (weather, mood) => {
    setLoadingSongs(true);
    const query = `${mood} ${weather} music`;
    try {
      const res = await axios.get(
        `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=8`
      );
      setSongs(res.data.results);
    } catch (err) {
      console.error("Song fetch error:", err);
    }
    setLoadingSongs(false);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchWeather(latitude, longitude);
      },
      (err) => {
        console.error("Location error:", err);
        setWeather("Sunny");
      }
    );
  }, []);

  useEffect(() => {
    if (weather && mood) fetchSongs(weather, mood);
  }, [weather, mood]);

  return (
   <div
  className="min-h-screen w-full bg-cover bg-center flex justify-center items-center p-6"
  style={{
    backgroundImage: weather ? getBackgroundImage(weather) : "url('/default.jpg')",
  }}
    >
      <div className="w-full h-full max-w-6xl space-y-6 bg-white/70 p-6 rounded-lg shadow-lg backdrop-blur overflow-y-auto">
        <h1 className="text-4xl font-bold text-center mb-6">🎵 MausamBeat</h1>

        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-lg font-semibold">
            Weather: <span className="text-blue-600">{weather || "Loading..."}</span>
          </p>
        </div>

        <MoodSelector mood={mood} setMood={setMood} />
        <SongList songs={songs} loading={loadingSongs} mood={mood} weather={weather} />
      </div>
    </div>
  );
};

export default App;
