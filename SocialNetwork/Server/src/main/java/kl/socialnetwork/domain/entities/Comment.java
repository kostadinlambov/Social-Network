package kl.socialnetwork.domain.entities;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
public class Comment extends BaseEntity {
    private Post post;
    private User creator;
    private User timelineUser;
    private String content;
    private LocalDateTime time;
    private String imageUrl;

    public Comment() {
    }

    @ManyToOne(optional = false, targetEntity = Post.class)
    @JoinColumn(name = "post_id", referencedColumnName = "id")
    public Post getPost() {
        return this.post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    @ManyToOne(optional = false, targetEntity = User.class)
    @JoinColumn(name = "creator_id", referencedColumnName = "id")
    public User getCreator() {
        return this.creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    @ManyToOne(optional = false, targetEntity = User.class)
    @JoinColumn(name = "timeline_user_id", referencedColumnName = "id")
    public User getTimelineUser() {
        return this.timelineUser;
    }

    public void setTimelineUser(User timelineUser) {
        this.timelineUser = timelineUser;
    }

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Column(name = "time", nullable = false)
    public LocalDateTime getTime() {
        return this.time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    @Column(name = "image_url", nullable = true)
    public String getImageUrl() {
        return this.imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
