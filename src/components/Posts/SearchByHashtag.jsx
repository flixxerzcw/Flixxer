import React, { useState, useEffect } from "react";

const SearchByHashtag = ({ fetchSuggestions, text, setText }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    if (text.match(/#\w+$/)) {
      const term = text.split("#").pop();
      if (term.length > 1) {
        fetchSuggestions(term).then((suggestedHashtags) => {
          setSuggestions(suggestedHashtags);
          setHighlightedIndex(0); // Reset highlighted index
        });
      } else {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  }, [text, fetchSuggestions]);

  const handleKeyDown = (e) => {
    if (suggestions.length > 0) {
      if (e.key === "ArrowDown") {
        // Navigate down the suggestions
        setHighlightedIndex((prevIndex) =>
          (prevIndex + 1) % suggestions.length
        );
        e.preventDefault();
      } else if (e.key === "ArrowUp") {
        // Navigate up the suggestions
        setHighlightedIndex((prevIndex) =>
          (prevIndex - 1 + suggestions.length) % suggestions.length
        );
        e.preventDefault();
      } else if (e.key === "Enter" || e.key === "Tab") {
        // Select the highlighted suggestion
        const selectedSuggestion = suggestions[highlightedIndex];
        autofillHashtag(selectedSuggestion);
        e.preventDefault();
      }
    }
  };

  const autofillHashtag = (hashtag) => {
    const updatedText = text.replace(/#\w*$/, `#${hashtag}`);
    setText(updatedText);
    setSuggestions([]);
  };

  const handleSuggestionClick = (hashtag) => {
    autofillHashtag(hashtag);
  };

  return (
    <div style={{ position: "absolute" }} onKeyDown={handleKeyDown}>
      {suggestions.length > 0 && (
        <ul style={styles.suggestionsList}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              style={{
                ...styles.suggestionItem,
                backgroundColor: index === highlightedIndex ? "#444" : "transparent",
              }}
              onMouseDown={() => handleSuggestionClick(suggestion)} // Prevent input blur
            >
              #{suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  suggestionsList: {
    position: "absolute",
    bottom: "calc(100% + 5px)", // Position above the input box with a small gap
    left: 0, // Align to the left side of the input box
    width: "100%", // Same width as the input box
    backgroundColor: "#000",
    border: "1px solid #ddd",
    borderRadius: "4px",
    margin: "0",
    padding: "0",
    listStyle: "none",
    zIndex: 10, // Ensure it appears on top of other elements
  },
  suggestionItem: {
    padding: "8px",
    cursor: "pointer",
    color: "#fff",
  },
};

export default SearchByHashtag;
