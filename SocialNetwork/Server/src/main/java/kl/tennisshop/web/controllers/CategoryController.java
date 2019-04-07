package kl.tennisshop.web.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import kl.tennisshop.domain.models.bindingModels.category.CategoryCreateBindingModel;
import kl.tennisshop.domain.models.bindingModels.category.CategoryEditBindingModel;
import kl.tennisshop.domain.models.serviceModels.CategoryServiceModel;
import kl.tennisshop.domain.models.viewModels.category.CategoryAllViewModel;
import kl.tennisshop.services.CategoryService;
import kl.tennisshop.utils.constants.ResponseMessageConstants;
import kl.tennisshop.utils.responseHandler.exceptions.CustomException;
import kl.tennisshop.utils.responseHandler.successResponse.SuccessResponse;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static kl.tennisshop.utils.constants.ResponseMessageConstants.*;

@RestController
@RequestMapping(value = "/categories")
public class CategoryController {

    private CategoryService categoryService;
    private ModelMapper modelMapper;
    private ObjectMapper objectMapper;

    public CategoryController(CategoryService categoryService, ModelMapper modelMapper, ObjectMapper objectMapper) {
        this.categoryService = categoryService;
        this.modelMapper = modelMapper;
        this.objectMapper = objectMapper;
    }

    @GetMapping(value = "/all", produces = "application/json")
    public @ResponseBody List<CategoryAllViewModel> allCategories() {
            return this.categoryService
                    .getAllNotDeletedCategories()
                    .stream()
                    .map(x -> this.modelMapper.map(x, CategoryAllViewModel.class))
                    .collect(Collectors.toList());
        }

    @GetMapping(value = "/allDeleted", produces = "application/json")
    public @ResponseBody List<CategoryAllViewModel> allDeletedCategories() {
        return this.categoryService
                .getAllDeletedCategories()
                .stream()
                .map(x -> this.modelMapper.map(x, CategoryAllViewModel.class))
                .collect(Collectors.toList());
    }

    @PostMapping(value = "/create", produces = "application/json")
    public ResponseEntity createCategory(@RequestBody @Valid CategoryCreateBindingModel categoryCreateBindingModel) throws JsonProcessingException {

        boolean result = this.categoryService.saveCategory(this.modelMapper.map(categoryCreateBindingModel, CategoryServiceModel.class));

        if (result) {
            SuccessResponse successResponse = new SuccessResponse(
                    new Date(),
                    SUCCESSFUL_CATEGORY_ADDITION_MESSAGE,
                    "",
                    true);

            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }
        throw new CustomException(ResponseMessageConstants.SERVER_ERROR_MESSAGE);
    }

    @PostMapping(value = "/restore")
    public ResponseEntity restoreCategory(@RequestParam(name = "id") String id) throws JsonProcessingException {
        boolean resultOfRestore= this.categoryService.restoreCategory(id);

        if (resultOfRestore) {
            SuccessResponse successResponse = new SuccessResponse(
                    new Date(),
                    SUCCESSFUL_CATEGORY_RESTORE_MESSAGE,
                    "",
                    true);
            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }
        throw new CustomException(FAILURE_CATEGORY_RESTORE_MESSAGE);
    }

    @PostMapping(value = "/delete")
    public ResponseEntity deleteCategory(@RequestParam(name = "id") String id) throws JsonProcessingException {
        boolean resultOfRestore= this.categoryService.deleteCategory(id);

        if (resultOfRestore) {
            SuccessResponse successResponse = new SuccessResponse(
                    new Date(),
                    SUCCESSFUL_CATEGORY_DISABLE_MESSAGE,
                    "",
                    true);
            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }
        throw new CustomException(FAILURE_CATEGORY_DELETE_MESSAGE);
    }

    @PutMapping(value = "/edit", produces = "application/json")
    public ResponseEntity updateCategory(@RequestBody @Valid CategoryEditBindingModel categoryEditBindingModel) throws JsonProcessingException {
        boolean result = this.categoryService.updateCategory(this.modelMapper.map(categoryEditBindingModel, CategoryServiceModel.class));

        if (result) {
            SuccessResponse successResponse = new SuccessResponse(
                    new Date(),
                    SUCCESSFUL_CATEGORY_EDIT_MESSAGE,
                    "",
                    true);
            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }
        throw new CustomException(FAILURE_CATEGORY_EDIT_MESSAGE);
    }
}
