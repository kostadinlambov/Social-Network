package kl.socialnetwork.utils.constants;

public final class ResponseMessageConstants {

    private ResponseMessageConstants(){}

    // Error Messages
    public static final String SERVER_ERROR_MESSAGE = "Server Error";
    public static final String UNAUTHORIZED_SERVER_ERROR_MESSAGE = "Unauthorized!";
    public static final String VALIDATION_ERROR_MESSAGE = "Validation error.";

    // User Error Messages
    public static final String PASSWORDS_MISMATCH_ERROR_MESSAGE = "Passwords do not match.";
    public static final String INVALID_CREDENTIALS_ERROR_MESSAGE = "Incorrect email or password";
    public static final String USER_NOT_FOUND_ERROR_MESSAGE = "User not found.";
    public static final String USER_FAILURE_PROMOTING_MESSAGE = "Failure promoting user!";
    public static final String USER_FAILURE_DEMOTING_MESSAGE = "Failure demoting user!";
    public static final String USER_FAILURE_CHANGING_ROOT_AUTHORITY_MESSAGE = "You can't change ROOT authority!";
    public static final String USER_FAILURE_PROMOTING_ADMIN_MESSAGE = "There is no role, higher than Admin!";
    public static final String USER_FAILURE_DEMOTING_USER_MESSAGE = "There is no role, lower than USER!";

    // User Successful Response Messages
    public static final String SUCCESSFUL_REGISTER_MESSAGE = "You have been successfully registered.";
    public static final String SUCCESSFUL_LOGIN_MESSAGE = "You have successfully logged in.";
    public static final String SUCCESSFUL_LOGOUT_MESSAGE = "You have been successfully logged out.";
    public static final String SUCCESSFUL_USER_DEMOTED_MESSAGE = "User demoted successfully.";
    public static final String SUCCESSFUL_USER_PROMOTED_MESSAGE = "User promoted successfully.";
    public static final String SUCCESSFUL_USER_PROFILE_EDIT_MESSAGE = "User Profile have been successfully edited.";
    public static final String SUCCESSFUL_USER_DELETE_MESSAGE = "User have been successfully deleted.";

    //Picture Messages
    public static final String SUCCESSFUL_PICTURE_ALL_MESSAGE = "All pictures successfully loaded.";
    public static final String SUCCESSFUL_PICTURE_UPLOAD_MESSAGE = "Successfully uploaded picture!";
    public static final String SUCCESSFUL_PICTURE_DELETE_MESSAGE = "Picture successfully deleted!";

    //Post Messages
    public static final String SUCCESSFUL_CREATE_POST_MESSAGE = "Post created successfully.";
    public static final String SUCCESSFUL_POST_ALL_MESSAGE = "All posts successfully loaded.";
    public static final String SUCCESSFUL_POST_DELETE_MESSAGE = "Post successfully deleted!";

    public static final String FAILURE_POST_LIKE_MESSAGE = "Post was already liked from you!";

    //Comment Messages
    public static final String SUCCESSFUL_CREATE_COMMENT_MESSAGE = "Comment created successfully.";
    public static final String SUCCESSFUL_DELETE_COMMENT_MESSAGE = "Comment successfully deleted!";

    // Relationship Messages
    public static final String SUCCESSFUL_FRIEND_REQUEST_SUBMISSION_MESSAGE = "Your friend request have been successfully submitted!";
    public static final String SUCCESSFUL_FRIEND_REMOVE_MESSAGE = "User was removed from your friends list!";
    public static final String SUCCESSFUL_ADDED_FRIEND_MESSAGE = "User was added successfully to your friends list!";
    public static final String SUCCESSFUL_REJECT_FRIEND_REQUEST_MESSAGE = "Request was successfully rejected!";

    // Log Messages
    public static final String SUCCESSFUL_LOGS_SAVING_MESSAGE = "Log was written successfully";
    public static final String SUCCESSFUL_LOGS_DELETING_MESSAGE = "Logs have been successfully deleted.";
    public static final String SUCCESSFUL_USER_LOGS_DELETING_MESSAGE = "User logs have been successfully deleted.";

    public static final String FAILURE_LOGS_SAVING_MESSAGE = "Failure log saving!";
    public static final String FAILURE_LOGS_NOT_FOUND_MESSAGE = "No logs available for selected username.";
    public static final String FAILURE_LOGS_CLEARING_ERROR_MESSAGE = "Logs clearing error.";

    // Message Messages
    public static final String SUCCESSFUL_CREATE_MESSAGE_MESSAGE = "Message created successfully.";

    // Like Messages
    public static final String SUCCESSFUL_LIKE_POST_MESSAGE = "You liked a post!";
}
