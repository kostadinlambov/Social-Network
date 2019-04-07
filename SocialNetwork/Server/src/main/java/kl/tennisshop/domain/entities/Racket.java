package kl.tennisshop.domain.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Entity
//@Table(name = "rackets")
@Table(name = "rackets", uniqueConstraints = {@UniqueConstraint(columnNames = {"id"})})
//@JsonIdentityInfo(generator= ObjectIdGenerators.IntSequenceGenerator.class)
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Racket   extends BaseEntity{
    private String name;
    private String description;
    private BigDecimal price;
    private BigDecimal headSize;
    private BigDecimal weight;
    private String stringPattern;
    private String mainImageUrl;
    private String secondImageUrl;
    private String thirdImageUrl;
    private Category category;
//    private Set<Order> orders;
//    private Order order;
    private Set<Feedback> feedbackSet;

    private Boolean deleted = false;

//    @Column(name = "quantity", nullable = false)
//    private Integer quantity;

//    @Column(name = "size", nullable = false)
//    private Float size;


    public Racket() {
        this.feedbackSet = new HashSet<>();
    }


    public Racket(String name, String description, BigDecimal price, BigDecimal headSize, BigDecimal weight, String stringPattern, String mainImageUrl, Category category) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.headSize = headSize;
        this.weight = weight;
        this.stringPattern = stringPattern;
        this.mainImageUrl = mainImageUrl;
        this.category = category;
//        this.orders = orders;
//        this.feedbackSet = feedbackSet;
        this.feedbackSet = new HashSet<>();
    }

    public Racket(String name, String description, BigDecimal price, BigDecimal headSize, BigDecimal weight, String stringPattern, String mainImageUrl, String secondImageUrl, String thirdImageUrl, Category category) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.headSize = headSize;
        this.weight = weight;
        this.stringPattern = stringPattern;
        this.mainImageUrl = mainImageUrl;
        this.secondImageUrl = secondImageUrl;
        this.thirdImageUrl = thirdImageUrl;
        this.category = category;
//        this.orders = orders;
//        this.feedbackSet = feedbackSet;
        this.feedbackSet = new HashSet<>();
    }

//    @OneToMany(targetEntity = Order.class, mappedBy = "racket", fetch = FetchType.EAGER)
//    public Set<Order> getOrders() {
//        return this.orders;
//    }

//    public void setOrders(Set<Order> orders) {
//        this.orders = orders;
//    }


    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Column(name = "price", nullable = false, precision = 10, scale = 2)
    public BigDecimal getPrice() {
        return this.price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    @Column(name = "main_image_url", nullable = false)
    public String getMainImageUrl() {
        return this.mainImageUrl;
    }

    public void setMainImageUrl(String mainImageUrl) {
        this.mainImageUrl = mainImageUrl;
    }

    @Column(name = "second_image_url")
    public String getSecondImageUrl() {
        return this.secondImageUrl;
    }

    public void setSecondImageUrl(String secondImageUrl) {
        this.secondImageUrl = secondImageUrl;
    }

    @Column(name = "third_image_url")
    public String getThirdImageUrl() {
        return this.thirdImageUrl;
    }

    public void setThirdImageUrl(String thirdImageUrl) {
        this.thirdImageUrl = thirdImageUrl;
    }

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    @JoinColumn(name = "category_id")
    @JsonBackReference
    public Category getCategory() {
        return this.category;
    }

    @OneToMany(mappedBy = "racket", fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    public Set<Feedback> getFeedbackSet() {
        return this.feedbackSet;
    }

    public void setFeedbackSet(Set<Feedback> feedbackSet) {
        this.feedbackSet = feedbackSet;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    @Column(name = "name", nullable = false)
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "head_size", nullable = false)
    public BigDecimal getHeadSize() {
        return this.headSize;
    }

    public void setHeadSize(BigDecimal headSize) {
        this.headSize = headSize;
    }

    @Column(name = "weight", nullable = false)
    public BigDecimal getWeight() {
        return this.weight;
    }

    public void setWeight(BigDecimal weight) {
        this.weight = weight;
    }

    @Column(name = "string_pattern", nullable = false)
    public String getStringPattern() {
        return this.stringPattern;
    }

    public void setStringPattern(String stringPattern) {
        this.stringPattern = stringPattern;
    }

    @Column(name = "deleted", nullable = false , columnDefinition = "BOOLEAN DEFAULT FALSE")
    public Boolean getDeleted() {
        return this.deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }
//    public Integer getQuantity() {
//        return this.quantity;
//    }
//
//    public void setQuantity(Integer quantity) {
//        this.quantity = quantity;
//    }

//    public Float getSize() {
//        return this.size;
//    }
//
//    public void setSize(Float size) {
//        this.size = size;
//    }
}
