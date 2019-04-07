package kl.tennisshop.domain.models.viewModels.user;


import java.io.Serializable;

public class UserLoginViewModel implements Serializable {

    private String username;
    private String email;

    public UserLoginViewModel() {
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
