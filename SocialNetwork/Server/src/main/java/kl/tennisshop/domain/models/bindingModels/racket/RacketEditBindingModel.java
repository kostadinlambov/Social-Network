package kl.tennisshop.domain.models.bindingModels.racket;

import kl.tennisshop.utils.constants.ValidationMessageConstants;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;

public class RacketEditBindingModel implements Serializable {
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
    private String categoryName;

    public RacketEditBindingModel() {
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Size(min = 5, message = ValidationMessageConstants.RACKET_INVALID_RACKET_NAME_MESSAGE)
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Size(min = 10, message = ValidationMessageConstants.RACKET_INVALID_DESCRIPTION_LENGTH_MESSAGE)
    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @DecimalMin(value = "0", message = ValidationMessageConstants.RACKET_INVALID_PRICE_MESSAGE)
    @DecimalMax(value = "10000", message = ValidationMessageConstants.RACKET_INVALID_PRICE_MESSAGE)
    public BigDecimal getPrice() {
        return this.price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    @DecimalMin(value = "0", message = ValidationMessageConstants.RACKET_INVALID_HEAD_SIZE_MESSAGE)
    @DecimalMax(value = "10000", message = ValidationMessageConstants.RACKET_INVALID_HEAD_SIZE_MESSAGE)
    public BigDecimal getHeadSize() {
        return this.headSize;
    }

    public void setHeadSize(BigDecimal headSize) {
        this.headSize = headSize;
    }

    @DecimalMin(value = "0", message = ValidationMessageConstants.RACKET_INVALID_WEIGHT_MESSAGE)
    @DecimalMax(value = "10000", message = ValidationMessageConstants.RACKET_INVALID_WEIGHT_MESSAGE)
    public BigDecimal getWeight() {
        return this.weight;
    }

    public void setWeight(BigDecimal weight) {
        this.weight = weight;
    }

    @NotNull(message = ValidationMessageConstants.RACKET_STRING_PATTERN_REQUIRED_MESSAGE)
    @Length(min = 1, message = ValidationMessageConstants.RACKET_STRING_PATTERN_REQUIRED_MESSAGE)
    public String getStringPattern() {
        return this.stringPattern;
    }

    public void setStringPattern(String stringPattern) {
        this.stringPattern = stringPattern;
    }

    @NotNull(message = ValidationMessageConstants.RACKET_MAIN_IMAGE_URL_REQUIRED_MESSAGE)
    @Length(min = 1, message = ValidationMessageConstants.RACKET_MAIN_IMAGE_URL_REQUIRED_MESSAGE)
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

    @NotNull(message = ValidationMessageConstants.RACKET_CATEGORY_NAME_REQUIRED_MESSAGE)
    @Length(min = 1, message = ValidationMessageConstants.RACKET_CATEGORY_NAME_REQUIRED_MESSAGE)
    public String getCategoryName() {
        return this.categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
}

