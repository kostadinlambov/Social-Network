package vvyy.socialnetwork.web.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import vvyy.socialnetwork.domain.models.bindingModels.user.UserRegisterBindingModel;
import vvyy.socialnetwork.domain.models.bindingModels.user.UserUpdateBindingModel;
import vvyy.socialnetwork.domain.models.serviceModels.UserServiceModel;
import vvyy.socialnetwork.domain.models.viewModels.user.UserAllViewModel;
import vvyy.socialnetwork.domain.models.viewModels.user.UserCreateViewModel;
import vvyy.socialnetwork.domain.models.viewModels.user.UserDetailsViewModel;
import vvyy.socialnetwork.services.OtpService;
import vvyy.socialnetwork.services.UserService;
import vvyy.socialnetwork.utils.responseHandler.exceptions.BadRequestException;
import vvyy.socialnetwork.utils.responseHandler.exceptions.CustomException;
import vvyy.socialnetwork.utils.responseHandler.successResponse.SuccessResponse;
import vvyy.socialnetwork.validations.serviceValidation.services.UserValidationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static vvyy.socialnetwork.utils.constants.ResponseMessageConstants.*;

@RestController
@RequestMapping(value = "/users")
public class UserController {
    private static final String SERVER_ERROR_MESSAGE = "Server Error";

    private final UserService userService;
    private final ModelMapper modelMapper;
    private final ObjectMapper objectMapper;
    private final UserValidationService userValidationService;
    private final OtpService otpService;

    @Autowired
    public UserController(UserService userService, ModelMapper modelMapper, ObjectMapper objectMapper, UserValidationService userValidationService, OtpService otpService) {
        this.userService = userService;
        this.modelMapper = modelMapper;
        this.objectMapper = objectMapper;
        this.userValidationService = userValidationService;
        this.otpService = otpService;
    }

    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> registerUser(@RequestBody @Valid UserRegisterBindingModel userRegisterBindingModel) throws Exception {

        if (!userValidationService.isValid(userRegisterBindingModel.getPassword(), userRegisterBindingModel.getConfirmPassword())) {
            throw new BadRequestException(PASSWORDS_MISMATCH_ERROR_MESSAGE);
        }

        if (!userValidationService.isValid(userRegisterBindingModel)) {
            throw new Exception(SERVER_ERROR_MESSAGE);
        }

        // Send OTP to user's email
        String email = userRegisterBindingModel.getEmail();
        try {
            boolean otpSent = this.otpService.sendOtpToEmail(email);
            if (!otpSent) {
                throw new Exception("Failed to send OTP");
            }
        } catch (Exception e) {
            throw new CustomException("Failed to send OTP: " + e.getMessage());
        }

        // Return message asking user to verify OTP
        SuccessResponse successResponse = new SuccessResponse(
                LocalDateTime.now(),
                "OTP sent to your email. Please verify to complete registration.",
                email,
                true
        );

        return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
    }

    /**
     * Complete registration after OTP verification
     */
    @PostMapping(value = "/complete-registration", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> completeRegistration(@RequestBody Map<String, String> body) throws Exception {
        String email = body.get("email");
        String username = body.get("username");
        String password = body.get("password");
        String firstName = body.get("firstName");
        String lastName = body.get("lastName");
        String address = body.get("address");
        String city = body.get("city");

        // Check if email is OTP verified
        if (!this.otpService.isEmailVerified(email)) {
            throw new CustomException("Email not verified. Please verify OTP first.");
        }

        // Create user object with email verified flag
        UserRegisterBindingModel userRegisterBindingModel = new UserRegisterBindingModel();
        userRegisterBindingModel.setEmail(email);
        userRegisterBindingModel.setUsername(username);
        userRegisterBindingModel.setPassword(password);
        userRegisterBindingModel.setFirstName(firstName);
        userRegisterBindingModel.setLastName(lastName);
        userRegisterBindingModel.setAddress(address);
        userRegisterBindingModel.setCity(city);

        UserServiceModel user = modelMapper.map(userRegisterBindingModel, UserServiceModel.class);
        UserCreateViewModel savedUser = this.userService.createUser(user);

        SuccessResponse successResponse = successResponseBuilder(LocalDateTime.now(), SUCCESSFUL_REGISTER_MESSAGE, savedUser, true);

        return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
    }

    @GetMapping(value = "/all/{id}")
    public List<UserAllViewModel> getAllUsers(@PathVariable(value = "id") String userId) throws Exception {
        List<UserServiceModel> allUsers = this.userService.getAllUsers(userId);

        return allUsers.stream()
                .map(x -> {
                    UserAllViewModel userAllViewModel = this.modelMapper.map(x, UserAllViewModel.class);
                    userAllViewModel.setRole(x.extractAuthority());
                    return userAllViewModel;
                })
                .collect(Collectors.toList());
    }

    @GetMapping(value = "/details/{id}")
    public ResponseEntity getDetails(@PathVariable String id) throws Exception {
        UserDetailsViewModel user = this.userService.getById(id);

        return new ResponseEntity<>(this.objectMapper.writeValueAsString(user), HttpStatus.OK);
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity updateUser(@RequestBody @Valid UserUpdateBindingModel userUpdateBindingModel,
                                     @PathVariable(value = "id") String loggedInUserId) throws Exception {

        if(!userValidationService.isValid(userUpdateBindingModel)){
            throw new Exception(SERVER_ERROR_MESSAGE);
        }

        UserServiceModel userServiceModel = this.modelMapper.map(userUpdateBindingModel, UserServiceModel.class);
        boolean result = this.userService.updateUser(userServiceModel, loggedInUserId);

        if (result) {
            SuccessResponse successResponse = successResponseBuilder(LocalDateTime.now(), SUCCESSFUL_USER_PROFILE_EDIT_MESSAGE, "", true);
            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }

        throw new CustomException(SERVER_ERROR_MESSAGE);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable String id) throws Exception {
            boolean result = this.userService.deleteUserById(id);

            if(result){
                SuccessResponse successResponse = successResponseBuilder(LocalDateTime.now(), SUCCESSFUL_USER_DELETE_MESSAGE, "", true);
                return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
            }

            throw new CustomException(SERVER_ERROR_MESSAGE);
    }


    @PostMapping(value = "/promote")
    public ResponseEntity promoteUser(@RequestParam(name = "id") String id) throws Exception {
        boolean resultOfPromoting = this.userService.promoteUser(id);

        if (resultOfPromoting) {
            SuccessResponse successResponse = successResponseBuilder(LocalDateTime.now(), SUCCESSFUL_USER_PROMOTED_MESSAGE, "", true);
            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }

        throw new CustomException(USER_FAILURE_PROMOTING_MESSAGE);
    }

    @PostMapping(value = "/demote")
    public ResponseEntity demoteUser(@RequestParam(name = "id") String id) throws Exception {
        boolean resultOfDemoting = this.userService.demoteUser(id);

        if (resultOfDemoting) {

            SuccessResponse successResponse = successResponseBuilder(LocalDateTime.now(), SUCCESSFUL_USER_DEMOTED_MESSAGE, "", true);
            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }
        throw new CustomException(USER_FAILURE_DEMOTING_MESSAGE);
    }

    private SuccessResponse successResponseBuilder(LocalDateTime timestamp, String message, Object payload, boolean success) {
        return new SuccessResponse(timestamp, message, payload, success);
    }
}
