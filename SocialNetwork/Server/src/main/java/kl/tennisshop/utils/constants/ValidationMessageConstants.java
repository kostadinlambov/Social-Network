package kl.tennisshop.utils.constants;

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
    public static final String CATEGORY_NAME_REQUIRED_MESSAGE = "Category name is required.";

    // Racket Message Constants
    public static final String RACKET_INVALID_RACKET_NAME_MESSAGE = "Racket Name must be at least 5 characters long.";
    public static final String RACKET_INVALID_PRICE_MESSAGE = "Price must be a number between 0 and 10000.";
    public static final String RACKET_INVALID_HEAD_SIZE_MESSAGE = "Head Size must be a number between 0 and 10000.";
    public static final String RACKET_INVALID_WEIGHT_MESSAGE = "Weight must be a number between 0 and 10000.";
    public static final String RACKET_INVALID_DESCRIPTION_LENGTH_MESSAGE = "Description must be more than 10 symbols.";
    public static final String RACKET_STRING_PATTERN_REQUIRED_MESSAGE = "String Pattern is required.";
    public static final String RACKET_MAIN_IMAGE_URL_REQUIRED_MESSAGE = "Main Image Url is required.";
    public static final String RACKET_CATEGORY_NAME_REQUIRED_MESSAGE = "Category Name is required.";

    // Order Message Constants
    public static final String ORDER_INVALID_QUANTITY_MESSAGE = "Quantity must be a positive number.";



}
