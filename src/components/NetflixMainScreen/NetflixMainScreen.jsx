import React, { useState, useEffect } from 'react';
import EmblaCarousel from './EmblaCarousel.tsx';
import { EmblaOptionsType } from 'embla-carousel'
import './embla.css';
import NetflixMovieScroll from './NetflixMovieScroll.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MoviePage from '../../Pages/MoviePage';


const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true }
const SLIDE_COUNT = 5
const SLIDES = [
    'carousel-photos/diehardcaro.png',
    'carousel-photos/toystorycaro.png',
    'carousel-photos/interstellarcaro.png',
];

const NetflixMainScreen = ({onMovieSelect}) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/videos')
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
        setLoading(false);
      });
  }, []); // Fixed the missing dependency array

  // Categorize movies by genre
  const actionMovies = movies.filter(movie => movie.genre === 'Action');
  const comedyMovies = movies.filter(movie => movie.genre === 'Comedy');
  const dramaMovies = movies.filter(movie => movie.genre === 'Drama');
  const sciFiMovies = movies.filter(movie => movie.genre === 'Sci-Fi');
  const animationMovies = movies.filter(movie => movie.genre === 'Animation');
  const sortedMovies = [...movies].sort((a, b) => b.id - a.id);
    const maxMoviesToShow = 10;
    const moviesToShow = sortedMovies.slice(0, maxMoviesToShow);


    return (
        <div style={componentNetflixScreenStyle}>
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
            <NetflixMovieScroll title="Recently Added" movies={moviesToShow} loading={loading} onMovieSelect={onMovieSelect}/>
            <NetflixMovieScroll title="New Releases" movies={movies} loading={loading} onMovieSelect={onMovieSelect} />
            <NetflixMovieScroll title="New Releases" movies={movies} loading={loading} onMovieSelect={onMovieSelect} />
            <NetflixMovieScroll title="New Releases" movies={movies} loading={loading} onMovieSelect={onMovieSelect}/>
            <NetflixMovieScroll title="New Releases" movies={movies} loading={loading} onMovieSelect={onMovieSelect}/>
        </div>
    );

};

const componentNetflixScreenStyle = {
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

export default NetflixMainScreen;
