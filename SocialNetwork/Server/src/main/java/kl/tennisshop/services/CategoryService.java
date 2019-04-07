package kl.tennisshop.services;

        import kl.tennisshop.domain.entities.Category;
        import kl.tennisshop.domain.models.bindingModels.category.CategoryCreateBindingModel;
        import kl.tennisshop.domain.models.serviceModels.CategoryServiceModel;

        import java.util.List;

public interface CategoryService {
    void persistCategory(Category category);

    Category findByName(String name);
    List<CategoryServiceModel> getAllCategories();

    boolean saveCategory(CategoryServiceModel categoryServiceModel);

    List<CategoryServiceModel> getAllNotDeletedCategories();
    List<CategoryServiceModel> getAllDeletedCategories();

    boolean restoreCategory(String id);

    boolean deleteCategory(String id);

    boolean updateCategory(CategoryServiceModel categoryServiceModel);
}
