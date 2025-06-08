import { useEffect, useState } from "react";
import axios from "axios";
import MoodSelector from "./components/MoodSelector";
import SongList from "./components/SongList";

const App = () => {
  const [weather, setWeather] = useState("");
  const [mood, setMood] = useState("Happy");
  const [songs, setSongs] = useState([]);
  const [loadingSongs, setLoadingSongs] = useState(false);

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

  // On first load, get user's location
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

  // Fetch songs every time weather or mood changes
  useEffect(() => {
    if (weather && mood) fetchSongs(weather, mood);
  }, [weather, mood]);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-indigo-200 to-yellow-100 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mb-6">🎵 MausamBeat</h1>

      <div className="w-full max-w-2xl space-y-6">
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
