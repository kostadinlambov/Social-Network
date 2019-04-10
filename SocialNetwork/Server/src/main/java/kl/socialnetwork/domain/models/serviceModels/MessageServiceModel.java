package kl.socialnetwork.domain.models.serviceModels;

import kl.socialnetwork.domain.entities.Relationship;
import kl.socialnetwork.domain.entities.User;

import java.time.LocalDateTime;

public class MessageServiceModel {
    private String id;
    private User fromUser;
    private User toUser;
    private Relationship relationship;
    private String subject;
    private String content;
    private int status;
    private LocalDateTime time;

    public MessageServiceModel() {
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getFromUser() {
        return this.fromUser;
    }

    public void setFromUser(User fromUser) {
        this.fromUser = fromUser;
    }

    public User getToUser() {
        return this.toUser;
    }

    public void setToUser(User toUser) {
        this.toUser = toUser;
    }

    public Relationship getRelationship() {
        return this.relationship;
    }

    public void setRelationship(Relationship relationship) {
        this.relationship = relationship;
    }

    public String getSubject() {
        return this.subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getStatus() {
        return this.status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public LocalDateTime getTime() {
        return this.time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }
}
