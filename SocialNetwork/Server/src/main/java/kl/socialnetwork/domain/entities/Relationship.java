package kl.socialnetwork.domain.entities;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "relationship")
public class Relationship extends BaseEntity {
    private User userOne;
    private User userTwo;
    private int status;
    private User actionUser;
    private LocalDateTime time;
    private List<Message> messageList;

    public Relationship() {
    }

    @ManyToOne(optional = false, targetEntity = User.class)
    @JoinColumn(name = "user_one_id", referencedColumnName = "id" )
    public User getUserOne() {
        return this.userOne;
    }

    public void setUserOne(User userOne) {
        this.userOne = userOne;
    }

    @ManyToOne(optional = false, targetEntity = User.class)
    @JoinColumn(name = "user_two_id", referencedColumnName = "id")
    public User getUserTwo() {
        return this.userTwo;
    }

    public void setUserTwo(User userTwo) {
        this.userTwo = userTwo;
    }

    @Column(name = "status", columnDefinition = "TINYINT DEFAULT 0", nullable = false)
    public int getStatus() {
        return this.status;
    }

    public int setStatus(int status) {
       return this.status = status;
    }

    @ManyToOne(optional = false, targetEntity = User.class)
    @JoinColumn(name = "action_user_id", referencedColumnName = "id")
    public User getActionUser() {
        return this.actionUser;
    }

    public void setActionUser(User actionUser) {
        this.actionUser = actionUser;
    }

    @Column(name = "time", nullable = false)
    public LocalDateTime getTime() {
        return this.time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    @OneToMany(mappedBy = "relationship", targetEntity = Message.class, cascade = CascadeType.ALL)
    public List<Message> getMessageList() {
        return this.messageList;
    }

    public void setMessageList(List<Message> messageList) {
        this.messageList = messageList;
    }
}
