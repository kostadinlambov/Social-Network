package kl.tennisshop.utils.constants;

public final class ResponseMessageConstants {

    private ResponseMessageConstants(){}

    // Error Messages
    public static final String SERVER_ERROR_MESSAGE = "Server Error.";
    public static final String VALIDATION_ERROR_MESSAGE = "Validation error.";
    public static final String PASSWORDS_MISMATCH_ERROR_MESSAGE = "Passwords do not match.";
    public static final String INVALID_CREDENTIALS_ERROR_MESSAGE = "Incorrect email or password";
    public static final String INVALID_CATEGORY_ERROR_MESSAGE = "Invalid category.";
    public static final String CATEGORY_ALREADY_EXISTS_ERROR_MESSAGE = "Category already exists.";
    public static final String USER_NOT_FOUND_ERROR_MESSAGE = "User not found.";
    public static final String USER_FAILURE_PROMOTING_MESSAGE = "Failure promoting user!";
    public static final String USER_FAILURE_DEMOTING_MESSAGE = "Failure demoting user!";
    public static final String FAILURE_CATEGORY_RESTORE_MESSAGE = "Failure restoring category!";
    public static final String FAILURE_CATEGORY_DELETE_MESSAGE = "Failure deleting category!";
    public static final String FAILURE_CATEGORY_EDIT_MESSAGE = "Failure editing category!";
    public static final String FAILURE_ORDER_CREATE_MESSAGE = "Order or User cannot be null!";
    public static final String FAILURE_CHECKOUT_MESSAGE = "Error during checkout!";
    public static final String FAILURE_ORDER_REMOVE_MESSAGE = "Error during removing order!";
    public static final String FAILURE_RACKET_NOT_FOUND_MESSAGE = "Racket doesn't exist!";
    public static final String FAILURE_ORDER_EDIT_MESSAGE = "Failure editing order!";
    public static final String FAILURE_LOGS_NOT_FOUND_MESSAGE = "No logs available for selected username!";
    public static final String FAILURE_LOGS_CLEARING_ERROR_MESSAGE = "Logs clearing error.";

    // Successful Response Messages
    public static final String SUCCESSFUL_REGISTER_MESSAGE = "You have been successfully registered.";
    public static final String SUCCESSFUL_LOGIN_MESSAGE = "You have successfully logged in.";
    public static final String SUCCESSFUL_USER_DETAILS_FOUND_MESSAGE = "User details found successfully.";
    public static final String SUCCESSFUL_USER_DEMOTED_MESSAGE = "User demoted successfully.";
    public static final String SUCCESSFUL_USER_PROMOTED_MESSAGE = "User promoted successfully.";
    public static final String SUCCESSFUL_USER_PROFILE_EDIT_MESSAGE = "User Profile have been successfully edited.";
    public static final String SUCCESSFUL_USER_DELETE_MESSAGE = "User have been successfully deleted.";
    public static final String SUCCESSFUL_CATEGORY_ADDITION_MESSAGE = "Category have been successfully added.";
    public static final String SUCCESSFUL_CATEGORY_RESTORE_MESSAGE = "Category restored successfully.";
    public static final String SUCCESSFUL_CATEGORY_DELETE_MESSAGE = "Category deleted successfully.";
    public static final String SUCCESSFUL_CATEGORY_DISABLE_MESSAGE = "Category disabled successfully.";
    public static final String SUCCESSFUL_CATEGORY_EDIT_MESSAGE = "Category edited successfully.";
    public static final String SUCCESSFUL_ADDED_TO_CART_MESSAGE = "Product added to cart successfully.";
    public static final String SUCCESSFUL_CHECKOUT_MESSAGE = "Checkout processed successfully.";
    public static final String SUCCESSFUL_REMOVE_ORDER_MESSAGE = "Product removed from shopping cart.";
    public static final String SUCCESSFUL_CLEAR_LOGS_MESSAGE = "Logs have been successfully deleted.";
    public static final String SUCCESSFUL_ORDER_UPDATE_MESSAGE = "Order updated successfully.";

}
