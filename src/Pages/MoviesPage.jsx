import React from 'react';
import { useNavigate } from 'react-router-dom';

const MoviesPage = ({ movies }) => {
  const navigate = useNavigate();

  // You might want to adjust these categories based on your actual movie data
  const categories = {
    Action: movies.filter((movie) => movie.genre?.includes('Action')),
    Comedy: movies.filter((movie) => movie.genre?.includes('Comedy')),
    Drama: movies.filter((movie) => movie.genre?.includes('Drama')),
    SciFi: movies.filter((movie) => movie.genre?.includes('Sci-Fi')),
    Animation: movies.filter((movie) => movie.genre?.includes('Animation')),
    Horror: movies.filter((movie) => movie.genre?.includes('Horror')),
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const containerStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#000',
    color: '#fff',
  };

  const categoryStyle = {
    marginBottom: '2rem',
  };

  const categoryTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#e5e5e5',
  };

  const moviesGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '0',
    padding: '1rem 0',
  };

  const movieCardStyle = {
    position: 'relative',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
  };

  const thumbnailStyle = {
    width: '100%',
    aspectRatio: '16/9',
    objectFit: 'cover',
    borderRadius: '4px',
  };

  const movieTitleStyle = {
    marginTop: '0.5rem',
    fontSize: '0.9rem',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Movies</h1>
      {Object.entries(categories).map(([category, categoryMovies]) => (
        categoryMovies.length > 0 && (
          <div key={category} style={categoryStyle}>
            <h2 style={categoryTitleStyle}>{category}</h2>
            <div style={moviesGridStyle}>
              {categoryMovies.map((movie) => (
                <div
                  key={movie.id}
                  style={movieCardStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  onClick={() => handleMovieClick(movie.id)}
                >
                  <img
                    src={movie.thumbnail}
                    alt={movie.title}
                    style={thumbnailStyle}
                  />
                  <div style={movieTitleStyle}>{movie.title}</div>
                </div>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default MoviesPage;
