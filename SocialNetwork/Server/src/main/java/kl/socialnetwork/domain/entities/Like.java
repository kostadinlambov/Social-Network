package kl.socialnetwork.domain.entities;

import javax.persistence.*;

@Entity
@Table(name = "likes")
public class Like extends BaseEntity {
    private Long count = 0L;
    private User user;
    private Post post;

    public Like() {
    }

    @Column(name = "count")
    public Long getCount() {
        return this.count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name= "user_id", referencedColumnName = "id")
    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @ManyToOne(targetEntity = Post.class)
    @JoinColumn(name= "post_id", referencedColumnName = "id")
    public Post getPost() {
        return this.post;
    }

    public void setPost(Post post) {
        this.post = post;
    }
}
