package Flixxer.Flixxer.Backend.repositories;

import Flixxer.Flixxer.Backend.models.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RestController;


@RestController
public interface GenreRepository extends JpaRepository<Genre, Long> {
}
