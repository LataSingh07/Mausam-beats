const moodSongMap = {
  happy: ["Happy - Pharrell Williams", "On Top of the World - Imagine Dragons", "Uptown Funk - Bruno Mars"],
  sad: ["Someone Like You - Adele", "Let Her Go - Passenger", "Fix You - Coldplay"],
  chill: ["Lo-Fi Beats - Chillhop", "Coffee Breath - Sofia Mills", "Sunflower - Post Malone"],
  energetic: ["Believer - Imagine Dragons", "Dance Monkey - Tones and I", "Titanium - David Guetta"],
};

function getWeather() {
  const location = document.getElementById("locationInput").value;
  if (!location) {
    alert("Please enter a location.");
    return;
  }

  
  const apiKey = "d97b9e9c66f7773f48ff2d0f6ea650dc";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const temp = data.main.temp;
      const weather = data.weather[0].description;
      document.getElementById("weatherDisplay").textContent =
        `Current weather in ${location}: ${temp}°C, ${weather}`;
    })
    .catch(() => {
      alert("Could not fetch weather data.");
    });
}

function selectMood(mood) {
  const suggestions = moodSongMap[mood] || [];
  const songDiv = document.getElementById("songSuggestions");
  songDiv.innerHTML = "";

  suggestions.forEach((song) => {
    const songCard = document.createElement("div");
    songCard.className = "song-card";
    songCard.textContent = song;
    songDiv.appendChild(songCard);
  });
}
