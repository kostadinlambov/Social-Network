package kl.socialnetwork.repositories;

import kl.socialnetwork.domain.entities.Like;
import kl.socialnetwork.domain.entities.Post;
import kl.socialnetwork.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikeRepository extends JpaRepository<Like, String> {
    Like findByUserAndPost(User user, Post post);

    List<Like> findAllByPost(Post post);
}
