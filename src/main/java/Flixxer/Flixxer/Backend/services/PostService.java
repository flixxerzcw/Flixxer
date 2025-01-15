package Flixxer.Flixxer.Backend.services;

import Flixxer.Flixxer.Backend.models.HotTake;
import Flixxer.Flixxer.Backend.models.Post;
import Flixxer.Flixxer.Backend.models.User;
import Flixxer.Flixxer.Backend.models.Video;
import Flixxer.Flixxer.Backend.repositories.PostRepository;
import Flixxer.Flixxer.Backend.repositories.UserRepository;
import Flixxer.Flixxer.Backend.repositories.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@Service
public class PostService {

    @Autowired
    private VideoRepository videoRepo;

    @Autowired
    private PostRepository postRepo;

    @Autowired
    private UserRepository userRepo;

    public Post savePost(Post post) {
        return postRepo.save(post);
    }

    public Post findPost(Long id) {
        return postRepo.findPostById(id);
    }

    public List<Post> findAllPosts() {
        return postRepo.findAll();
    }

   /* public List<Post> getPostsByUser(Long userId) {
        return postRepo.findPostByUserId(userId);
    }*/

    public Post savePostByUserId(Post post, Long userId) {
        User user = userRepo.findByUserId(userId);
        post.setUser(user);
        return postRepo.save(post);
    }





    public Post savePostWithUserAndVideo(Long userId, Long ContentId, Post post) {
        User user = userRepo.findByUserId(userId);
        Video video = videoRepo.findByContentId(ContentId);
        post.setUser(user);
        post.setVideo(video);
        return postRepo.save(post);
    }


    public List<HotTake> gethotTakesbyVideoId(Long videoId){
        List<Post> posts = postRepo.findPostsByVideoContentId(videoId);
        List<HotTake> hotTakes = new ArrayList<>();
        for (Post post : posts) {
            hotTakes.add(new HotTake(videoId, post.getUser().getUsername(),post.getMessage(),post.getTimestamp()));
        }
        return hotTakes;
    }

}
