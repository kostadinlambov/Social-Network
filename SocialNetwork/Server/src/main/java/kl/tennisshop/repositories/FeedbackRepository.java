package kl.tennisshop.repositories;

import kl.tennisshop.domain.entities.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
//@RepositoryRestResource(path = "/feedback")
public interface FeedbackRepository extends JpaRepository<Feedback, String> {
}
