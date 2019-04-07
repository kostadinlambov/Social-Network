package kl.tennisshop.repositories;

import kl.tennisshop.domain.entities.Category;
import kl.tennisshop.domain.entities.Racket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
//@RepositoryRestResource(path = "/category")
public interface CategoryRepository extends JpaRepository<Category, String> {
    Category findByName(String name);

    List<Category> findAllByDeletedFalse();
    List<Category> findAllByDeletedTrue();

}
