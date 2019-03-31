package kl.socialnetwork.validations.serviceValidation.services;

import kl.socialnetwork.domain.entities.User;

public interface UserValidationService {
    boolean isValid(User user);

}
