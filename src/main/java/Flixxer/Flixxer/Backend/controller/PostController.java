package Flixxer.Flixxer.Backend.controller;

import Flixxer.Flixxer.Backend.models.HotTake;
import Flixxer.Flixxer.Backend.models.Post;
import Flixxer.Flixxer.Backend.repositories.PostRepository;
import Flixxer.Flixxer.Backend.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PostController {

    @Autowired
    PostService postService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value="/posts/all")
    public @ResponseBody List<Post> getAllPosts() {
        return postService.findAllPosts();
    }

   @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value="/posts/save")
    public @ResponseBody Post savePost(@RequestBody Post post){
        return postService.savePost(post);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value="/posts/save/user/{userId}")
    public @ResponseBody Post savePostById(@RequestBody Post post, @PathVariable Long userId){
       return postService.savePostByUserId(post, userId);
    }

    @PostMapping("/posts/save/{userId}/{videoId}")
    public ResponseEntity<Post> createPost(@PathVariable Long userId, @PathVariable Long videoId, @RequestBody Post post) {
        Post savedPost = postService.savePostWithUserAndVideo(userId, videoId, post);
        return ResponseEntity.ok(savedPost);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value="/posts/all/hotTake/{videoId}")
    public @ResponseBody List<HotTake> getAllPost(@PathVariable Long videoId) {
        return postService.gethotTakesbyVideoId(videoId);
    }
}
