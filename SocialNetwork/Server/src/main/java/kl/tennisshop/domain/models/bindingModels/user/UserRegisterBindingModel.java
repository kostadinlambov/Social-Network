package kl.tennisshop.domain.models.bindingModels.user;

import kl.tennisshop.utils.constants.ValidationMessageConstants;
import kl.tennisshop.validations.Password;
import kl.tennisshop.validations.PasswordMatching;
import kl.tennisshop.validations.UniqueEmail;
import kl.tennisshop.validations.UniqueUsername;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.io.Serializable;

@PasswordMatching
public class UserRegisterBindingModel implements Serializable {
    private String username;
    private String email;
    private String password;
    private String confirmPassword;
    private String firstName;
    private String lastName;
    private String address;
    private String city;

//    private Set<UserRole> roles;
//    private Boolean isDeleted = false;
//
//    private Set<Order> orders;
//    private Set<Payment> payments;
//    private Set<Feedback> feedbackSet;

    public UserRegisterBindingModel() {
    }

    @Pattern(regexp = "^([a-zA-Z0-9]+)$")
    @Size(min = 4, max = 16, message = ValidationMessageConstants.USER_INVALID_USERNAME_MESSAGE)
    @UniqueUsername
    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Pattern(regexp = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$",message = ValidationMessageConstants.USER_INVALID_EMAIL_MESSAGE)
    @UniqueEmail
    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Password(minLength = 4, maxLength = 16, containsOnlyLettersAndDigits = true, message = ValidationMessageConstants.USER_INVALID_PASSWORD_MESSAGE)
    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return this.confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    @Pattern(regexp = "^[A-Z]([a-zA-Z]+)?$", message = ValidationMessageConstants.USER_INVALID_FIRST_NAME_MESSAGE)
    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @Pattern(regexp = "^[A-Z]([a-zA-Z]+)?$", message = ValidationMessageConstants.USER_INVALID_LAST_NAME_MESSAGE)
    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @NotNull(message = ValidationMessageConstants.USER_ADDRESS_REQUIRED_MESSAGE)
    @Length(min = 1, message = ValidationMessageConstants.USER_ADDRESS_REQUIRED_MESSAGE)
    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @NotNull(message = ValidationMessageConstants.USER_CITY_REQUIRED_MESSAGE)
    @Length(min = 1, message = ValidationMessageConstants.USER_CITY_REQUIRED_MESSAGE)
    public String getCity() {
        return this.city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
