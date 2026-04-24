package vvyy.socialnetwork.factory;

import vvyy.socialnetwork.domain.entities.Picture;
import vvyy.socialnetwork.domain.entities.User;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;

/**
 * Factory Pattern Implementation for Picture Objects
 * Module: MEDIA & STORAGE
 * 
 * Responsibility: Encapsulate picture object creation with different variations
 * 
 * SOLID Principles Applied:
 * - SRP: Only creates picture objects, no other responsibilities
 * - OCP: New picture types don't modify this factory
 * - DIP: Depends on Picture abstraction, not concrete implementations
 * 
 * Usage:
 *   Picture profile = pictureFactory.createProfilePicture(user, imageUrl);
 *   Picture background = pictureFactory.createBackgroundPicture(user, imageUrl);
 *   Picture gallery = pictureFactory.createGalleryPicture(user, imageUrl);
 */
@Component
public class PictureFactory {
    
    /**
     * Create a profile picture
     * Profile pictures: Primary image representing user on profile page
     * SOLID: SRP - responsible only for creation
     */
    public Picture createProfilePicture(User user, String imageUrl) {
        Picture picture = new Picture();
        picture.setImageUrl(imageUrl);
        picture.setUser(user);
        picture.setTime(LocalDateTime.now());
        picture.setDescription("User profile picture");
        return picture;
    }
    
    /**
     * Create a background picture
     * Background pictures: Cover photo for user timeline/profile header
     * SOLID: SRP - responsible only for creation
     */
    public Picture createBackgroundPicture(User user, String imageUrl) {
        Picture picture = new Picture();
        picture.setImageUrl(imageUrl);
        picture.setUser(user);
        picture.setTime(LocalDateTime.now());
        picture.setDescription("User background/cover photo");
        return picture;
    }
    
    /**
     * Create a gallery picture
     * Gallery pictures: User-uploaded images in album galleries
     * SOLID: SRP - responsible only for creation
     */
    public Picture createGalleryPicture(User user, String imageUrl, String albumName) {
        Picture picture = new Picture();
        picture.setImageUrl(imageUrl);
        picture.setUser(user);
        picture.setTime(LocalDateTime.now());
        picture.setDescription("Gallery image: " + albumName);
        return picture;
    }
    
    /**
     * Create a system/default picture
     * For placeholder images and system-generated pictures
     * SOLID: SRP - responsible only for creation
     */
    public Picture createSystemPicture(String imageUrl, String description) {
        Picture picture = new Picture();
        picture.setImageUrl(imageUrl);
        picture.setTime(LocalDateTime.now());
        picture.setDescription(description);
        return picture;
    }
}
