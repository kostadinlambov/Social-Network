package kl.tennisshop.domain.models.bindingModels.order;

import kl.tennisshop.utils.constants.ValidationMessageConstants;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import static kl.tennisshop.utils.constants.ValidationMessageConstants.ORDER_INVALID_QUANTITY_MESSAGE;

public class OrderEditBindingModel {
    private String id;
    private Integer quantity;

    public OrderEditBindingModel() {
    }

    @NotNull(message = ValidationMessageConstants.ID_REQUIRED_MESSAGE)
    @Length(min = 1, message = ValidationMessageConstants.ID_REQUIRED_MESSAGE)
    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Min(value = 1, message = ORDER_INVALID_QUANTITY_MESSAGE)
    public Integer getQuantity() {
        return this.quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
