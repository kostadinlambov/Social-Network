package kl.tennisshop.web.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import kl.tennisshop.domain.models.bindingModels.racket.RacketCreateBindingModel;
import kl.tennisshop.domain.models.bindingModels.racket.RacketEditBindingModel;
import kl.tennisshop.domain.models.serviceModels.RacketServiceModel;
import kl.tennisshop.domain.models.viewModels.racket.RacketAllViewModel;
import kl.tennisshop.domain.models.viewModels.racket.RacketDetailsViewModel;
import kl.tennisshop.services.CloudinaryService;
import kl.tennisshop.services.RacketService;
import kl.tennisshop.utils.constants.ResponseMessageConstants;
import kl.tennisshop.utils.constants.ValidationMessageConstants;
import kl.tennisshop.utils.responseHandler.exceptions.CustomException;
import kl.tennisshop.utils.responseHandler.successResponse.SuccessResponse;
import org.hibernate.validator.constraints.Length;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@Validated
@RequestMapping(value = "/rackets")
public class RacketController {
    private RacketService racketService;
    private ModelMapper modelMapper;
    private ObjectMapper objectMapper;
    private final CloudinaryService cloudinaryService;

    @Autowired
    public RacketController(RacketService racketService, ModelMapper modelMapper, ObjectMapper objectMapper, CloudinaryService cloudinaryService) {
        this.racketService = racketService;
        this.modelMapper = modelMapper;
        this.objectMapper = objectMapper;
        this.cloudinaryService = cloudinaryService;
    }

    @PostMapping(value = "/create")
    public ResponseEntity createRacket(
            @RequestParam(name = "mainImageUrl") MultipartFile mainImageUrl,

            @Size(min = 5, message = ValidationMessageConstants.RACKET_INVALID_RACKET_NAME_MESSAGE)
            @RequestParam(name = "name") String name,

            @Size(min = 10, message = ValidationMessageConstants.RACKET_INVALID_DESCRIPTION_LENGTH_MESSAGE)
            @RequestParam(name = "description") String description,

            @DecimalMin(value = "0", message = ValidationMessageConstants.RACKET_INVALID_PRICE_MESSAGE)
            @DecimalMax(value = "10000", message = ValidationMessageConstants.RACKET_INVALID_PRICE_MESSAGE)
            @RequestParam(name = "price") BigDecimal price,

            @DecimalMin(value = "0", message = ValidationMessageConstants.RACKET_INVALID_HEAD_SIZE_MESSAGE)
            @DecimalMax(value = "10000", message = ValidationMessageConstants.RACKET_INVALID_HEAD_SIZE_MESSAGE)
            @RequestParam(name = "headSize") BigDecimal headSize,

            @DecimalMin(value = "0", message = ValidationMessageConstants.RACKET_INVALID_WEIGHT_MESSAGE)
            @DecimalMax(value = "10000", message = ValidationMessageConstants.RACKET_INVALID_WEIGHT_MESSAGE)
            @RequestParam(name = "weight") BigDecimal weight,

            @NotNull(message = ValidationMessageConstants.RACKET_STRING_PATTERN_REQUIRED_MESSAGE)
            @Length(min = 1, message = ValidationMessageConstants.RACKET_STRING_PATTERN_REQUIRED_MESSAGE)
            @RequestParam(name = "stringPattern") String stringPattern,

            @NotNull(message = ValidationMessageConstants.RACKET_CATEGORY_NAME_REQUIRED_MESSAGE)
            @Length(min = 1, message = ValidationMessageConstants.RACKET_CATEGORY_NAME_REQUIRED_MESSAGE)
            @RequestParam(name = "categoryName") String categoryName) throws IOException {


        RacketCreateBindingModel racketCreateBindingModel = new RacketCreateBindingModel(name, description, price, headSize, weight, stringPattern, categoryName);

        RacketServiceModel racketServiceModel = this.modelMapper
                .map(racketCreateBindingModel, RacketServiceModel.class);

        String pictureUrl = this.cloudinaryService.uploadImage(mainImageUrl);

        if (pictureUrl == null) {
            throw new IllegalArgumentException("Racket Picture upload failed.");
        }

        racketCreateBindingModel.setMainImageUrl(pictureUrl);

        boolean result = this.racketService.saveRacket(this.modelMapper.map(racketCreateBindingModel, RacketServiceModel.class));

        if (result) {
            SuccessResponse successResponse = new SuccessResponse(
                    new Date(),
                    "Racket have been successfully added.",
                    "",
                    true);

            System.out.println(this.objectMapper.writeValueAsString(successResponse));

            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }
        throw new CustomException(ResponseMessageConstants.SERVER_ERROR_MESSAGE);
    }

//    @PostMapping(value = "/create")
//    public ResponseEntity createRacket( @Valid
//            @RequestParam(name = "mainImageUrl") MultipartFile mainImageUrl,
//            @RequestParam(name = "name") String name,
//            @RequestParam(name = "description") String description,
//            @RequestParam(name = "price") BigDecimal price,
//            @RequestParam(name = "headSize") BigDecimal headSize,
//            @RequestParam(name = "weight") BigDecimal weight,
//            @RequestParam(name = "stringPattern") String stringPattern,
//            @RequestParam(name = "categoryName") String categoryName) throws IOException {
//
//
//        RacketCreateBindingModel racketCreateBindingModel =  new RacketCreateBindingModel(name,description,price, headSize, weight, stringPattern, categoryName);
//
//        RacketServiceModel racketServiceModel = this.modelMapper
//                .map(racketCreateBindingModel, RacketServiceModel.class);
//
//        String pictureUrl = this.cloudinaryService.uploadImage(mainImageUrl);
//
//        if (pictureUrl == null) {
//            throw new IllegalArgumentException("Racket Picture upload failed.");
//        }
//
//        racketCreateBindingModel.setMainImageUrl(pictureUrl);
//
//        boolean result = this.racketService.saveRacket(this.modelMapper.map(racketCreateBindingModel, RacketServiceModel.class));
//
//        if (result) {
//            SuccessResponse successResponse = new SuccessResponse(
//                    new Date(),
//                    "Racket have been successfully added.",
//                    "",
//                    true);
//
//            System.out.println(this.objectMapper.writeValueAsString(successResponse));
//
//            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
//        }
//        throw new CustomException(ResponseMessageConstants.SERVER_ERROR_MESSAGE);
//    }




    @PutMapping(value = "/edit", produces = "application/json")
    public ResponseEntity updateRacket(@RequestBody @Valid RacketEditBindingModel racketEditBindingModel) throws JsonProcessingException {
        boolean result = this.racketService.updateRacket(this.modelMapper.map(racketEditBindingModel, RacketServiceModel.class));

        if (result) {
            SuccessResponse successResponse = new SuccessResponse(
                    new Date(),
                    "Racket have been successfully edited.",
                    "",
                    true);
            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }
        throw new CustomException(ResponseMessageConstants.SERVER_ERROR_MESSAGE);
    }

    @GetMapping(value = "/all", produces = "application/json")
    public @ResponseBody
    List<RacketAllViewModel> allRackets() {
        return this.racketService
                .getAllRackets()
                .stream()
                .map(x -> this.modelMapper.map(x, RacketAllViewModel.class))
                .collect(Collectors.toList());
    }

    @GetMapping(value = "/details/{id}", produces = "application/json")
    public @ResponseBody
    RacketDetailsViewModel getRacketDetails(@PathVariable String id) {
        return this.modelMapper.map(this.racketService.getById(id), RacketDetailsViewModel.class);
    }

    @DeleteMapping(value = "/delete/{id}", produces = "application/json")
    public ResponseEntity deleteRacket(@PathVariable String id) throws JsonProcessingException {
        boolean result = this.racketService.disableById(id);

        if (result) {
            SuccessResponse successResponse = new SuccessResponse(
                    new Date(),
                    "Racket have been successfully deleted.",
                    "",
                    true);
            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }
        throw new CustomException(ResponseMessageConstants.SERVER_ERROR_MESSAGE);
    }


}
