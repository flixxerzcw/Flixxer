package Flixxer.Flixxer.Backend.models;

import java.sql.Timestamp;

public class HotTake {

    public HotTake(Long movieId, String username, String message, Timestamp timestamp) {
        this.movieId = movieId;
        this.message = message;
        this.username = username;
        this.timestamp = timestamp;
    }

    private Long movieId;

    private String message;

    private String username;

    private Timestamp timestamp;

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }
}
