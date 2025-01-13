package Flixxer.Flixxer.Backend.repositories;

import Flixxer.Flixxer.Backend.models.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {
}
