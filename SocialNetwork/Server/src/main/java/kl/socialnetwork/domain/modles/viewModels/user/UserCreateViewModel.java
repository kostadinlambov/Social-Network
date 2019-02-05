package kl.socialnetwork.domain.modles.viewModels.user;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.HashSet;
import java.util.Set;

public class UserCreateViewModel {
    private String id;
    private String username;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String address;
    private String city;

//    private Set<String> roleName;

//    @JsonIgnore
    private Set<String> roles;
//
//    private Set<Order> orders;
//    private Set<Payment> payments;
//    private Set<Feedback> feedbackSet;

    // Shopping Cart
//    @JsonIgnore
//    private Set<Racket> shoppingCartProducts;
//    @JsonIgnore
//    private Set<Racket> boughtProducts;

    public UserCreateViewModel() {
//        this.roleName = new HashSet<>();
        this.roles = new HashSet<>();
//        this.orders = new HashSet<>();
//        this.payments = new HashSet<>();
//        this.feedbackSet = new HashSet<>();
    }

//    public Set<String> getRoleName() {
//        return this.roleName;
//    }
//
//    public void setRoleName(Set<String> rolesName) {
//        this.roleName = rolesName;
//    }


    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return this.city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Set<String> getRoles() {
        return this.roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }
}
