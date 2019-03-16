package kl.socialnetwork.web.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import kl.socialnetwork.domain.modles.bindingModels.post.PostCreateBindingModel;
import kl.socialnetwork.domain.modles.serviceModels.PostServiceModel;
import kl.socialnetwork.domain.modles.viewModels.post.PostAllViewModel;
import kl.socialnetwork.domain.modles.viewModels.user.UserAllViewModel;
import kl.socialnetwork.services.CloudinaryService;
import kl.socialnetwork.services.PostService;
import kl.socialnetwork.utils.constants.ResponseMessageConstants;
import kl.socialnetwork.utils.responseHandler.exceptions.CustomException;
import kl.socialnetwork.utils.responseHandler.successResponse.SuccessResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

        boolean post = this.postService.createPost(postCreateBindingModel);

        if (post) {
            SuccessResponse successResponse = new SuccessResponse(
                    LocalDateTime.now(),
                    SUCCESSFUL_CREATE_POST_MESSAGE,
                    " ",
                    true);

            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }

        throw new CustomException(SERVER_ERROR_MESSAGE);
    }

    @GetMapping(value = "/all/{id}")
    public ResponseEntity<Object> getAllUsers(@PathVariable(value = "id") String timelineUserId) {

        try {
            List<PostServiceModel> postServiceAllPosts = this.postService.getAllPosts(timelineUserId);


            List<PostAllViewModel> postAllViewModels =  postServiceAllPosts.stream().map(postServiceModel -> {
                        PostAllViewModel postAllViewModel = this.modelMapper.map(postServiceModel, PostAllViewModel.class);
                        postAllViewModel.setLikeCount(postServiceModel.getLike().size());

                        return postAllViewModel;
                    }).collect(Collectors.toList());



            SuccessResponse successResponse = new SuccessResponse(
                    LocalDateTime.now(),
                    SUCCESSFUL_POST_ALL_MESSAGE,
                    postAllViewModels,
                    true);

            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        } catch (Exception e) {
            throw new CustomException(SERVER_ERROR_MESSAGE);
        }
    }

    @PostMapping(value = "/remove")
    public ResponseEntity removePost(@RequestBody Map<String, Object> body) throws IOException {
        String loggedInUserId = (String) body.get("loggedInUserId");
        String postToRemoveId = (String) body.get("postToRemoveId");

        boolean result = this.postService.deletePost(loggedInUserId, postToRemoveId);

        if (result) {
            SuccessResponse successResponse = new SuccessResponse(
                    LocalDateTime.now(),
                    "Post successfully deleted!",
                    "",
                    true
            );

            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }

        throw new CustomException(ResponseMessageConstants.SERVER_ERROR_MESSAGE);
    }

}
