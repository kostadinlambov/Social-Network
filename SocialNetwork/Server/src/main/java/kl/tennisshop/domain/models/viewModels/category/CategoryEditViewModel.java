package kl.tennisshop.domain.models.viewModels.category;

public class CategoryEditViewModel {
    private String id;
    private String name;


    public CategoryEditViewModel() {
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
}
