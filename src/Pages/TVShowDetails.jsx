import React, { useState } from 'react';
import { ArrowLeft, Play } from 'lucide-react';

const TVShowDetails = ({ tvShows = [], id, onBack }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Loading state with skeleton animation
  if (!tvShows.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
        <div className="w-4/5 h-96 bg-gray-800 animate-pulse rounded-lg"></div>
        <div className="w-64 h-8 bg-gray-800 animate-pulse mt-4 rounded"></div>
        <div className="w-48 h-6 bg-gray-800 animate-pulse mt-2 rounded"></div>
      </div>
    );
  }

  const show = tvShows.find((tvShow) => tvShow.id === Number(id));

  if (!show) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
        <h1 className="text-2xl font-bold mb-4">Show Not Found</h1>
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to TV Shows
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white p-8">
      {/* Back button */}
      <button
        onClick={onBack}
        className="self-start flex items-center gap-2 px-4 py-2 mb-6 bg-transparent hover:bg-gray-800 rounded-md transition-colors"
      >
        <ArrowLeft size={20} />
        Back to TV Shows
      </button>

      {/* Video container */}
      <div className="relative w-4/5 aspect-video rounded-lg overflow-hidden bg-gray-800">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Play size={48} className="text-gray-600" />
          </div>
        )}
        <video
          src={show.videoUrl}
          controls
          className="w-full h-full rounded-lg"
          onLoadedData={() => setIsLoading(false)}
        />
      </div>

      {/* Show details */}
      <div className="w-4/5 mt-8">
        <h1 className="text-4xl font-bold mb-4">{show.title}</h1>
        <div className="flex items-center gap-4 mb-4">
          <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">
            {show.genre}
          </span>
        </div>
        <p className="text-gray-300 text-lg leading-relaxed">
          {show.description || 'No description available.'}
        </p>
      </div>
    </div>
  );
};

export default TVShowDetails;