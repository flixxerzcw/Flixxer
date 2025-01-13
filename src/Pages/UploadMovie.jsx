import React, { useState } from 'react';

const UploadMovie = () => {
  // Hardcoded list of available genres (replace with API call if needed)
  const availableGenres = [
    { id: 1, title: 'Action' },
    { id: 2, title: 'Adventure' },
    { id: 3, title: 'Comedy' },
    { id: 4, title: 'Drama' },
    { id: 5, title: 'Horror' },
    // Add more genres as needed
  ];

  // State to manage form data
  const [formData, setFormData] = useState({
    title: '',
    releaseDate: '',
    rating: '',
    description: '',
    duration: '',
    genres: [], // Array of selected genre ids
    thumbnail: '',
    videoUrl: '',
  });

    const [genreInput, setGenreInput] = useState('');
  const [filteredGenres, setFilteredGenres] = useState([]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

    // Handle genre input changes and filter genres
    const handleGenreInputChange = (e) => {
      const value = e.target.value;
      setGenreInput(value);

    if (value) {
      // Filter genres based on the input
      const filtered = availableGenres.filter((genre) =>
        genre.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredGenres(filtered);
    } else {
      setFilteredGenres([]); // Clear filtered genres when input is empty
    }
  };

  // Handle genre selection
  const handleGenreSelect = (genre) => {
    // Check if genre is already selected to avoid duplicates
    if (!formData.genres.some((g) => g.id === genre.id)) {
      setFormData((prev) => ({
        ...prev,
        genres: [...prev.genres, genre], // Add selected genre
      }));
    }
    setGenreInput(''); // Clear input after selection
    setFilteredGenres([]); // Clear the genre list after selection
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data for submission
    const movieData = {
      ...formData,
      genres: formData.genres, // genres are already in formData
    };

    // Send movie data to the API
    const apiUrl = 'http://localhost:8080/save'; // Replace with your actual API URL

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData), // Send the data as JSON
      });

      if (response.ok) {
        const data = await response.json();
        alert('Movie uploaded successfully!');
        setFormData({
          title: '',
          releaseDate: '',
          rating: '',
          description: '',
          duration: '',
          genres: [],
          thumbnail: '',
          videoUrl: '',
        });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error('Error uploading movie:', error);
      alert('There was an error submitting the form. Please try again later.');
    }
  };

  return (
    <div style={textStyle} className="container mt-5">
      <h1>Upload Movie</h1>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Movie Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter movie title"
            required
          />
        </div>

        {/* Release Date */}
        <div className="mb-3">
          <label htmlFor="releaseDate" className="form-label">Release Date</label>
          <input
            type="date"
            className="form-control"
            id="releaseDate"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Rating */}
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">Rating</label>
          <input
            type="text"
            className="form-control"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Enter the rating"
            required
          />
        </div>

        {/* Duration */}
        <div className="mb-3">
          <label htmlFor="duration" className="form-label">Duration (in minutes)</label>
          <input
            type="text"
            className="form-control"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Enter the duration"
            required
          />
        </div>

        {/* Genres */}
        <div className="mb-3">
          <label htmlFor="genres" className="form-label">Genres</label>
          <div>
            <input
              type="text"
              className="form-control"
              id="genreInput"
              value={genreInput}
              onChange={handleGenreInputChange}
              placeholder="Enter a genre"
            />
            <ul className="list-group mt-2">
              {filteredGenres.map((genre) => (
                <li
                  key={genre.id}
                  className="list-group-item"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleGenreSelect(genre)}
                >
                  {genre.title}
                </li>
              ))}
            </ul>
            <div className="mt-2">
              {formData.genres.map((genre, index) => (
                <span key={index} className="badge bg-primary me-2">
                  {genre.title}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Thumbnail */}
        <div className="mb-3">
          <label htmlFor="thumbnail" className="form-label">Thumbnail URL</label>
          <input
            type="text"
            className="form-control"
            id="thumbnail"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            placeholder="Enter the thumbnail URL"
            required
          />
        </div>

        {/* Video URL */}
        <div className="mb-3">
          <label htmlFor="videoUrl" className="form-label">Video URL</label>
          <input
            type="text"
            className="form-control"
            id="videoUrl"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
            placeholder="Enter the video URL"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Enter a description"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-danger">
          Submit
        </button>
      </form>
    </div>
  );
};

const textStyle = {
  color: '#fff',
  fontSize: '1.5rem',
  marginBottom: '10px',
};

export default UploadMovie;
