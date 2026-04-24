package vvyy.socialnetwork.validations.serviceValidation.services;

import vvyy.socialnetwork.domain.entities.UserRole;

public interface RoleValidationService {
    boolean isValid(UserRole role);
}
