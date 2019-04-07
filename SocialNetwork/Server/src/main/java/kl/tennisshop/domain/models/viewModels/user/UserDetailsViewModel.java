package kl.tennisshop.domain.models.viewModels.user;

import kl.tennisshop.domain.entities.*;

import java.util.Set;

public class UserDetailsViewModel {
    private String id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String address;
    private String city;

    private Set<UserRole> authorities;
//    private Set<Order> orders;
//    private Set<Payment> payments;
//    private Set<Feedback> feedbackSet;

    // Shopping Cart
//    private Set<Racket> shoppingCartProducts;
//    private Set<Racket> boughtProducts;

    public UserDetailsViewModel() {
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
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

    public Set<UserRole> getAuthorities() {
        return this.authorities;
    }

    public void setAuthorities(Set<UserRole> authorities) {
        this.authorities = authorities;
    }

//    public Set<Order> getOrders() {
//        return this.orders;
//    }
//
//    public void setOrders(Set<Order> orders) {
//        this.orders = orders;
//    }
//
//    public Set<Payment> getPayments() {
//        return this.payments;
//    }
//
//    public void setPayments(Set<Payment> payments) {
//        this.payments = payments;
//    }
//
//    public Set<Feedback> getFeedbackSet() {
//        return this.feedbackSet;
//    }
//
//    public void setFeedbackSet(Set<Feedback> feedbackSet) {
//        this.feedbackSet = feedbackSet;
//    }
//
//    public Set<Racket> getShoppingCartProducts() {
//        return this.shoppingCartProducts;
//    }
//
//    public void setShoppingCartProducts(Set<Racket> shoppingCartProducts) {
//        this.shoppingCartProducts = shoppingCartProducts;
//    }
//
//    public Set<Racket> getBoughtProducts() {
//        return this.boughtProducts;
//    }
//
//    public void setBoughtProducts(Set<Racket> boughtProducts) {
//        this.boughtProducts = boughtProducts;
//    }
}
