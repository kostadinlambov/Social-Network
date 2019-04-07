package kl.tennisshop.domain.models.serviceModels;

import kl.tennisshop.domain.entities.Racket;
import kl.tennisshop.domain.entities.User;

import java.time.LocalDateTime;
import java.util.Set;

public class OrderServiceModel {
    private String id;
    private User user;
    private Racket racket;
    private LocalDateTime orderedOn;
    private Integer quantity;

    public OrderServiceModel() {
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Racket getRacket() {
        return this.racket;
    }

    public void setRacket(Racket racket) {
        this.racket = racket;
    }

    public LocalDateTime getOrderedOn() {
        return this.orderedOn;
    }

    public void setOrderedOn(LocalDateTime orderedOn) {
        this.orderedOn = orderedOn;
    }

    public Integer getQuantity() {
        return this.quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
