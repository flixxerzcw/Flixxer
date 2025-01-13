import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NetflixMovieScroll = ({ title, movies, loading , onMovieSelect}) => {
  const navigate = useNavigate();

  const handleThumbnailClick = (movieId) => {
      const selectedMovie = movies.find((movie) => movie.id === movieId);
    navigate(`/movie/${movieId}`, { state: { movie: selectedMovie, movies } });

     if (onMovieSelect) {
                  onMovieSelect(movieId) // DD - Notify parent Page of the selected movie
                }
  };

  return (
    <div style={containerStyle}>
      {title && <h2 style={titleStyle}>{title}</h2>}
      {loading ? (
        <p style={{ color: 'white' }}>Loading...</p>
      ) : (
        <div style={scrollableStyle}>
          {movies.map((movie) => (
            <img
              key={movie.id}
              src={movie.thumbnail || 'https://www.shutterstock.com/shutterstock/videos/1102576935/thumb/2.jpg?ip=x480'}
              alt={movie.title}
              style={thumbnailStyle}
              onClick={() => handleThumbnailClick(movie.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const containerStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#000',
};

const titleStyle = {
  color: '#fff',
  fontSize: '1.5rem',
  marginBottom: '10px',
};

const scrollableStyle = {
  display: 'flex',
  overflowX: 'auto',
  gap: '10px',
  padding: '10px 0',
  alignItems: 'center',
};

const thumbnailStyle = {
  width: '220px',
  height: '121px',
  cursor: 'pointer',
  borderRadius: '5px',
  objectFit: 'cover',
};

const movieDetailStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  padding: '20px',
  backgroundColor: '#000',
};

const videoSectionStyle = {
  flex: 2,
  marginRight: '20px',
};

const videoStyle = {
  width: '100%',
  borderRadius: '10px',
};

const detailsStyle = {
  color: '#fff',
  marginTop: '20px',
};

const movieTitleStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
};

const movieStatsStyle = {
  fontSize: '1rem',
  color: '#ff0000',
  margin: '10px 0',
};

const movieMetaStyle = {
  fontSize: '1rem',
  color: '#fff',
};

const movieCastStyle = {
  fontSize: '1rem',
  color: '#fff',
  margin: '10px 0',
};

const movieDescriptionStyle = {
  fontSize: '1rem',
  color: '#ccc',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '20px',
  right: '20px',
  padding: '10px',
  backgroundColor: '#ff0000',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default NetflixMovieScroll;