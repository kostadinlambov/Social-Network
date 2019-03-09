package kl.socialnetwork.domain.modles.serviceModels;

import kl.socialnetwork.domain.entities.User;

import java.time.LocalDateTime;

public class PictureServiceModel {
    private String id;
    private String description;
    private User user;
    private String imageUrl;
    private LocalDateTime time;

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public PictureServiceModel() {
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getImageUrl() {
        return this.imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public LocalDateTime getTime() {
        return this.time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }
}
