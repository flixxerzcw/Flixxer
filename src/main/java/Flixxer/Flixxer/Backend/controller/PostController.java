package Flixxer.Flixxer.Backend.controller;

import Flixxer.Flixxer.Backend.models.Post;
import Flixxer.Flixxer.Backend.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PostController {

    @Autowired
    private PostRepository postRepository;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value="/posts")
    public List<Post> getPosts(){
        return postRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value="/posts/save")
    public String savePost(@RequestBody Post post){
        postRepository.save(post);
        return "Post saved!";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(value="/posts/update/{id}")
    public String updatePost(@PathVariable Long id,@RequestBody Post post){
        Post updatePost = postRepository.findById(id).get();

        updatePost.setMessage(post.getMessage());
        postRepository.save(updatePost);
        return "Post updated!";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping(value = "/posts/delete/{id}" )
    public String deletePost(@PathVariable Long id) {
        Post deletedPost = postRepository.findById(id).get();
        postRepository.delete(deletedPost);
        return "Post deleted";
    }

}
