package kl.tennisshop.validations;

import org.springframework.stereotype.Component;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

@Component
public class PasswordValidator implements ConstraintValidator<Password, String> {
    private int minLength;
    private int maxLength;
    private boolean containsOnlyLettersAndDigits;


    @Override
    public void initialize(Password password) {
        this.minLength = password.minLength();
        this.maxLength = password.maxLength();
        this.containsOnlyLettersAndDigits = password.containsOnlyLettersAndDigits();

    }

    @Override
    public boolean isValid(String password, ConstraintValidatorContext constraintValidatorContext) {
//       Pattern pattern = Pattern.compile("[A-Z][a-zA-Z]+");
//        Matcher matcher = pattern.matcher(password);
        String regex = "^[a-zA-Z0-9]+$";

        if (password.length() < this.minLength || password.length() > this.maxLength) {
//            throw new IllegalArgumentException("Password should be at least 4 and maximum 16 characters long.");
            return false;
        }

        if (!Pattern.matches(regex, password) && this.containsOnlyLettersAndDigits) {
//            throw new IllegalArgumentException("Password must contain only letters and digits.");
            return false;
        }
        return true;
    }
}
