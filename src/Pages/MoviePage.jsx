import React from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useLocation } from 'react-router-dom';

const MoviePage = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const location = useLocation(); // Get the state passed from the NetflixMovieScroll component
  const { movie, movies } = location.state || {}; // Destructure movie and movies from the location state

  // If movie is not passed in the location state, show an error
  if (!movie) {
    return (
      <div style={{ color: '#fff', textAlign: 'center', marginTop: '2rem' }}>
        <h1>Movie Not Found</h1>
      </div>
    );
  }

  // You can directly use `movie` details here
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    color: '#fff',
    padding: '2rem',
    boxSizing: 'border-box',
  };

  const videoPlayerStyle = {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
  };

  const statsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1.2rem',
    margin: '1rem 0',
    color: '#e50914',
  };

  const movieDetailsStyle = {
    marginTop: '1rem',
  };

  const genres = movie.genres?.map(genre => genre.title).join(', ') || 'N/A';

  return (
    <div style={containerStyle}>
      <div style={videoPlayerStyle}>
        <ReactPlayer url={movie.videoUrl} controls width="100%" />
      </div>

      <div style={statsStyle}>
        <span>Views: 15k</span>
        <span>Posts: 20</span>
        <span>Likes: 12k</span>
      </div>

      <div style={movieDetailsStyle}>
        <h2>{movie.title}</h2>
        <p>{movie.releaseDate || 'Release Date Unknown'} | {movie.duration || 'Unknown duration'} minutes</p>
        <p><strong>Rating:</strong> {movie.rating || 'Not Rated'}</p>
        <p><strong>Genres</strong> {genres}</p>
        <p>{movie.description || 'No description available.'}</p>
      </div>
    </div>
  );
};

export default MoviePage;
