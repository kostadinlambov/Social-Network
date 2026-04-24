package vvyy.socialnetwork.builder;

import vvyy.socialnetwork.domain.entities.Post;
import vvyy.socialnetwork.domain.entities.User;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;

/**
 * Builder Pattern Implementation for Complex Post Objects
 * Module: SOCIAL INTERACTION (Posts, Comments, Likes)
 * 
 * Responsibility: Construct Post objects with optional fields
 * 
 * SOLID Principles Applied:
 * - SRP: Only builds posts, no other responsibilities
 * - ISP: Provides specific interface for post building
 * - OCP: New post configurations don't modify this class
 * 
 * Usage:
 *   Post post = postBuilder
 *       .withContent("Hello World")
 *       .withAuthor(user)
 *       .public_()
 *       .build();
 */
@Component
public class PostBuilder {
    
    private String id;
    private String content;
    private User loggedInUser;
    private User timelineUser;
    private LocalDateTime time = LocalDateTime.now();
    private String imageUrl;
    private String visibility = "PUBLIC"; // PUBLIC, PRIVATE, FRIENDS_ONLY
    private boolean isEdited = false;
    
    public PostBuilder withId(String id) {
        this.id = id;
        return this;
    }
    
    public PostBuilder withContent(String content) {
        this.content = content;
        return this;
    }
    
    public PostBuilder withLoggedInUser(User loggedInUser) {
        this.loggedInUser = loggedInUser;
        return this;
    }
    
    public PostBuilder withTimelineUser(User timelineUser) {
        this.timelineUser = timelineUser;
        return this;
    }
    
    public PostBuilder withAuthor(User user) {
        this.loggedInUser = user;
        this.timelineUser = user;
        return this;
    }
    
    public PostBuilder withCreatedAt(LocalDateTime time) {
        this.time = time;
        return this;
    }
    
    public PostBuilder withImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
        return this;
    }
    
    public PostBuilder withVisibility(String visibility) {
        this.visibility = visibility;
        return this;
    }
    
    public PostBuilder public_() {
        this.visibility = "PUBLIC";
        return this;
    }
    
    public PostBuilder private_() {
        this.visibility = "PRIVATE";
        return this;
    }
    
    public PostBuilder friendsOnly() {
        this.visibility = "FRIENDS_ONLY";
        return this;
    }
    
    public PostBuilder edited() {
        this.isEdited = true;
        this.time = LocalDateTime.now();
        return this;
    }
    
    /**
     * Build the Post object
     * SOLID: SRP - only assembles the object
     */
    public Post build() {
        Post post = new Post();
        post.setId(id);
        post.setContent(content);
        post.setLoggedInUser(loggedInUser);
        post.setTimelineUser(timelineUser);
        post.setTime(time);
        post.setImageUrl(imageUrl);
        return post;
    }
    
    /**
     * Reset builder for reuse
     * SOLID: SRP - manages builder state
     */
    public PostBuilder reset() {
        this.id = null;
        this.content = null;
        this.loggedInUser = null;
        this.timelineUser = null;
        this.time = LocalDateTime.now();
        this.imageUrl = null;
        this.visibility = "PUBLIC";
        this.isEdited = false;
        return this;
    }
}
