package kl.tennisshop.repositories;

import kl.tennisshop.domain.entities.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
//@RepositoryRestResource(path = "/roles")
public interface RoleRepository extends JpaRepository<UserRole, String> {

    UserRole findByAuthority(String authority);

    UserRole getByAuthority(String authority);
}
