package Flixxer.Flixxer.Backend.repositories;

import Flixxer.Flixxer.Backend.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    Post findPostById(Long id);

    List<Post> findAll();

    List<Post> findPostsByVideoContentId(Long ContentId);


    //List<Post> findPostByUserId(Long userId);
}
