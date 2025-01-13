package Flixxer.Flixxer.Backend.controller;

import Flixxer.Flixxer.Backend.models.Genre;
import Flixxer.Flixxer.Backend.models.Video;
import Flixxer.Flixxer.Backend.repositories.GenreRepository;
import Flixxer.Flixxer.Backend.repositories.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class VideoController {

    @Autowired
    private VideoRepository videoRepository;

    @Autowired
    private GenreRepository genreRepository;

    // A simple test endpoint
    @GetMapping(value = "/w")
    public String getPage() {
        return "Hello World";
    }

    // Retrieve all videos
    @GetMapping(value = "/videos")
    public List<Video> getVideos() {
        return videoRepository.findAll();
    }

    // Save a new video with associated genres
    @PostMapping(value = "/save")
    public String saveVideo(@RequestBody Video video) {
        // Validate and fetch genres
        if (video.getGenres() != null && !video.getGenres().isEmpty()) {
            for (int i = 0; i < video.getGenres().size(); i++) {
                Optional<Genre> optionalGenre = genreRepository.findById(video.getGenres().get(i).getId());
                if (optionalGenre.isPresent()) {
                    video.getGenres().set(i, optionalGenre.get());
                } else {
                    return "Genre with ID " + video.getGenres().get(i).getId() + " not found.";
                }
            }
        }

        videoRepository.save(video);
        return "Video saved with associated genres.";
    }

    // Update an existing video and its genres
    @PutMapping(value = "update/{content_id}")
    public String updateVideo(@PathVariable long content_id, @RequestBody Video video) {
        Optional<Video> optionalVideo = videoRepository.findById(content_id);
        if (!optionalVideo.isPresent()) {
            return "Video not found.";
        }

        Video existingVideo = optionalVideo.get();

        // Update video fields
        existingVideo.setTitle(video.getTitle());
        existingVideo.setDescription(video.getDescription());
        existingVideo.setDuration(video.getDuration());
        existingVideo.setRating(video.getRating());
        existingVideo.setReleaseDate(video.getReleaseDate());

        // Update genres
        if (video.getGenres() != null && !video.getGenres().isEmpty()) {
            for (int i = 0; i < video.getGenres().size(); i++) {
                Optional<Genre> optionalGenre = genreRepository.findById(video.getGenres().get(i).getId());
                if (optionalGenre.isPresent()) {
                    video.getGenres().set(i, optionalGenre.get());
                } else {
                    return "Genre with ID " + video.getGenres().get(i).getId() + " not found.";
                }
            }
            existingVideo.setGenres(video.getGenres());
        }

        videoRepository.save(existingVideo);
        return "Video updated with associated genres.";
    }

    // Delete a video
    @DeleteMapping(value = "/delete/{content_id}")
    public String deleteVideo(@PathVariable long content_id) {
        Optional<Video> optionalVideo = videoRepository.findById(content_id);
        if (!optionalVideo.isPresent()) {
            return "Video not found.";
        }

        Video deleteVideo = optionalVideo.get();
        videoRepository.delete(deleteVideo);
        return "Video deleted successfully.";
    }

    @GetMapping("/videos/{id}")
    public ResponseEntity<Video> getVideoById(@PathVariable Long id) {
        Optional<Video> video = videoRepository.findById(id);
        if (video.isPresent()) {
            return ResponseEntity.ok(video.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
