import React, { useState, useEffect, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import SearchByText from "./SearchByText";
import SearchByHashtag from "./SearchByHashtag";

  const ThreadDiscussion = ({ movieId }) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [postText, setPostText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const userId = "Deepti Mishra";
  const postListRef = useRef(null);

  console.log("ThreadDiscussion movieId before : " + movieId);

  useEffect(() => {

    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/getTweet?movieId=${movieId}`);
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        console.log("Fetched data:", data.tweets);
        setPosts(data.tweets);
        setFilteredPosts(data.tweets);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [movieId]);

  useEffect(() => {
    if (postListRef.current) {
      postListRef.current.scrollTop = postListRef.current.scrollHeight;
    }
  }, [filteredPosts]);

  const fetchSuggestions = async (term) => {
    try {
      const response = await fetch(`http://localhost:8080/getHashtagSuggestions?term=${term}`);
      if (!response.ok) throw new Error("Failed to fetch suggestions");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      return [];
    }
  };

  const handlePostInputChange = (e) => {
    const value = e.target.value;
    setPostText(value);
    handleHashtagInput(value);
  };

  const handleHashtagInput = (text) => {
    if (text.match(/#\w+$/)) {
      const term = text.split("#").pop();
      if (term.length > 1) {
        fetchSuggestions(term).then((suggestedHashtags) => setSuggestions(suggestedHashtags));
      } else {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (hashtag) => {
    const updatedText = postText.replace(/#\w*$/, `#${hashtag}`);
    setPostText(updatedText);
    setSuggestions([]);
  };

  const handleSearchByText = (searchText) => {
    const filtered = posts.filter(
      (tweet) =>
        tweet.tweet.toLowerCase().includes(searchText.toLowerCase()) ||
        tweet.userId.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const addTweet = async () => {
    if (postText.trim() !== "") {
      const newTweet = {
        userId,
        tweet: postText,
      };

      try {
        const response = await fetch(`http://localhost:8080/saveTweet?movieId=${movieId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTweet),
        });

        if (!response.ok) throw new Error("Failed to add post");

        const updatedTweets = [...posts, { ...newTweet, movieId }];
        setPosts(updatedTweets);
        setFilteredPosts(updatedTweets);
        setPostText("");
      } catch (error) {
        console.error("Error adding post:", error);
      }
    }
  };

  return (
    <div style={styles.container}>
      <SearchByText onSearch={handleSearchByText} />
      <div style={styles.tweetList} ref={postListRef}>
        {filteredPosts.map((tweet, index) => (
          <div key={index} style={styles.tweet}>
            <div style={styles.tweetContent}>
              <div style={styles.userLabel}>{tweet.userId}</div>
              <div style={styles.tweetText}>{tweet.tweet}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.inputSection}>
        <button
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          style={styles.emojiButton}
        >
          😊
        </button>
        <input
          type="text"
          placeholder="Write your post..."
          value={postText}
          maxLength={255}
          onChange={handlePostInputChange}
          style={styles.tweetInput}
        />
       <SearchByHashtag
         fetchSuggestions={fetchSuggestions}
         text={postText}
         setText={setPostText}
       />
        <button onClick={addTweet} style={styles.tweetButton}>
          Send
        </button>
        {showEmojiPicker && (
          <div style={styles.emojiPickerContainer}>
            <EmojiPicker onEmojiClick={(emojiObject) => setPostText((prev) => prev + emojiObject.emoji)} />
          </div>
        )}
      </div>
      <p style={styles.charCount}>{255 - postText.length} Characters left</p>
    </div>
  );
};


// Styles
const styles = {
  container: {
    position: "relative", // For search to position correctly
    display: "flex",
    flexDirection: "column",
    minHeight: "600px", /* Ensure it doesn't get too small */
    maxHeight: "1200px", /* Ensure it doesn't get too big */
    height: "90vh", /* Use this height */
    backgroundColor: "#000000",
    border: "0px",
    borderRadius: "0px",
    overflow: "hidden", // Prevent horizontal overflow
    padding: "0px",
  },
  tweetList: {
    flex: 1, // Takes up all available space
    overflowY: "auto", // Enables scrolling for overflowing content
    padding: "8px",
  },
  tweet: {
    background: "#282829",
    border: "0px",
    borderRadius: "8px",
    padding: "8px",
    fontSize: "14px",
    lineHeight: "1.5",
    wordWrap: "break-word",
    marginBottom: "4px",
  },
  tweetContent: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  userLabel: {
    fontSize: "12px",
    fontWeight: "bold",
    color: "#1DA1F2",
  },
  tweetText: {
    color: "#ffffff",
  },
  inputSection: {
    display: "flex",
    alignItems: "center",
    maxHeight: "100%",
    gap: "5px",
    padding: "5px",
    backgroundColor: "#000000",
    borderTop: "1px solid #000000",
  },
  tweetInput: {
    flex: 1,
    padding: "8px",
    marginTop: "5px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  tweetButton: {
    padding: "8px 8px",
    marginTop: "5px",
    background: "#1DA1F2",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  charCount: {
    color: "lightgrey",
    fontSize: "12px",
    padding: "5px",
  },
  emojiButton: {
    background: "none",
    padding: "0px",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
  },
  emojiPickerContainer: {
    position: "absolute",
    bottom: "100px",
    zIndex: 10,
    backgroundColor: "#fff",
    borderRadius: "6px",
    boxShadow: "1px 4px 6px rgba(0, 0, 0, 0.1)",
  },

};

export default ThreadDiscussion;
