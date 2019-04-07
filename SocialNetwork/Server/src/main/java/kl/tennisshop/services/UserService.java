package kl.tennisshop.services;

import kl.tennisshop.domain.entities.User;
import kl.tennisshop.domain.models.bindingModels.user.UserLoginBindingModel;
import kl.tennisshop.domain.models.bindingModels.user.UserUpdateBindingModel;
import kl.tennisshop.domain.models.serviceModels.UserServiceModel;
import kl.tennisshop.domain.models.viewModels.user.*;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends  UserDetailsService {
    User persist(User user);

    UserCreateViewModel createUser(UserServiceModel userRegisterBindingModel);

    boolean updateUser(UserServiceModel userUpdateBindingModel);

    UserDetailsViewModel getById(String id);

    UserEditViewModel editById(String id);


    User getByFirstName(String firstName);

    User getByEmailValidation(String email);

    User getByUsernameValidation(String username);

    UserDetailsViewModel getByUsername(String username);

    List<UserServiceModel> getAllUsers();

    UserDeleteViewModel deleteUserByEmail(String email);

    boolean promoteUser(String id);

    boolean demoteUser(String id);

    boolean deleteUserById(String id);

    boolean addToCart(String userId, String racketId);

}
