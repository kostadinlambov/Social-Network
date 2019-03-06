package kl.socialnetwork.repositories;

import kl.socialnetwork.domain.entities.Relationship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RelationshipRepository extends JpaRepository<Relationship, String> {

    List<Relationship> findAllByUserOneIdAndStatus(String id, int status);

    List<Relationship> findAllByUserOneIdAndStatusOrUserTwoIdAndStatus(String id1, int status1, String id2,int status2 );

    List<Relationship> findAllByUserOneIdOrUserTwoIdAndStatusNot(String id1, String id2, int status);

    Relationship findByUserOneIdAndUserTwoId(String userOneId, String userTwoId);


}
