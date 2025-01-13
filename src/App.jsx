
import PostSectionDisplay from './components/Posts/Posts';
import ThreadDiscussion from './components/Posts/PostsComponent';
import React, { useState, useEffect } from 'react';
import MainHeader from './components/MainPageHeader/MainHeader';
import NetflixMainScreen from './components/NetflixMainScreen/NetflixMainScreen';
import NetflixMovieScroll from './components/NetflixMainScreen/NetflixMovieScroll';
import MoviePage from "./Pages/MoviePage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadMovie from "./Pages/UploadMovie";
import 'bootstrap/dist/css/bootstrap.min.css';
import Account from "./Pages/Account";
import TVShowPage from './Pages/TVShowPage';
import TVShowDetails from './Pages/TVShowDetails';
import MoviesPage from './Pages/MoviesPage';





const AppLayout = () => {
  const layoutStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100vw', // Full viewport width
    height: '100vh', // Full viewport height
    margin: 0, // Remove any default margins
    padding: 0,
    backgroundColor: '#000', // Black background
    boxSizing: 'border-box', // Include padding and border in dimensions
    overflow: 'hidden', // Prevent content overflow
  };

//DD - set the initial movieId state as empty so that we can fetch the general tweets
const [selectedMovieId, setSelectedMovieId] = useState("");


//DD - Added the function for reverse routing from video page to parent page and then to post page
  const handleMovieSelect = (movieId) => {
    setSelectedMovieId(movieId);
  };

  const contentContainer = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '98%', // Slight margin inside the parent container
    height: 'calc(100% - 60px)', // Subtract header height to avoid overflow
    marginTop: '1rem',
    gap: '1rem', // Add spacing between main sections
  };

  const netflixColumn = {
    display: 'flex',
    flexDirection: 'column',
    flex: 3, // Allocate more space to Netflix section
    gap: '1rem', // Add spacing between the two Netflix components
    overflowY: 'auto',
  };

  const postsSection = {
    flex: 1, // Allocate smaller space to Twitter section
    marginLeft: '0rem', // Adds spacing between columns
   // overflowY: 'auto', // Allow scrolling if content overflows
  };


const tvShows = [
  { 
    id: 1, 
    title: 'Breaking Bad', 
    genre: 'Drama', 
    thumbnail: '/video-thumbnails/BreakingBad.png', 
    videoUrl: '/Trailers/BreakingBad.mp4',
    description: 'A high school chemistry teacher turned methamphetamine manufacturer partners with a former student to secure his family\'s financial future as he battles terminal lung cancer.'
  },
  { 
    id: 2, 
    title: 'YellowStone', 
    genre: 'Drama', 
    thumbnail: '/video-thumbnails/YellowStone.png', 
    videoUrl: '/Trailers/YS.mp4',
    description: 'A ranching family in Montana faces off against others encroaching on their land. '
  },
  { 
    id: 3, 
    title: 'The Office', 
    genre: 'Comedy', 
    thumbnail: '/video-thumbnails/Office.png', 
    videoUrl: 'https://www.youtube.com/watch?v=LHOtME2DL4g',
    description: 'A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.'
  },
  { 
    id: 4, 
    title: 'The Sopranos', 
    genre: 'Drama', 
    thumbnail: '/video-thumbnails/Sopranos.png', 
    videoUrl: '/Trailers/TheSop.mp4',
    description: 'New Jersey mob boss Tony Soprano deals with personal and professional issues in his home and business life that affect his mental state, leading him to seek professional psychiatric counseling. '
  },
  { 
    id: 5, 
    title: 'Friends', 
    genre: 'Comedy', 
    thumbnail: '/video-thumbnails/Friends.png', 
    videoUrl: '/Trailers/Friends.mp4',
    description: 'Follows the personal and professional lives of six twenty to thirty year-old friends living in the Manhattan borough of New York City'
  },
  { 
    id: 6, 
    title: 'Law and Order', 
    genre: 'Drama', 
    thumbnail: '/video-thumbnails/LawOrder.png', 
    videoUrl: '/Trailers/',
    description: 'Two part drama which focuses on the New York criminal justice system showing a violent crime investigated by the police detectives and then the trial of the accused in court by the prosecutors. '
  },
  { 
    id: 7, 
    title: 'Band of Brothers', 
    genre: 'Drama', 
    thumbnail: '/video-thumbnails/BandofBros.png', 
    videoUrl: '/Trailers/',
    description: 'The story of Easy Company of the U.S Army 101st Airborne Division and their mission in World War 2 Europe, from Operation Overlord to V-J Day.'
  },
  { 
    id: 8, 
    title: 'Chernobyl', 
    genre: 'Historical', 
    thumbnail: '/video-thumbnails/Chernobyl.png', 
    videoUrl: '/Trailers/',
    description: 'In April 1986, the city of Chernobyl in the Soviet Union suffers one of the worst nuclear disasters in the history of mankind. Consequently, many heroes put their lives on the line in the following days, weeks and months.'
  },
 
];

  return (
    <Router>
    <div style={layoutStyle}>
      <MainHeader />

        <div style={contentContainer}>
          {/* Netflix Column */}
          <div style={netflixColumn}>
            <Routes>
              {/* Netflix Main Screen */}
              <Route path="/" element={<NetflixMainScreen onMovieSelect={handleMovieSelect}/>} />

              {/* Movie Page */}
              <Route path="/movie/:id" element={<MoviePage />} />



          </Routes>
        </div>
        <div style={postsSection}>
          <PostSectionDisplay movieId={selectedMovieId} />
        </div>
      </div>
    </div>
  </Router>
);
};

export default AppLayout;
