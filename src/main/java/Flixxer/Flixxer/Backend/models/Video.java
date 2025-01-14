package Flixxer.Flixxer.Backend.models;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "video")
@Getter
@Setter
public class Video {


        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private long contentId;

        @Getter
        @Setter
        @Column
        private String title;


        @Getter
        @Setter
        @Column
        private int duration;

        @Getter
        @Setter
        @Column
        private String rating;

        @Getter
        @Setter
        @Column
        private String description;

        @Getter
        @Setter
        @Column
        private LocalDate releaseDate;



        @OneToMany(mappedBy = "video")
        private Set<Post> posts = new HashSet<>();



        @ManyToMany
        private List<Genre> genres;

//list iterable

        public long getContentId() {
        return contentId;
    }

        public void setContentId(long contentId) {
        this.contentId = contentId;
    }
}


