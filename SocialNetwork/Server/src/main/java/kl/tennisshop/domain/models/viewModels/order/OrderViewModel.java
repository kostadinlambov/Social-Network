package kl.tennisshop.domain.models.viewModels.order;

import kl.tennisshop.domain.entities.Racket;
import kl.tennisshop.domain.entities.User;

import java.time.LocalDateTime;

public class OrderViewModel {
    private String id;
    private String userId;
    private Racket racketName;
    private Integer racketPrice;
    private LocalDateTime orderedOn;
    private Integer quantity;

    public OrderViewModel() {
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return this.userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Racket getRacketName() {
        return this.racketName;
    }

    public void setRacketName(Racket racketName) {
        this.racketName = racketName;
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

    public Integer getRacketPrice() {
        return this.racketPrice;
    }

    public void setRacketPrice(Integer racketPrice) {
        this.racketPrice = racketPrice;
    }
}
