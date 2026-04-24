package vvyy.socialnetwork.services;

import vvyy.socialnetwork.domain.entities.UserRole;

public interface RoleService {
    boolean persist(UserRole role) throws Exception;

    UserRole getByName(String name);
}
