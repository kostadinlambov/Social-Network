package vvyy.socialnetwork.builder;

import vvyy.socialnetwork.domain.entities.User;
import vvyy.socialnetwork.domain.entities.UserRole;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

/**
 * Builder Pattern Implementation for Complex User Objects
 * Module: ACCOUNT & AUTHENTICATION
 * 
 * Responsibility: Construct User objects step-by-step with optional fields
 * 
 * SOLID Principles Applied:
 * - SRP: Only builds users, no other responsibilities
 * - OCP: New user variations don't modify existing code
 * - ISP: Provides specific interface for user building
 * 
 * Usage:
 *   User user = userBuilder
 *       .withUsername("john")
 *       .withEmail("john@pesu.pes.edu")
 *       .withFirstName("John")
 *       .online()
 *       .emailVerified()
 *       .build();
 */
@Component
public class UserBuilder {
    
    private String id;
    private String username;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String address;
    private String city;
    private String profilePicUrl;
    private String backgroundImageUrl;
    private boolean isOnline = false;
    private boolean isEmailVerified = false;
    private Set<UserRole> authorities = new HashSet<>();
    
    // Fluent builder methods
    public UserBuilder withId(String id) {
        this.id = id;
        return this;
    }
    
    public UserBuilder withUsername(String username) {
        this.username = username;
        return this;
    }
    
    public UserBuilder withEmail(String email) {
        this.email = email;
        return this;
    }
    
    public UserBuilder withPassword(String password) {
        this.password = password;
        return this;
    }
    
    public UserBuilder withFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }
    
    public UserBuilder withLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }
    
    public UserBuilder withAddress(String address) {
        this.address = address;
        return this;
    }
    
    public UserBuilder withCity(String city) {
        this.city = city;
        return this;
    }
    
    public UserBuilder withProfilePicUrl(String profilePicUrl) {
        this.profilePicUrl = profilePicUrl;
        return this;
    }
    
    public UserBuilder withBackgroundImageUrl(String backgroundImageUrl) {
        this.backgroundImageUrl = backgroundImageUrl;
        return this;
    }
    
    public UserBuilder online() {
        this.isOnline = true;
        return this;
    }
    
    public UserBuilder offline() {
        this.isOnline = false;
        return this;
    }
    
    public UserBuilder emailVerified() {
        this.isEmailVerified = true;
        return this;
    }
    
    public UserBuilder withAuthorities(Set<UserRole> authorities) {
        this.authorities = authorities;
        return this;
    }
    
    /**
     * Build the User object
     * SOLID: SRP - only assembles the object
     */
    public User build() {
        User user = new User();
        user.setId(id);
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(password);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setAddress(address);
        user.setCity(city);
        user.setProfilePicUrl(profilePicUrl);
        user.setBackgroundImageUrl(backgroundImageUrl);
        user.setOnline(isOnline);
        user.setEmailVerified(isEmailVerified);
        user.setAuthorities(authorities);
        return user;
    }
    
    /**
     * Reset builder for reuse
     * SOLID: SRP - manages builder state
     */
    public UserBuilder reset() {
        this.id = null;
        this.username = null;
        this.email = null;
        this.password = null;
        this.firstName = null;
        this.lastName = null;
        this.address = null;
        this.city = null;
        this.profilePicUrl = null;
        this.backgroundImageUrl = null;
        this.isOnline = false;
        this.isEmailVerified = false;
        this.authorities = new HashSet<>();
        return this;
    }
}
