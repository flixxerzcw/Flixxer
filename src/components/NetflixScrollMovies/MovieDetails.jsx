// MovieDetails.jsx
import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

const MovieDetails = () => {
  const { movieId } = useParams(); // Get movie ID from URL
  const location = useLocation(); // Access movie data passed via state
  const movie = location.state?.movie;

  if (!movie) {
    return <p>Movie not found.</p>;
  }

  return (
    <div style={detailsPageStyle}>
      <video style={videoStyle} src={movie.videoUrl} controls autoPlay />
      <div style={detailsStyle}>
        <h3>{movie.title}</h3>
        <p>{movie.year} | {movie.length} | Rating: {movie.rating}</p>
        <p>Top Cast: {movie.cast}</p>
        <p>{movie.description}</p>
      </div>
    </div>
  );
};

const detailsPageStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  height: '100vh',
  backgroundColor: '#000',
  color: '#fff',
};

const videoStyle = {
  width: '80%',
  height: '50%',
  borderRadius: '10px',
  marginBottom: '20px',
};

const detailsStyle = {
  textAlign: 'center',
};

export default MovieDetails;
