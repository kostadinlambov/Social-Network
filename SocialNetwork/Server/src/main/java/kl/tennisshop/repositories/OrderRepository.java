package kl.tennisshop.repositories;

import kl.tennisshop.domain.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.beans.Transient;
import java.util.List;

@Repository
//@RepositoryRestResource(path = "/orders")
public interface OrderRepository extends JpaRepository<Order, String> {

    @Query(value = "SELECT * FROM orders WHERE user_id = :userId"
            , nativeQuery = true)
    List<Order> findAllByUserId(@Param("userId") String userId);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM Order as o WHERE o.user.id = :userId" )
    List<Order> deleteAllByUserId(@Param("userId") String userId);

    Order findOrderByRacketIdAndUserId(String racketId, String userId);

}
