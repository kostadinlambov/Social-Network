package vvyy.socialnetwork.factory;

import vvyy.socialnetwork.domain.entities.User;
import vvyy.socialnetwork.domain.models.serviceModels.UserServiceModel;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserFactory {
    
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    
    public UserFactory(BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }
    
    public User createRegularUser(UserServiceModel userServiceModel) {
        User user = new User();
        user.setUsername(userServiceModel.getUsername());
        user.setEmail(userServiceModel.getEmail());
        user.setPassword(bCryptPasswordEncoder.encode(userServiceModel.getPassword()));
        user.setFirstName(userServiceModel.getFirstName());
        user.setLastName(userServiceModel.getLastName());
        user.setEnabled(true);
        user.setAccountNonExpired(true);
        user.setAccountNonLocked(true);
        user.setCredentialsNonExpired(true);
        user.setEmailVerified(false);
        user.setOnline(false);
        return user;
    }
    
    public User createAdminUser(UserServiceModel userServiceModel) {
        User user = createRegularUser(userServiceModel);
        user.setEnabled(true);
        return user;
    }
    
    public User createLockedUser(UserServiceModel userServiceModel) {
        User user = createRegularUser(userServiceModel);
        user.setAccountNonLocked(false);
        return user;
    }
    
    public User createVerifiedUser(UserServiceModel userServiceModel) {
        User user = createRegularUser(userServiceModel);
        user.setEmailVerified(true);
        return user;
    }
}
