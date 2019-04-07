package kl.tennisshop.repositories;

import kl.tennisshop.domain.entities.Category;
import kl.tennisshop.domain.entities.Logger;
import kl.tennisshop.domain.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface LoggerRepository extends JpaRepository<Logger, String> {
        List<Logger> findAllByOrderByTimeDesc();

        List<Logger> findAllByUsernameOrderByTimeDesc(String username);

//        @Transactional
//        @Modifying
//        @Query(value = "DELETE FROM Logger as log WHERE log.username = :userName" )
//        List<Logger> deleteAllLogsByUsername(@Param("userName") String userName);

        @Transactional
        @Modifying
        List<Logger> deleteAllByUsername(String username);
}