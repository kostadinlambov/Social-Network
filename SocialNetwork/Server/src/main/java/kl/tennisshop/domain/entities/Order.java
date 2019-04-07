package kl.tennisshop.domain.entities;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "orders")
public class Order  extends BaseEntity {
    private User user;
    private Racket racket;
    private LocalDateTime orderedOn;
//    private Payment payment;
    private Integer quantity;
//    private BigDecimal price;
//    private BigDecimal totalPrice;
//    private Boolean status;
//    private String imageUrl;


    public Order() {

    }

    public Order(User user) {
        this.user = user;
        this.orderedOn = LocalDateTime.now();
//        this.payment = payment;
    }

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name= "user_id")
    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinColumn(name= "racket_id")
    public Racket getRacket() {
        return this.racket;
    }

    public void setRacket(Racket racket) {
        this.racket = racket;
    }


    //    @ManyToMany
//    @JoinTable(name = "orders_rackets",
//    joinColumns =
//            @JoinColumn(name = "order_id", referencedColumnName = "id"),
//    inverseJoinColumns =
//    @JoinColumn(name = "racket_id", referencedColumnName = "id"))
//    public Racket getRackets() {
//        return this.rackets;
//    }

//    public void setRackets(Racket rackets) {
//        this.rackets = rackets;
//    }

    // BiDirectional
//    @OneToOne(optional = false, cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
////    @JoinColumn(name = "payment_id")
//    public Payment getPayment() {
//        return this.payment;
//    }
//
//    public void setPayment(Payment payment) {
//        this.payment = payment;
//    }

    @Column(name = "ordered_on", nullable = false)
    public LocalDateTime getOrderedOn() {
        return this.orderedOn;
    }

    public void setOrderedOn(LocalDateTime orderedOn) {
        this.orderedOn = orderedOn;
    }

    @Column(name = "quantity", nullable = false)
    public Integer getQuantity() {
        return this.quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
