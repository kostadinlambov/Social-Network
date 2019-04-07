package kl.tennisshop.repositories;

import kl.tennisshop.domain.entities.Category;
import kl.tennisshop.domain.entities.Order;
import kl.tennisshop.domain.entities.Racket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface RacketRepository extends JpaRepository<Racket, String> {
        List<Racket> findAllByCategory(Category category);

        Racket findByName(String name);

        Racket findFirstByName(String name);

        Racket deleteRacketById(String id);

        List<Racket> findAllByDeletedFalse();
        List<Racket> findAllByDeletedTrue();

        List<Racket> deleteAllByDeletedTrue();
}
