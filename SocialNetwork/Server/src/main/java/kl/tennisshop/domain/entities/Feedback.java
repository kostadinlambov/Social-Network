package kl.tennisshop.domain.entities;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name = "feedbacks")
public class Feedback   extends BaseEntity{
    private String content;
    private User user;
    private Racket racket;

    public Feedback() {
    }

    public Feedback(String content, User user, Racket racket) {
        this.content = content;
        this.user = user;
        this.racket = racket;
    }

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
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
}
