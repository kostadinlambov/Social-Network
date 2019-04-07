package kl.socialnetwork.services;

import kl.socialnetwork.domain.entities.UserRole;

public interface RoleService {
    boolean persist(UserRole role) throws Exception;

    UserRole getByName(String name);
}
