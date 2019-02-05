package kl.socialnetwork.repositories;

import kl.socialnetwork.domain.entities.Relationship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RelationshipRepository extends JpaRepository<Relationship, String> {

}
