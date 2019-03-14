package kl.socialnetwork.web.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import kl.socialnetwork.domain.modles.bindingModels.post.PostCreateBindingModel;
import kl.socialnetwork.domain.modles.serviceModels.PostServiceModel;
import kl.socialnetwork.domain.modles.viewModels.post.PostCreateViewModel;
import kl.socialnetwork.services.CloudinaryService;
import kl.socialnetwork.services.PostService;
import kl.socialnetwork.utils.responseHandler.exceptions.CustomException;
import kl.socialnetwork.utils.responseHandler.successResponse.SuccessResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.time.LocalDateTime;

import static kl.socialnetwork.utils.constants.ResponseMessageConstants.*;

@RestController()
@RequestMapping(value = "/post")
public class PostController {

    private final PostService postService;
    private final CloudinaryService cloudinaryService;
    private final ModelMapper modelMapper;
    private final ObjectMapper objectMapper;

    @Autowired
    public PostController(PostService postService, CloudinaryService cloudinaryService, ModelMapper modelMapper, ObjectMapper objectMapper) {
        this.postService = postService;
        this.cloudinaryService = cloudinaryService;
        this.modelMapper = modelMapper;
        this.objectMapper = objectMapper;
    }


    @PostMapping(value = "/create")
    public ResponseEntity<Object> registerUser(@RequestBody @Valid PostCreateBindingModel postCreateBindingModel) throws JsonProcessingException {

        PostServiceModel postServiceModel = this.postService.createPost(postCreateBindingModel);
        PostCreateViewModel postCreateViewModel = this.modelMapper.map(postServiceModel, PostCreateViewModel.class);

        System.out.println();

        if (postCreateViewModel != null) {
            postCreateViewModel.setLikeCount(0L);

            SuccessResponse successResponse = new SuccessResponse(
                    LocalDateTime.now(),
                    SUCCESSFUL_CREATE_POST_MESSAGE,
                    postCreateViewModel,
                    true);

            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }

        throw new CustomException(SERVER_ERROR_MESSAGE);
    }

}
