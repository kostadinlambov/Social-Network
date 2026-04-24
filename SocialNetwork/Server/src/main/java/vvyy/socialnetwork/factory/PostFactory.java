package vvyy.socialnetwork.factory;

import vvyy.socialnetwork.domain.entities.Post;
import vvyy.socialnetwork.domain.entities.User;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;

/**
 * Factory Pattern Implementation for Post Creation
 * Module: SOCIAL INTERACTION (Posts, Comments, Likes)
 * 
 * Responsibility: Create different types of Post entities
 * 
 * SOLID Principles Applied:
 * - SRP: Only creates posts, no other responsibilities
 * - OCP: New post types don't modify existing methods
 * - DIP: Abstracts post creation logic
 * 
 * Usage:
 *   Post post = postFactory.createTextPost("Hello!", author);
 *   Post repost = postFactory.createRepost(originalPost, resharer, "check this");
 */
@Component
public class PostFactory {
    
    /**
     * Create a regular text post
     * SOLID: OCP - extensible for different post types
     */
    public Post createTextPost(String content, User author) {
        Post post = new Post();
        post.setContent(content);
        post.setLoggedInUser(author);
        post.setTimelineUser(author);
        post.setTime(LocalDateTime.now());
        return post;
    }
    
    /**
     * Create a post with image reference
     * SOLID: OCP - different post variations
     */
    public Post createPostWithImage(String content, User author, String imageUrl) {
        Post post = createTextPost(content, author);
        post.setImageUrl(imageUrl);
        return post;
    }
    
    /**
     * Create a repost (shared/reshared post)
     * SOLID: OCP - factory handles various post types
     */
    public Post createRepost(Post originalPost, User resharer, String caption) {
        Post repost = new Post();
        repost.setContent("Reposted: " + caption + "\n---\n" + originalPost.getContent());
        repost.setLoggedInUser(resharer);
        repost.setTimelineUser(resharer);
        repost.setTime(LocalDateTime.now());
        return repost;
    }
    
    /**
     * Create a quote post (similar to repost but with modifications)
     * SOLID: OCP - another post variation
     */
    public Post createQuotePost(String quote, User author) {
        Post post = new Post();
        post.setContent("\"" + quote + "\"");
        post.setLoggedInUser(author);
        post.setTimelineUser(author);
        post.setTime(LocalDateTime.now());
        return post;
    }
}
