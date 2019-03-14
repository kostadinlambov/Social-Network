package kl.socialnetwork.domain.entities;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
public class Message extends BaseEntity{

    private User fromUser;
    private User toUser;
    private Relationship relationship;
    private String subject;
    private String content;
    private int status;
    private LocalDateTime time;

    public Message() {
    }

    @ManyToOne(optional = false, targetEntity = User.class)
    @JoinColumn(name = "from_user_id", referencedColumnName = "id")
    public User getFromUser() {
        return this.fromUser;
    }

    public void setFromUser(User fromUser) {
        this.fromUser = fromUser;
    }

    @ManyToOne(optional = false, targetEntity = User.class)
    @JoinColumn(name = "to_user_id", referencedColumnName = "id")
    public User getToUser() {
        return this.toUser;
    }

    public void setToUser(User toUser) {
        this.toUser = toUser;
    }

    @ManyToOne(optional = false, targetEntity = Relationship.class)
    @JoinColumn(name = "relationship_id", referencedColumnName = "id")
    public Relationship getRelationship() {
        return this.relationship;
    }

    public void setRelationship(Relationship relationship) {
        this.relationship = relationship;
    }

    @Column(name = "subject", nullable = false)
    public String getSubject() {
        return this.subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Column(name = "status", columnDefinition = "TINYINT DEFAULT 0", nullable = false)
    public int getStatus() {
        return this.status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    @Column(name = "time", nullable = false)
    public LocalDateTime getTime() {
        return this.time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }
}
