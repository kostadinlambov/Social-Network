package kl.tennisshop.domain.models.bindingModels.order;

import kl.tennisshop.utils.constants.ValidationMessageConstants;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import static kl.tennisshop.utils.constants.ValidationMessageConstants.ORDER_INVALID_QUANTITY_MESSAGE;

public class OrderRemoveBindingModel {

    private String userId;
    private String racketId;

    public OrderRemoveBindingModel() {
    }

    @NotNull(message = ValidationMessageConstants.ID_REQUIRED_MESSAGE)
    @Length(min = 1, message = ValidationMessageConstants.ID_REQUIRED_MESSAGE)
    public String getUserId() {
        return this.userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @NotNull(message = ValidationMessageConstants.ID_REQUIRED_MESSAGE)
    @Length(min = 1, message = ValidationMessageConstants.ID_REQUIRED_MESSAGE)
    public String getRacketId() {
        return this.racketId;
    }

    public void setRacketId(String racketId) {
        this.racketId = racketId;
    }

}
