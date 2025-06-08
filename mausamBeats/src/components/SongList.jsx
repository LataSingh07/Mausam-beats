const SongList = ({ songs, loading, mood, weather }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <h2 className="text-xl font-semibold mb-4">
        {loading ? "Loading songs..." : `🎶 ${mood} + ${weather} Vibes`}
      </h2>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        {!loading && songs.length > 0 ? (
          songs.map((song) => (
            <div key={song.trackId} className="flex gap-3 items-center text-left">
              <img
                src={song.artworkUrl100}
                alt={song.trackName}
                className="w-16 h-16 rounded"
              />
              <div>
                <p className="font-semibold">{song.trackName}</p>
                <p className="text-sm text-gray-600">{song.artistName}</p>
                <audio controls src={song.previewUrl} className="w-full mt-1" />
              </div>
            </div>
          ))
        ) : (
          !loading && <p>No songs found. Try a different mood!</p>
        )}
      </div>
    </div>
  );
};

export default SongList;

