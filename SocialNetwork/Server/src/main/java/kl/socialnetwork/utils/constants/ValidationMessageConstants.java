package kl.socialnetwork.utils.constants;

public final class ValidationMessageConstants {

    private ValidationMessageConstants(){}

    public static final String NOT_NULL_MESSAGE = "May not be null";
    public static final String IS_REQUIRED_MESSAGE = "Field is required.";
    public static final String INVALID_CREDENTIALS_MESSAGE = "Incorrect credentials.";
    public static final String ID_REQUIRED_MESSAGE = "Id is required.";

    // User Message Constants
    public static final String USER_INVALID_EMAIL_MESSAGE = "Invalid e-mail address.";
    public static final String USER_INVALID_USERNAME_MESSAGE = "Username should be at least 4 and maximum 16 characters long.";
    public static final String USER_INVALID_FIRST_NAME_MESSAGE = "First Name must start with a capital letter and must contain only letters.";
    public static final String USER_INVALID_LAST_NAME_MESSAGE = "Last Name must start with a capital letter and must contain only letters.";
    public static final String USER_INVALID_PASSWORD_MESSAGE = "Invalid Password format.";
    public static final String USER_CITY_REQUIRED_MESSAGE = "City is required.";
    public static final String USER_ADDRESS_REQUIRED_MESSAGE = "Address is required.";
}
