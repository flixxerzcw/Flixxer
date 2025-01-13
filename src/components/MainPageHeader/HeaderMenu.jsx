import React, { useState } from 'react';
import './HeaderMenu.css'; // Import the CSS file for styles
import { Link, useNavigate } from 'react-router-dom';

function HeaderMenu() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // State to handle search input
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update the search query as the user types
  };

  const handleMenuClick = (title) => {
    const routes = {
      'Series': '/tvshows',
      'Movies': '/movies',
      // Add more menu items and their corresponding routes here
    };
  
    if (routes[title]) {
      navigate(routes[title]);
    }
  };
  

  const menus = [
    {
      title: 'Home',
    },
    {
      title: 'Movies',
      submenu: ['Die Hard', 'Toy Story', 'The Godfather'],
    },
    {
      title: 'Series',
      submenu: ['Breaking Bad', 'Stranger Things', 'The Crown'],
    },
    
  ];

  return (
    <header>
      <nav>
        <ul className="menu">
          {menus.map((menu, index) => (
            <li
              key={index}
              className="menu-item"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleMenuClick(menu.title)}
            >
              {menu.title === 'Home' ? (
                <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                  {menu.title}
                </Link>
              ) : (
                menu.title
              )}
            </li>
          ))}
          <li className="search-item">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-box"
            />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default HeaderMenu;
