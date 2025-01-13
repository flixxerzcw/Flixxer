import React from 'react';
import { useNavigate } from 'react-router-dom';

const TVShowScroll = ({ title, shows = [] }) => {
  const navigate = useNavigate();

  const handleThumbnailClick = (showId) => {
    navigate(`/tvshow/${showId}`);
  };

  return (
    <div style={containerStyle}>
      {title && <h2 style={titleStyle}>{title}</h2>}
      <div style={scrollableStyle}>
        {shows.map((show) => (
          <img
            key={show.id}
            src={show.thumbnail}
            alt={show.title}
            style={thumbnailStyle}
            onClick={() => handleThumbnailClick(show.id)}
          />
        ))}
      </div>
    </div>
  );
};

const TVShowPage = ({ tvShows = [] }) => {
  const categories = {
    Drama: tvShows.filter((show) => show.genre.includes('Drama')),
    Comedy: tvShows.filter((show) => show.genre.includes('Comedy')),
    'Sci-Fi': tvShows.filter((show) => show.genre.includes('Sci-Fi')),
    Fantasy: tvShows.filter((show) => show.genre.includes('Fantasy')),
    Action: tvShows.filter((show) => show.genre.includes('Action')),
    Historical: tvShows.filter((show) => show.genre.includes('Historical')),
  };

  return (
    <div style={componentTVShowScreenStyle}>
      <h1 style={mainTitleStyle}>TV Shows</h1>
      {Object.entries(categories).map(([category, shows]) => (
        shows.length > 0 && (
          <TVShowScroll key={category} title={category} shows={shows} />
        )
      ))}
    </div>
  );
};

// Styles
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

const componentTVShowScreenStyle = {
  flex: '3',
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  padding: '0rem',
  border: '0px solid #ccc',
  borderRadius: '2px',
  backgroundColor: '#000',
  overflowY: 'scroll',
  scrollbarWidth: 'none',
};

const mainTitleStyle = {
  color: '#fff',
  fontSize: '2.5rem',
  marginBottom: '2rem',
  padding: '0 10px',
};

const showsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: '0', // Set gap to 0
  padding: '1rem 0',
};


export default TVShowPage;
