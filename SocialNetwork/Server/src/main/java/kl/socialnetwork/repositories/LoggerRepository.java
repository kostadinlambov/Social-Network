package kl.socialnetwork.repositories;

import kl.socialnetwork.domain.entities.Logger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface LoggerRepository extends JpaRepository<Logger, String> {
    List<Logger> findAllByOrderByTimeDesc();

    List<Logger> findAllByUsernameOrderByTimeDesc(String username);

    @Transactional
    @Modifying
    List<Logger> deleteAllByUsername(String username);
}