package kl.socialnetwork.repositories;

import kl.socialnetwork.domain.entities.Relationship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RelationshipRepository extends JpaRepository<Relationship, String> {

    List<Relationship> findAllByUserOneIdAndStatus(String id, int status);

    List<Relationship> findAllByUserOneIdAndStatusOrUserTwoIdAndStatus(String id1, int status1, String id2, int status2);

    List<Relationship> findAllByUserOneIdOrUserTwoIdAndStatusNot(String id1, String id2, int status);

    Relationship findByUserOneIdAndUserTwoId(String userOneId, String userTwoId);

    List<Relationship> findAllByUserOneIdOrUserTwoId(String userOneId, String userTwoId);

    @Query(value = "" +
            "SELECT r FROM Relationship AS r " +
            "WHERE (r.userOne.id = :id OR r.userTwo.id = :id ) " +
            "AND r.status = :status")
    List<Relationship> findRelationshipByUserIdAndStatus(@Param(value = "id") String userId,
                                                         @Param(value = "status") int status);


    @Query(value = "" +
            "SELECT r FROM Relationship AS r " +
            "WHERE ((r.userOne.id = :id1 AND r.userTwo.id = :id2) " +
            "OR ( r.userTwo.id = :id1 AND r.userOne.id = :id2)) " +
            "AND r.status = :status")
    Relationship findRelationshipWithFriendWithStatus(@Param(value = "id1") String userOneId,
                                                      @Param(value = "id2") String userTwoId,
                                                      @Param(value = "status") int status);

    @Query(value = "" +
            "SELECT r FROM Relationship AS r " +
            "WHERE ((r.userOne.id = :id1 AND r.userTwo.id = :id2) " +
            "OR ( r.userTwo.id = :id1 AND r.userOne.id = :id2)) ")
    Relationship findRelationshipByUserOneIdAndUserTwoId(@Param(value = "id1") String userOneId,
                                                         @Param(value = "id2") String userTwoId);


    @Query(value = "" +
            "SELECT r FROM Relationship AS r " +
            "WHERE (r.userOne.id = :id OR r.userTwo.id = :id) " +
            "AND r.status  NOT IN (0 , 2)")
    List<Relationship> findAllNotCandidatesForFriends(@Param(value = "id") String id);

    @Query(value = "" +
            "SELECT r FROM Relationship AS r " +
            "WHERE (r.userOne.id = :id OR r.userTwo.id = :id) " +
            "AND r.status= 0")
    List<Relationship> findAllRequestedForFriendUsers(@Param(value = "id") String id);
}
