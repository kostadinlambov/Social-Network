package kl.socialnetwork.services;

import kl.socialnetwork.domain.entities.UserRole;

public interface RoleService {
    void persist(UserRole role);

    UserRole getByName(String name);
}
