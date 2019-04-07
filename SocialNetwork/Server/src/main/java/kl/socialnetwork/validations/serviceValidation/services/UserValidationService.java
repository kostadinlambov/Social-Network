package kl.socialnetwork.validations.serviceValidation.services;

import kl.socialnetwork.domain.entities.User;
import kl.socialnetwork.domain.models.bindingModels.user.UserRegisterBindingModel;
import kl.socialnetwork.domain.models.bindingModels.user.UserUpdateBindingModel;
import kl.socialnetwork.domain.models.serviceModels.UserServiceModel;

public interface UserValidationService {
    boolean isValid(User user);

    boolean isValid(UserServiceModel userServiceModel);

    boolean isValid(UserRegisterBindingModel userRegisterBindingModel);

    boolean isValid(String password, String confirmPassword);

    boolean isValid(UserUpdateBindingModel userUpdateBindingModel);
}
