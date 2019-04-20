package kl.socialnetwork.domain.entities;

import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@Transactional
public class User extends BaseEntity implements UserDetails {
    private String username;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String address;
    private String city;
    private boolean isDeleted;
    private Set<UserRole> authorities;
    private String profilePicUrl;
    private String backgroundImageUrl;
    private boolean isOnline;

    private List<Relationship> relationshipsUserOne;
    private List<Relationship> relationshipsUserTwo;
    private List<Relationship> relationshipsActionUser;

    private List<Picture> pictureList;
    private List<Like> likeList;

    private List<Post> userPostList;
    private List<Post> userTimelineAllPosts;

    private List<Comment> createdCommentsList;
    private List<Comment> userTimelineAllComments;

    private List<Message> fromUserMessagesList;
    private List<Message> toUserMessagesList;

    private boolean isAccountNonExpired;
    private boolean isAccountNonLocked;
    private boolean isCredentialsNonExpired;
    private boolean isEnabled;

    public User() {
        this.authorities = new HashSet<>();
    }

    @Override
    @Column(nullable = false, name = "username", unique = true, columnDefinition = "VARCHAR(50) BINARY")
    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Column(nullable = false, name = "email", unique = true, columnDefinition = "VARCHAR(50) BINARY")
    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    @Column(nullable = false, name = "password")
    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Column(name = "first_name", nullable = false)
    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @Column(name = "last_name", nullable = false)
    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
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

    @Column(name = "is_deleted", nullable = false , columnDefinition = "BOOLEAN DEFAULT FALSE")
    public boolean isDeleted() {
        return this.isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    @Column(name = "is_online", nullable = false , columnDefinition = "BOOLEAN DEFAULT FALSE")
    public boolean isOnline() {
        return this.isOnline;
    }

    public void setOnline(boolean online) {
        isOnline = online;
    }

    @Column(name="profile_pic_url", columnDefinition = "TEXT")
    public String getProfilePicUrl() {
        return this.profilePicUrl;
    }

    public void setProfilePicUrl(String profilePicUrl) {
        this.profilePicUrl = profilePicUrl;
    }

    @Column(name="background_image_url", columnDefinition = "TEXT")
    public String getBackgroundImageUrl() {
        return this.backgroundImageUrl;
    }

    public void setBackgroundImageUrl(String backgroundImageUrl) {
        this.backgroundImageUrl = backgroundImageUrl;
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

    @OneToMany(mappedBy = "userOne", cascade = CascadeType.ALL)
    public List<Relationship> getRelationshipsUserOne() {
        return this.relationshipsUserOne;
    }

    public void setRelationshipsUserOne(List<Relationship> relationshipsUserOne) {
        this.relationshipsUserOne = relationshipsUserOne;
    }

    @OneToMany(mappedBy = "userTwo", cascade = CascadeType.ALL)
    public List<Relationship> getRelationshipsUserTwo() {
        return this.relationshipsUserTwo;
    }

    public void setRelationshipsUserTwo(List<Relationship> relationshipsUserTwo) {
        this.relationshipsUserTwo = relationshipsUserTwo;
    }

    @OneToMany(mappedBy = "actionUser",  cascade = CascadeType.ALL)
    public List<Relationship> getRelationshipsActionUser() {
        return this.relationshipsActionUser;
    }

    public void setRelationshipsActionUser(List<Relationship> relationshipsActionUser) {
        this.relationshipsActionUser = relationshipsActionUser;
    }

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    public List<Picture> getPictureList() {
        return this.pictureList;
    }

    public void setPictureList(List<Picture> pictureList) {
        this.pictureList = pictureList;
    }

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    public List<Like> getLikeList() {
        return this.likeList;
    }

    public void setLikeList(List<Like> likeList) {
        this.likeList = likeList;
    }

    @OneToMany(mappedBy = "loggedInUser", cascade = CascadeType.ALL)
    public List<Post> getUserPostList() {
        return this.userPostList;
    }

    public void setUserPostList(List<Post> userPostList) {
        this.userPostList = userPostList;
    }

    @OneToMany(mappedBy = "timelineUser", cascade = CascadeType.ALL)
    public List<Post> getUserTimelineAllPosts() {
        return this.userTimelineAllPosts;
    }

    public void setUserTimelineAllPosts(List<Post> userTimelineAllPosts) {
        this.userTimelineAllPosts = userTimelineAllPosts;
    }

    @OneToMany(mappedBy = "creator", cascade = CascadeType.ALL)
    public List<Comment> getCreatedCommentsList() {
        return this.createdCommentsList;
    }

    public void setCreatedCommentsList(List<Comment> createdCommentsList) {
        this.createdCommentsList = createdCommentsList;
    }

    @OneToMany(mappedBy = "timelineUser", cascade = CascadeType.ALL)
    public List<Comment> getUserTimelineAllComments() {
        return this.userTimelineAllComments;
    }

    public void setUserTimelineAllComments(List<Comment> userTimelineAllComments) {
        this.userTimelineAllComments = userTimelineAllComments;
    }

    @OneToMany(mappedBy = "fromUser", cascade = CascadeType.ALL)
    public List<Message> getFromUserMessagesList() {
        return this.fromUserMessagesList;
    }

    public void setFromUserMessagesList(List<Message> fromUserMessagesList) {
        this.fromUserMessagesList = fromUserMessagesList;
    }

    @OneToMany(mappedBy = "toUser", cascade = CascadeType.ALL)
    public List<Message> getToUserMessagesList() {
        return this.toUserMessagesList;
    }

    public void setToUserMessagesList(List<Message> toUserMessagesList) {
        this.toUserMessagesList = toUserMessagesList;
    }

    @Override
    @Column(name = "is_account_non_expired", nullable = false , columnDefinition = "BOOLEAN DEFAULT TRUE")
    public boolean isAccountNonExpired() {
        return true;
    }

    public void setAccountNonExpired(boolean accountNonExpired) {
        isAccountNonExpired = accountNonExpired;
    }

    @Override
    @Column(name = "is_account_non_locked", nullable = false , columnDefinition = "BOOLEAN DEFAULT TRUE")
    public boolean isAccountNonLocked() {
        return true;
    }

    public void setAccountNonLocked(boolean accountNonLocked) {
        isAccountNonLocked = accountNonLocked;
    }

    @Override
    @Column(name = "is_credentials_non_expired", nullable = false , columnDefinition = "BOOLEAN DEFAULT TRUE")
    public boolean isCredentialsNonExpired() {
        return true;
    }

    public void setCredentialsNonExpired(boolean credentialsNonExpired) {
        isCredentialsNonExpired = credentialsNonExpired;
    }

    @Override
    @Column(name = "is_enabled", nullable = false , columnDefinition = "BOOLEAN DEFAULT TRUE")
    public boolean isEnabled() {
        return true;
    }

    public void setEnabled(boolean enabled) {
        isEnabled = enabled;
    }
}
