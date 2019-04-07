package kl.tennisshop.services;

import kl.tennisshop.domain.entities.UserRole;


public interface RoleService {
    void persist(UserRole role);

    UserRole getByName(String name);
}
