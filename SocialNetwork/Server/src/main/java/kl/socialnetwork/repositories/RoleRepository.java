package kl.socialnetwork.repositories;

import kl.socialnetwork.domain.entities.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<UserRole, String> {
    UserRole findByAuthority(String authority);

    UserRole getByAuthority(String authority);
}
