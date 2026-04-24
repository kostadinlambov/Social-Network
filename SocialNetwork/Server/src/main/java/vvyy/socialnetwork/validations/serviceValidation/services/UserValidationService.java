package vvyy.socialnetwork.validations.serviceValidation.services;

import vvyy.socialnetwork.domain.entities.User;
import vvyy.socialnetwork.domain.models.bindingModels.user.UserRegisterBindingModel;
import vvyy.socialnetwork.domain.models.bindingModels.user.UserUpdateBindingModel;
import vvyy.socialnetwork.domain.models.serviceModels.UserServiceModel;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserValidationService {
    boolean isValid(User user);

    boolean isValid(UserServiceModel userServiceModel);

    boolean isValid(UserRegisterBindingModel userRegisterBindingModel);

    boolean isValid(String firstParam, String secondParam);

    boolean isValid(UserUpdateBindingModel userUpdateBindingModel);

    boolean isValid(UserDetails userData);
}
