//package kl.socialnetwork.validations.serviceValidation.implementations;
//
//
//import org.springframework.stereotype.Component;
//
//import java.util.List;
//
//@Component
//public class ProductionValidationServiceImpl implements ProductValidationService {
//    @Override
//    public boolean isValid(Product product) {
//        return product != null;
//    }
//
//    @Override
//    public boolean isValid(ProductServiceModel product) {
//        return product != null
//                && areCategoriesValid(product.getCategories());
//    }
//
//    private boolean areCategoriesValid(List<CategoryServiceModel> categories) {
//        return categories != null && !categories.isEmpty();
//    }
//}
