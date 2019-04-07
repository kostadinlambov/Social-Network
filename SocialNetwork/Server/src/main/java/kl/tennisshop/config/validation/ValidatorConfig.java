package kl.tennisshop.config.validation;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.ValidatorFactory;
import java.util.Set;

public class ValidatorConfig {

    public static <T> String getInvalidParameterMessage(T target){
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Set<ConstraintViolation<T>> constraintViolations = factory.getValidator().validate(target);
        // Returns ONLY the first Violation Message
        for (ConstraintViolation<T> constraintViolation : constraintViolations) {
            return constraintViolation.getMessage();
        }

        return null;
    }

    public static <T> boolean checkIsValid(T target){
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Set<ConstraintViolation<T>> constraintViolations = factory.getValidator().validate(target);
        // Returns ONLY the first Violation Message
        for (ConstraintViolation<T> constraintViolation : constraintViolations) {
            return false;
        }

        return true;
    }
}
