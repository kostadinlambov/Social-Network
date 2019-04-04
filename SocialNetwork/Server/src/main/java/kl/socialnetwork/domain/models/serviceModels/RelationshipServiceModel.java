package kl.socialnetwork.domain.models.serviceModels;

import kl.socialnetwork.domain.entities.User;

import java.io.Serializable;
import java.time.LocalDateTime;

public class RelationshipServiceModel implements Serializable {
    private String id;
    private User userOne;
    private User userTwo;
    private int status;
    private User actionUser;
    private LocalDateTime time;

    public RelationshipServiceModel() {
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getUserOne() {
        return this.userOne;
    }

    public void setUserOne(User userOne) {
        this.userOne = userOne;
    }

    public User getUserTwo() {
        return this.userTwo;
    }

    public void setUserTwo(User userTwo) {
        this.userTwo = userTwo;
    }

    public int getStatus() {
        return this.status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public User getActionUser() {
        return this.actionUser;
    }

    public void setActionUser(User actionUser) {
        this.actionUser = actionUser;
    }

    public LocalDateTime getTime() {
        return this.time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }
}
