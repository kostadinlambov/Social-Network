package kl.tennisshop.domain.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
//@Table(name = "categories")
@Table(name = "categories", uniqueConstraints = {@UniqueConstraint(columnNames = {"id"})})
//@JsonIdentityInfo(generator= ObjectIdGenerators.IntSequenceGenerator.class)
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
//@DynamicUpdate
public class Category  extends BaseEntity {
    private String name;
    private Boolean deleted = false;

    private Set<Racket> rackets;



    public Category() {
        this.rackets = new HashSet<>();
    }

    public Category(String name) {
        this.rackets = new HashSet<>();
        this.name = name;
    }

    public Category(String name, Set<Racket> rackets) {
        this.rackets = new HashSet<>();
        this.name = name;
        this.rackets = rackets;
    }

    @Column(name = "name", nullable = false)
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "deleted", nullable = false , columnDefinition = "BOOLEAN DEFAULT FALSE")
    public Boolean getDeleted() {
        return this.deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    @OneToMany(mappedBy = "category", targetEntity = Racket.class,
            cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JsonManagedReference
    public Set<Racket> getRackets() {
        return this.rackets;
    }

    public void setRackets(Set<Racket> rackets) {
        this.rackets = rackets;
    }
}
