package kl.tennisshop.web.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import kl.tennisshop.domain.models.bindingModels.user.UserRegisterBindingModel;
import kl.tennisshop.domain.models.bindingModels.user.UserUpdateBindingModel;
import kl.tennisshop.domain.models.serviceModels.UserServiceModel;
import kl.tennisshop.domain.models.viewModels.user.*;
import kl.tennisshop.utils.constants.ResponseMessageConstants;
import kl.tennisshop.utils.responseHandler.exceptions.BadRequestException;
import kl.tennisshop.utils.responseHandler.exceptions.CustomException;
import kl.tennisshop.services.UserService;
import kl.tennisshop.utils.responseHandler.successResponse.SuccessResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static kl.tennisshop.utils.constants.ResponseMessageConstants.*;

@RestController
@RequestMapping(value = "/users")
public class UserController {
    private static final String SERVER_ERROR_MESSAGE = "Server Error";

    private final UserService userService;
    private final ModelMapper modelMapper;
    private final ObjectMapper objectMapper;

    @Autowired
    public UserController(UserService userService, ModelMapper modelMapper, ObjectMapper objectMapper) {
        this.userService = userService;
        this.modelMapper = modelMapper;
        this.objectMapper = objectMapper;
    }

    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> registerUser(@RequestBody @Valid UserRegisterBindingModel userRegisterBindingModel) throws JsonProcessingException {
//        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);

        if (!userRegisterBindingModel.getPassword().equals(userRegisterBindingModel.getConfirmPassword())) {
            throw new BadRequestException(PASSWORDS_MISMATCH_ERROR_MESSAGE);
        }

        UserServiceModel user = modelMapper.map(userRegisterBindingModel, UserServiceModel.class);
        UserCreateViewModel savedUser = this.userService.createUser(user);

        if (user != null) {
            SuccessResponse successResponse = new SuccessResponse(
                    new Date(),
                    SUCCESSFUL_REGISTER_MESSAGE,
                    savedUser,
                    true);

            System.out.println(this.objectMapper.writeValueAsString(successResponse));

            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }

        throw new CustomException(SERVER_ERROR_MESSAGE);
    }


    @GetMapping(value = "/all")
    public List<UserAllViewModel> getAllUsers() {
        return this.userService
                .getAllUsers()
                .stream()
                .map(x -> {
                    UserAllViewModel userAllViewModel = this.modelMapper.map(x, UserAllViewModel.class);
                    userAllViewModel.setRole(x.extractAuthority());
                    return userAllViewModel;
                })
                .collect(Collectors.toList());

    }

    @GetMapping(value = "details/{id}")
    public ResponseEntity getDetails(@PathVariable String id) throws JsonProcessingException {
        UserDetailsViewModel user = this.userService.getById(id);

        SuccessResponse successResponse = new SuccessResponse(
                new Date(),
                SUCCESSFUL_USER_DETAILS_FOUND_MESSAGE,
                user,
                true
        );
        return new ResponseEntity<>(this.objectMapper.writeValueAsString(user), HttpStatus.OK);
    }

    @GetMapping(value = "details/username/{username}")
    public ResponseEntity getDetailsByUsername(@PathVariable String username) throws JsonProcessingException {
        UserDetailsViewModel user = this.userService.getByUsername(username);

        SuccessResponse successResponse = new SuccessResponse(
                new Date(),
                SUCCESSFUL_USER_DETAILS_FOUND_MESSAGE,
                user,
                true
        );
        return new ResponseEntity<>(this.objectMapper.writeValueAsString(user), HttpStatus.OK);
    }

    @GetMapping(value = "editDetails/{id}")
    public ResponseEntity getEditDetails(@PathVariable String id) throws JsonProcessingException {
        UserEditViewModel user = this.userService.editById(id);

        SuccessResponse successResponse = new SuccessResponse(
                new Date(),
                SUCCESSFUL_USER_DETAILS_FOUND_MESSAGE,
                user,
                true
        );
        return new ResponseEntity<>(this.objectMapper.writeValueAsString(user), HttpStatus.OK);
    }

    @PutMapping(value = "/update", produces = "application/json")
    public ResponseEntity updateUser(@RequestBody @Valid UserUpdateBindingModel userUpdateBindingModel) throws JsonProcessingException {

        boolean result = this.userService.updateUser(this.modelMapper.map(userUpdateBindingModel, UserServiceModel.class));

        if (result) {
            SuccessResponse successResponse = new SuccessResponse(
                    new Date(),
                    SUCCESSFUL_USER_PROFILE_EDIT_MESSAGE,
                    "",
                    true);
            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }
        throw new CustomException(ResponseMessageConstants.SERVER_ERROR_MESSAGE);
    }


    @PostMapping(value = "/promote")
    public ResponseEntity promoteUser(@RequestParam(name = "id") String id) throws JsonProcessingException {
        boolean resultOfPromoting = this.userService.promoteUser(id);

        if (resultOfPromoting) {
            SuccessResponse successResponse = new SuccessResponse(
                    new Date(),
                    SUCCESSFUL_USER_PROMOTED_MESSAGE,
                    "",
                    true);
            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }
        throw new CustomException(USER_FAILURE_PROMOTING_MESSAGE);
    }

    @PostMapping(value = "/demote")
    public ResponseEntity demoteUser(@RequestParam(name = "id") String id) throws JsonProcessingException {
        boolean resultOfDemoting = this.userService.demoteUser(id);

        if (resultOfDemoting) {
            SuccessResponse successResponse = new SuccessResponse(
                    new Date(),
                    SUCCESSFUL_USER_DEMOTED_MESSAGE,
                    "",
                    true);
            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }
        throw new CustomException(USER_FAILURE_DEMOTING_MESSAGE);
    }


    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable String id) throws JsonProcessingException {
        boolean result = this.userService.deleteUserById(id);
        if (result) {
            SuccessResponse successResponse = new SuccessResponse(
                    new Date(),
                    SUCCESSFUL_USER_DELETE_MESSAGE,
                    "",
                    true);
            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }
        throw new CustomException(ResponseMessageConstants.SERVER_ERROR_MESSAGE);
    }

}
