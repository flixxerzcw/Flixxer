package Flixxer.Flixxer.Backend.repositories;

import Flixxer.Flixxer.Backend.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
