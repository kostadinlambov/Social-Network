package kl.socialnetwork.repositories;

import kl.socialnetwork.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<User, String> {

//    Optional<User> findById(String id);
//    User findByUsername(String username);

    User findByEmail(String email);

    User findByEmailAndPassword(String email, String password);

    User findAllByFirstName(String firstName);

    Optional<User> findByUsername(String username);
}
