package kl.tennisshop.domain.models.viewModels.racket;

import java.math.BigDecimal;

public class RacketAllViewModel {
    private String id;
    private String name;
    private String description;
    private BigDecimal price;
    private String mainImageUrl;
    private BigDecimal headSize;
    private BigDecimal weight;
    private String stringPattern;
    private String categoryName;

    public RacketAllViewModel() {
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getCategoryName() {
        return this.categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getMainImageUrl() {
        return this.mainImageUrl;
    }

    public void setMainImageUrl(String mainImageUrl) {
        this.mainImageUrl = mainImageUrl;
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
    //    public Category getCategory() {
//        return this.category;
//    }
//
//    public void setCategory(Category category) {
//        this.category = category;
//    }

//    @Override
//    public String toString() {
//        StringBuilder sb = new StringBuilder();
//        sb.append(String.format("Name: %s", this.name)).append(System.lineSeparator());
//        sb.append(String.format("Price: %s", this.price)).append(System.lineSeparator());
//        sb.append(String.format("Category: %s", this.category.getAuthority())).append(System.lineSeparator());
//
//        return sb.toString();
////        return "RacketViewModel{" +
//////                "id='" + id + '\'' +
//////                ", name='" + name + '\'' +
//////                ", description='" + description + '\'' +
//////                ", price=" + price +
//////                ", headSize=" + headSize +
//////                ", weight=" + weight +
//////                ", stringPattern='" + stringPattern + '\'' +
//////                ", mainImageUrl='" + mainImageUrl + '\'' +
//////                ", secondImageUrl='" + secondImageUrl + '\'' +
//////                ", thirdImageUrl='" + thirdImageUrl + '\'' +
//////                ", category=" + category.getAuthority() +
//////                '}';
//    }
}
