package kl.socialnetwork.testUtils;

import kl.socialnetwork.domain.entities.User;
import kl.socialnetwork.domain.entities.UserRole;
import kl.socialnetwork.domain.modles.bindingModels.user.UserRegisterBindingModel;
import kl.socialnetwork.domain.modles.serviceModels.UserServiceModel;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class UsersUtils {


    public static User createUser() {
        return new User() {{
            setId("1");
            setPassword("1111");
            setFirstName("Pesho");
            setLastName("Peshov");
            setUsername("pesho");
            setEmail("pesho@abv.bg");
            setCity("Sofia");
            setAddress("Vasil Levski 1");
            setProfilePicUrl("profilePic");
            setBackgroundImageUrl("backgroundPic");
        }};
    }

    public static List<User> getUsers(int count) {
        return IntStream.range(0, count)
                .mapToObj(index -> new User() {{
                    setId(String.valueOf(index + 1));
                    setPassword("1111");
                    setFirstName("Pesho " + index);
                    setLastName("Peshov " + index);
                    setUsername("pesho " + index);
                    setEmail("pesho " + index + " @abv.bg");
                    setCity("Sofia");
                    setAddress("Vasil Levski 1");
                    setProfilePicUrl("profilePic " + index);
                    setBackgroundImageUrl("backgroundPic " + index);
                }})
                .collect(Collectors.toList());
    }

    public static List<UserServiceModel> getUserServiceModels(int count, User loggedInUser, User timeLineUser, UserRole role) {
        LocalDateTime time = LocalDateTime.now();

        return IntStream.range(0, count)
                .mapToObj(index -> new UserServiceModel() {{
                    setId(String.valueOf(index + 1));
                    setPassword("1111");
                    setFirstName("Pesho " + index);
                    setLastName("Peshov " + index);
                    setUsername("pesho " + index);
                    setEmail("pesho " + index + " @abv.bg");
                    setCity("Sofia");
                    setAddress("Vasil Levski 1");
                    setProfilePicUrl("profilePic " + index);
                    setBackgroundImageUrl("backgroundPic " + index);
                    setAuthorities(new HashSet<>(Arrays.asList(role)));
                }})
                .collect(Collectors.toList());
    }

    public static UserRegisterBindingModel getUserRegisterBindingModel() {
        return new UserRegisterBindingModel() {{
            setPassword("1111");
            setConfirmPassword("1111");
            setFirstName("Pesho");
            setLastName("Peshov");
            setUsername("pesho");
            setEmail("pesho@abv.bg");
            setCity("Sofia");
            setAddress("Vasil Levski 1");
            setProfilePicUrl("profilePic");
            setBackgroundImageUrl("backgroundPic");
        }};
    }
}

