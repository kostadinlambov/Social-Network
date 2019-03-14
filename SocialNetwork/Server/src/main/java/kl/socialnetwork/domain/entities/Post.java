package kl.socialnetwork.domain.entities;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "posts")
public class Post extends BaseEntity {
    private User user;
    private String content;
    private String imageUrl;
    private LocalDateTime time;
    private List<Like> like;

    public Post() {
    }

    @ManyToOne(optional = false, targetEntity = User.class)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Column(name = "image_url", nullable = true)
    public String getImageUrl() {
        return this.imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @OneToMany(targetEntity = Like.class, mappedBy = "post", cascade = CascadeType.ALL)
    public List<Like> getLike() {
        return this.like;
    }

    public void setLike(List<Like> like) {
        this.like = like;
    }

    //    @OneToOne(optional = false)
//    @JoinColumn(name = "like_id")
//    public Like getLike() {
//        return this.like;
//    }
//
//    public void setLike(Like like) {
//        this.like = like;
//    }

    @Column(name = "time", nullable = false)
    public LocalDateTime getTime() {
        return this.time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }
}
