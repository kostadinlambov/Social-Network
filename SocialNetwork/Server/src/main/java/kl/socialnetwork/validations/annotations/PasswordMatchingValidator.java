package kl.socialnetwork.validations.annotations;

import kl.socialnetwork.domain.models.bindingModels.user.UserRegisterBindingModel;
import org.springframework.stereotype.Component;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

@Component
public class PasswordMatchingValidator implements ConstraintValidator<PasswordMatching, Object> {
    @Override
    public void initialize(PasswordMatching constraintAnnotation) {

    }

    @Override
    public boolean isValid(Object o, ConstraintValidatorContext constraintValidatorContext) {
        if (o instanceof UserRegisterBindingModel) {
            UserRegisterBindingModel user = (UserRegisterBindingModel) o;
            return user.getPassword().equals(user.getConfirmPassword());
        }
        return false;
    }
}
