package kl.socialnetwork.web.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import kl.socialnetwork.domain.modles.bindingModels.post.PostCreateBindingModel;
import kl.socialnetwork.domain.modles.serviceModels.PostServiceModel;
import kl.socialnetwork.domain.modles.viewModels.post.PostAllViewModel;
import kl.socialnetwork.services.CloudinaryService;
import kl.socialnetwork.services.LikeService;
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
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static kl.socialnetwork.utils.constants.ResponseMessageConstants.*;

@RestController()
@RequestMapping(value = "/like")
public class LikeController {

    private final LikeService likeService;
    private final ModelMapper modelMapper;
    private final ObjectMapper objectMapper;

    @Autowired
    public LikeController(LikeService likeService, ModelMapper modelMapper, ObjectMapper objectMapper) {
        this.likeService = likeService;
        this.modelMapper = modelMapper;
        this.objectMapper = objectMapper;
    }


    @PostMapping(value = "/add")
    public ResponseEntity addLike(@RequestBody Map<String, Object> body) throws JsonProcessingException {
        String postId = (String) body.get("postId");
        String loggedInUserId = (String) body.get("loggedInUserId");

        boolean result = this.likeService.addLike(postId, loggedInUserId);

        if (result) {
            SuccessResponse successResponse = new SuccessResponse(
                    LocalDateTime.now(),
                    "You liked a post!",
                    "",
                    true
            );

            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }

        throw new CustomException(ResponseMessageConstants.SERVER_ERROR_MESSAGE);
    }

}
