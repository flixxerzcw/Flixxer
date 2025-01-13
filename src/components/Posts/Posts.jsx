import React, { useState } from "react";
import ThreadDiscussion from "./PostsComponent";

const PostSectionDisplay = ({ movieId }) => {
  return (
    <div style={styles.container}>
        <div style={styles.postsDisplay}>
           <ThreadDiscussion movieId={movieId}/>
          </div>
    </div>
  );
};

const styles = {
  container: {
    flex: "1",
    color: "white",
    height: "100vh",
    backgroundColor: "#1c2833",
    border: "1px solid #566573",
    borderRadius: "4px",
    padding: "0px",
  },
  postsDisplay: {
    marginTop: "0px", // Add margin below the button for spacing
  },

};

export default PostSectionDisplay;
