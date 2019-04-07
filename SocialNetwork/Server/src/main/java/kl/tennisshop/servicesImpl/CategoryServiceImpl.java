package kl.tennisshop.servicesImpl;

import kl.tennisshop.domain.entities.Category;
import kl.tennisshop.domain.entities.Racket;
import kl.tennisshop.domain.entities.User;
import kl.tennisshop.domain.models.serviceModels.CategoryServiceModel;
import kl.tennisshop.domain.models.serviceModels.RacketServiceModel;
import kl.tennisshop.repositories.CategoryRepository;
import kl.tennisshop.services.CategoryService;
import kl.tennisshop.utils.constants.ResponseMessageConstants;
import kl.tennisshop.utils.responseHandler.exceptions.CustomException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {

    private CategoryRepository categoryRepository;
    private ModelMapper modelMapper;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository, ModelMapper modelMapper) {
        this.categoryRepository = categoryRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public void persistCategory(Category category) {
        this.categoryRepository.save(category);
    }

    @Override
    public Category findByName(String name) {
        return this.categoryRepository.findByName(name);
    }

    @Override
    public List<CategoryServiceModel> getAllCategories() {
        return this.categoryRepository
                .findAll()
                .stream()
                .map(x -> this.modelMapper.map(x, CategoryServiceModel.class))
                .collect(Collectors.toUnmodifiableList());
    }



    @Override
    public boolean saveCategory(CategoryServiceModel categoryServiceModel) {
        Category category = this.categoryRepository.findByName(categoryServiceModel.getName());
        if (category == null) {
            Category savedCategory = this.categoryRepository.saveAndFlush(this.modelMapper.map(categoryServiceModel, Category.class));
            return savedCategory != null;
        }

        throw new CustomException(ResponseMessageConstants.CATEGORY_ALREADY_EXISTS_ERROR_MESSAGE);
    }

    @Override
    public List<CategoryServiceModel> getAllNotDeletedCategories() {
        return this.categoryRepository
                .findAllByDeletedFalse()
                .stream()
                .map(x -> this.modelMapper.map(x, CategoryServiceModel.class))
                .collect(Collectors.toUnmodifiableList());
    }

    @Override
    public List<CategoryServiceModel> getAllDeletedCategories() {
        return this.categoryRepository
                .findAllByDeletedTrue()
                .stream()
                .map(x -> this.modelMapper.map(x, CategoryServiceModel.class))
                .collect(Collectors.toUnmodifiableList());
    }

    @Override
    public boolean restoreCategory(String id) {
        Category category = this.categoryRepository.findById(id).orElse(null);
        if(category != null){
            category.setDeleted(false);
            Category savedCategory = this.categoryRepository.saveAndFlush(category);
            return savedCategory != null;
        }
        return false;
    }

    @Override
    public boolean deleteCategory(String id) {
        Category category = this.categoryRepository.findById(id).orElse(null);
        if(category != null){
            category.setDeleted(true);
            Category savedCategory = this.categoryRepository.saveAndFlush(category);
            return savedCategory != null;
        }
        return false;
    }

    @Override
    public boolean updateCategory(CategoryServiceModel categoryServiceModel) {

        Category categoryFromDb = this.categoryRepository.findById(categoryServiceModel.getId()).orElse(null);

        if(categoryFromDb != null){
            Category category = this.modelMapper.map(categoryServiceModel, Category.class);
            category.setDeleted(categoryFromDb.getDeleted());
            Category savedCategory = this.categoryRepository.saveAndFlush(category);
            return savedCategory != null;
        }

        return false;
    }

//    @Override
//    public boolean updateRacket(RacketServiceModel racketServiceModel) {
//        Racket racketFromDb = this.racketRepository.findById(racketServiceModel.getId()).orElse(null);
//        if (racketFromDb != null) {
////            return this.saveRacket(racketServiceModel);
//            Category category = this.categoryService.findByName(racketServiceModel.getCategory().getName());
//            if (category != null) {
//                racketServiceModel.setCategory(category);
//                Racket racket = this.modelMapper.map(racketServiceModel, Racket.class);
//                Racket savedRacket = this.racketRepository.saveAndFlush(racket);
//                return savedRacket != null;
//            }
//            throw new CustomException(ResponseMessageConstants.INVALID_CATEGORY_ERROR_MESSAGE);
//        }
//        return false;
//    }
}


