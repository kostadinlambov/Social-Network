package kl.socialnetwork.validations.serviceValidation.services;

import kl.socialnetwork.domain.entities.User;
import kl.socialnetwork.domain.modles.serviceModels.UserServiceModel;

public interface UserValidationService {
    boolean isValid(User user);
    boolean isValid(UserServiceModel userServiceModel);

}
