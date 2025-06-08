const MoodSelector = ({ mood, setMood }) => {
  const moods = ["Happy", "Sad", "Relaxed", "Energetic"];

  return (
    <div className="bg-white p-4 rounded-xl shadow text-center">
      <h2 className="text-lg font-semibold mb-3">Your Mood</h2>
      <div className="flex flex-wrap justify-center gap-3">
        {moods.map((m) => (
          <button
            key={m}
            onClick={() => setMood(m)}
            className={`px-4 py-2 rounded-full transition ${
              mood === m ? "bg-pink-600 text-white" : "bg-gray-200"
            }`}
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
