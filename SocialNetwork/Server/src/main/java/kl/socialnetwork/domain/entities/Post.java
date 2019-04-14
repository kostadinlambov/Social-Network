package kl.socialnetwork.domain.entities;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "posts")
public class Post extends BaseEntity {
    private User loggedInUser;
    private User timelineUser;
    private String content;
    private String imageUrl;
    private LocalDateTime time;
    private List<Like> like;
    private List<Comment> commentList;

    public Post() {
    }

    @ManyToOne(optional = false, targetEntity = User.class)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    public User getLoggedInUser() {
        return this.loggedInUser;
    }

    public void setLoggedInUser(User loggedInUser) {
        this.loggedInUser = loggedInUser;
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

    @OneToMany(targetEntity = Comment.class, mappedBy = "post", cascade = CascadeType.ALL)
    public List<Comment> getCommentList() {
        return this.commentList;
    }

    public void setCommentList(List<Comment> commentList) {
        this.commentList = commentList;
    }

    @Column(name = "time", nullable = false)
    public LocalDateTime getTime() {
        return this.time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }
}
