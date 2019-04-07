package kl.tennisshop.domain.models.serviceModels;

import kl.tennisshop.domain.entities.Category;
import kl.tennisshop.domain.entities.Feedback;
import kl.tennisshop.domain.entities.Order;

import java.math.BigDecimal;
import java.util.Set;

public class RacketServiceModel {
    private String id;
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
    private Set<Order> orders;
    private Set<Feedback> feedbackSet;

//    @Column(name = "quantity", nullable = false)
//    private Integer quantity;

//    @Column(name = "size", nullable = false)
//    private Float size;


    public RacketServiceModel() {
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Set<Order> getOrders() {
        return this.orders;
    }

    public void setOrders(Set<Order> orders) {
        this.orders = orders;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return this.price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getMainImageUrl() {
        return this.mainImageUrl;
    }

    public void setMainImageUrl(String mainImageUrl) {
        this.mainImageUrl = mainImageUrl;
    }

    public String getSecondImageUrl() {
        return this.secondImageUrl;
    }

    public void setSecondImageUrl(String secondImageUrl) {
        this.secondImageUrl = secondImageUrl;
    }

    public String getThirdImageUrl() {
        return this.thirdImageUrl;
    }

    public void setThirdImageUrl(String thirdImageUrl) {
        this.thirdImageUrl = thirdImageUrl;
    }

    public Category getCategory() {
        return this.category;
    }

    public Set<Feedback> getFeedbackSet() {
        return this.feedbackSet;
    }

    public void setFeedbackSet(Set<Feedback> feedbackSet) {
        this.feedbackSet = feedbackSet;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getHeadSize() {
        return this.headSize;
    }

    public void setHeadSize(BigDecimal headSize) {
        this.headSize = headSize;
    }

    public BigDecimal getWeight() {
        return this.weight;
    }

    public void setWeight(BigDecimal weight) {
        this.weight = weight;
    }

    public String getStringPattern() {
        return this.stringPattern;
    }

    public void setStringPattern(String stringPattern) {
        this.stringPattern = stringPattern;
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
