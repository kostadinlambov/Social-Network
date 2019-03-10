package kl.socialnetwork.domain.entities;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "likes")
public class Like extends BaseEntity {

    private Long count = 0L;
    private Set<User> users;

    public Like() {
    }

    @Column(name = "count")
    public Long getCount() {
        return this.count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

//    @OneToOne ?????
    @ManyToOne(optional = false, targetEntity = User.class)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    public Set<User> getUsers() {
        return this.users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }
}
