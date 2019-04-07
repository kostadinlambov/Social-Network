package kl.tennisshop.domain.entities;

import kl.tennisshop.validations.Password;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.validator.constraints.UniqueElements;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.transaction.Transactional;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@Transactional
public class User  extends BaseEntity implements UserDetails  {
    private static final String INVALID_EMAIL_MESSAGE = "Invalid e-mail address.";
    private static final String INVALID_USERNAME_MESSAGE = "Username should be at least 4 and maximum 16 characters long.";
    private static final String INVALID_FIRST_NAME_MESSAGE = "First Name must start with a capital letter and must contain only letters.";
    private static final String INVALID_LAST_NAME_MESSAGE = "Last Name must start with a capital letter and must contain only letters.";

    private String username;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String address;
    private String city;


    private boolean isAccountNonExpired;

    private boolean isAccountNonLocked;

    private boolean isCredentialsNonExpired;

    private boolean isEnabled;

    private Set<UserRole> authorities;
    private Boolean deleted = false;

    private Set<Order> orders;
    private Set<Payment> payments;
    private Set<Feedback> feedbackSet;

    // Shopping Cart
    private List<Racket> shoppingCartProducts;
//    private Set<Racket> boughtProducts;

//    private byte[] profilePicture;
//    private LocalDateTime registeredOn;
//    private LocalDateTime lastTimeLoggedIn;

    public User() {
        this.authorities = new HashSet<>();
        this.orders = new HashSet<>();
        this.payments = new HashSet<>();
        this.feedbackSet = new HashSet<>();
    }

    @Override
//    @Pattern(regexp = "^([a-zA-Z0-9]+)$")
//    @Size(min = 4, max = 16, message = INVALID_USERNAME_MESSAGE)
    @Column(nullable = false, name = "username", unique = true, columnDefinition = "VARCHAR(50) BINARY")
    public String getUsername() {
        return this.username;
    }

    public void setUsername(String userName) {
        this.username = userName;
    }

//    @Pattern(regexp = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$",message = INVALID_EMAIL_MESSAGE)
    @Column(nullable = false, name = "email", unique = true, columnDefinition = "VARCHAR(50) BINARY")
    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    public Set<Order> getOrders() {
        return this.orders;
    }

    public void setOrders(Set<Order> orders) {
        this.orders = orders;
    }

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    public Set<Payment> getPayments() {
        return this.payments;
    }

    public void setPayments(Set<Payment> payments) {
        this.payments = payments;
    }

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.MERGE, targetEntity = Feedback.class)
    public Set<Feedback> getFeedbackSet() {
        return this.feedbackSet;
    }

    public void setFeedbackSet(Set<Feedback> feedbackSet) {
        this.feedbackSet = feedbackSet;
    }

    @Override
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinTable(name="users_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    public Set<UserRole> getAuthorities() {
        return this.authorities;
    }

    public void setAuthorities(Set<UserRole> authorities) {
        this.authorities = authorities;
    }

//    @Password(minLength = 4, maxLength = 16, containsOnlyLettersAndDigits = true)
    @Column(nullable = false, name = "password")
    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

//    @Pattern(regexp = "^[A-Z]([a-zA-Z]+)?$", message = INVALID_FIRST_NAME_MESSAGE)
    @Column(name = "first_name", nullable = false)
    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

//    @Pattern(regexp = "^[A-Z]([a-zA-Z]+)?$", message = INVALID_LAST_NAME_MESSAGE)
    @Column(name = "last_name", nullable = false)
    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Column(name = "deleted", nullable = false , columnDefinition = "BOOLEAN DEFAULT FALSE")
    public Boolean getDeleted() {
        return this.deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }



    @Column(name = "address", nullable = false)
    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Column(name = "city", nullable = false)
    public String getCity() {
        return this.city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void setAccountNonExpired(boolean accountNonExpired) {
        isAccountNonExpired = accountNonExpired;
    }

    public void setAccountNonLocked(boolean accountNonLocked) {
        isAccountNonLocked = accountNonLocked;
    }

    public void setCredentialsNonExpired(boolean credentialsNonExpired) {
        isCredentialsNonExpired = credentialsNonExpired;
    }

    public void setEnabled(boolean enabled) {
        isEnabled = enabled;
    }


    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "shopping_cart",referencedColumnName = "id")
    public List<Racket> getShoppingCartProducts() {
        return this.shoppingCartProducts;
    }

    public void setShoppingCartProducts(List<Racket> shoppingCartProducts) {
        this.shoppingCartProducts = shoppingCartProducts;
    }

//    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
//    @JoinColumn(name = "bought_products",referencedColumnName = "id")
//    public Set<Racket> getBoughtProducts() {
//        return this.boughtProducts;
//    }
//
//    public void setBoughtProducts(Set<Racket> boughtProducts) {
//        this.boughtProducts = boughtProducts;
//    }

    //    @Transient
//    public String getConfirmPassword() {
//        return this.confirmPassword;
//    }
//
//    public void setConfirmPassword(String confirmPassword) {
//        this.confirmPassword = confirmPassword;
//    }


//    @Column(name = "profile_picture", columnDefinition = "LONGBLOB")
//    public byte[] getProfilePicture() {
//        return this.profilePicture;
//    }
//
//    public void setProfilePicture(byte[] profilePicture) {
//        // Check if picture size > 1MB
//        if (profilePicture.length > 1024 * 1024) {
//            throw new IllegalArgumentException("Picture is too big.");
//        }
//        this.profilePicture = profilePicture;
//    }


}
