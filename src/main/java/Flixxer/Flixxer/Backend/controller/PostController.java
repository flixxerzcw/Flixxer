package Flixxer.Flixxer.Backend.controller;

import Flixxer.Flixxer.Backend.models.Post;
import Flixxer.Flixxer.Backend.repositories.PostRepository;
import Flixxer.Flixxer.Backend.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
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

}
