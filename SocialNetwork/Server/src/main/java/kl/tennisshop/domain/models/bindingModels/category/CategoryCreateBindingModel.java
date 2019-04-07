package kl.tennisshop.domain.models.bindingModels.category;

import kl.tennisshop.utils.constants.ValidationMessageConstants;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;

public class CategoryCreateBindingModel {
    private String name;

    public CategoryCreateBindingModel() {
    }

    @NotNull(message = ValidationMessageConstants.CATEGORY_NAME_REQUIRED_MESSAGE)
    @Length(min = 1, message = ValidationMessageConstants.CATEGORY_NAME_REQUIRED_MESSAGE)
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
