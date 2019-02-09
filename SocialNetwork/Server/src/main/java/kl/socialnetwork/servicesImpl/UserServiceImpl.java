package kl.socialnetwork.servicesImpl;

import kl.socialnetwork.domain.entities.User;
import kl.socialnetwork.domain.entities.UserRole;
import kl.socialnetwork.domain.modles.serviceModels.UserServiceModel;
import kl.socialnetwork.domain.modles.viewModels.user.UserCreateViewModel;
import kl.socialnetwork.domain.modles.viewModels.user.UserDeleteViewModel;
import kl.socialnetwork.domain.modles.viewModels.user.UserDetailsViewModel;
import kl.socialnetwork.domain.modles.viewModels.user.UserEditViewModel;
import kl.socialnetwork.repositories.RoleRepository;
import kl.socialnetwork.repositories.UserRepository;
import kl.socialnetwork.services.UserService;
import kl.socialnetwork.utils.constants.ResponseMessageConstants;
import kl.socialnetwork.utils.responseHandler.exceptions.CustomException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final ModelMapper modelMapper;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, ModelMapper modelMapper, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.modelMapper = modelMapper;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public User persist(User user) {
        return this.userRepository.save(user);
    }


    @Override
    public UserCreateViewModel createUser(UserServiceModel userServiceModel) {

        User userEntity = this.modelMapper.map(userServiceModel, User.class);

        userEntity.setPassword(this.bCryptPasswordEncoder
                .encode(userEntity.getPassword()));

        UserRole adminRole = this.roleRepository.findByAuthority("ADMIN");
        UserRole userRole = this.roleRepository.findByAuthority("USER");
        UserRole rootRole = this.roleRepository.findByAuthority("ROOT");
        Set<UserRole> roles = new HashSet<>();
        if (this.userRepository.findAll().isEmpty()) {
            roles.add(rootRole);
//            roles.add(moderatorRole);
        }else{
            roles.add(userRole);
        }

        userEntity.setAuthorities(roles);

        User user = this.userRepository.saveAndFlush(userEntity);
        if (user != null) {
            return this.modelMapper.map(userEntity, UserCreateViewModel.class);
        }
        return null;
    }

    @Override
    public boolean updateUser(UserServiceModel userServiceModel) {
        User userOrigin = this.userRepository.findById(userServiceModel.getId()).orElse(null);

        if (userOrigin != null) {
            User userEntity = this.modelMapper.map(userServiceModel, User.class);
            userEntity.setPassword(userOrigin.getPassword());
            userEntity.setAuthorities(userOrigin.getAuthorities());


            User updatedUser  = this.userRepository.saveAndFlush(userEntity);
            return updatedUser != null;
        }

        return false;
    }

//    public boolean addToCart(String userId, String racketId ){
//       User user = this.userRepository.findById(userId).orElse(null);
//
//       if(user != null){
//         Racket racket = this.racketRepository.findById(racketId).orElse(null);
//           if(racket != null){
//               user.getShoppingCartProducts().add(racket);
//
//               User updatedUser = this.userRepository.saveAndFlush(user);
//               return updatedUser != null;
//           }
//       }
//
//        return false;
//    }


    @Override
    public UserDetailsViewModel getById(String id) {
        User user = this.userRepository.findById(id).orElse(null);

        if (user != null) {
            return this.modelMapper.map(user, UserDetailsViewModel.class);
        }

        throw new CustomException(ResponseMessageConstants.USER_NOT_FOUND_ERROR_MESSAGE);
    }

    @Override
    public UserDetailsViewModel getByUsername(String username) {
        User user = this.userRepository.findById(username).orElse(null);

        if (user != null) {
            return this.modelMapper.map(user, UserDetailsViewModel.class);
        }

        throw new CustomException(ResponseMessageConstants.USER_NOT_FOUND_ERROR_MESSAGE);
    }

    @Override
    public UserEditViewModel editById(String id) {
        User user = this.userRepository.findById(id).orElse(null);

        if (user != null) {
            return this.modelMapper.map(user, UserEditViewModel.class);
        }

        throw new CustomException(ResponseMessageConstants.USER_NOT_FOUND_ERROR_MESSAGE);
    }

    @Override
    public User getByFirstName(String firstName) {
        return this.userRepository.findAllByFirstName(firstName);
    }

    @Override
    public User getByEmailValidation(String email) {
        User user = this.userRepository.findByEmail(email);

        if (user != null) {
            return user;
        }

        return null;
    }

    @Override
    public User getByUsernameValidation(String username) {
        User user = this.userRepository.findByUsername(username).orElse(null);
        if (user != null) {
            return user;
        }
        return null;
    }



    @Override
    public List<UserServiceModel> getAllUsers() {
        return this.userRepository
                .findAll()
                .stream()
                .map(x -> this.modelMapper.map(x, UserServiceModel.class))
                .collect(Collectors.toList());
    }

    @Override
    public boolean deleteUserById(String id) {
        User user = this.userRepository.findById(id).orElse(null);
        if(user != null){
            try{
                this.userRepository.deleteById(id);
                return true;
            }catch (IllegalArgumentException iae){
                throw new CustomException(iae.getMessage());
            }
        }
        return false;
    }

    @Override
    public UserDeleteViewModel deleteUserByEmail(String email) {

        User user = this.userRepository.findByEmail(email);

        if (user != null) {
            this.userRepository.delete(user);
            return this.modelMapper.map(user, UserDeleteViewModel.class);
        }
        return null;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.userRepository
                .findByUsername(username)
                .orElse(null);

        if (user == null) throw new UsernameNotFoundException("No such user.");

        return user;
    }


    public boolean promoteUser(String id) {
        User user = this.userRepository
                .findById(id)
                .orElse(null);

        if(user == null) return false;

        String userAuthority = this.getUserAuthority(user.getId());

        switch (userAuthority) {
            case "USER":
                user.setAuthorities(this.getAuthorities("ADMIN"));
                break;
//            case "ADMIN":
//                user.setAuthorities(this.getAuthorities("ROOT"));
//                break;
            default:
                throw new CustomException("There is no role, higher than Admin");
        }

        this.userRepository.saveAndFlush(user);
        return true;
    }

    @Override
    public boolean demoteUser(String id) {
        User user = this.userRepository
                .findById(id)
                .orElse(null);

        if(user == null) return false;

        String userAuthority = this.getUserAuthority(user.getId());

        switch (userAuthority) {
//            case "ROOT":
//                user.setAuthorities(this.getAuthorities("ADMIN"));
//                break;
            case "ADMIN":
                user.setAuthorities(this.getAuthorities("USER"));
                break;
            default:
                throw new CustomException("There is no role, lower than USER");
        }

        this.userRepository.saveAndFlush(user);
        return true;
    }



    private Set<UserRole> getAuthorities(String authority) {
        Set<UserRole> userAuthorities = new HashSet<>();

        userAuthorities.add(this.roleRepository.getByAuthority(authority));

        return userAuthorities;
    }

    private String getUserAuthority(String userId) {
        return this
                .userRepository
                .findById(userId)
                .get()
                .getAuthorities()
                .stream()
                .findFirst()
                .get()
                .getAuthority();
    }

}
