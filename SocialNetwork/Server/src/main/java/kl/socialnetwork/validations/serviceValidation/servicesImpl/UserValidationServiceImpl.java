package kl.socialnetwork.validations.serviceValidation.servicesImpl;

import kl.socialnetwork.domain.entities.User;
import kl.socialnetwork.domain.modles.serviceModels.UserServiceModel;
import kl.socialnetwork.validations.serviceValidation.services.UserValidationService;
import org.springframework.stereotype.Component;

@Component
public class UserValidationServiceImpl implements UserValidationService {

    @Override
    public boolean isValid(User user) {
        return user != null;
    }

    @Override
    public boolean isValid(UserServiceModel userServiceModel) {
        return userServiceModel != null;
    }
}
