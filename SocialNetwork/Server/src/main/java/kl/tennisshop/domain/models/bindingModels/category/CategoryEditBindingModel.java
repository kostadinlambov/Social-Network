package kl.tennisshop.domain.models.bindingModels.category;

import kl.tennisshop.utils.constants.ValidationMessageConstants;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;

public class CategoryEditBindingModel {
    private String id;
    private String name;

    public CategoryEditBindingModel() {
    }

    @NotNull(message = ValidationMessageConstants.ID_REQUIRED_MESSAGE)
    @Length(min = 1, message = ValidationMessageConstants.ID_REQUIRED_MESSAGE)
    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
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
