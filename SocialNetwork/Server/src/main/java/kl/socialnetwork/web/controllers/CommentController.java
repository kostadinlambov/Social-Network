package kl.socialnetwork.web.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import kl.socialnetwork.domain.models.bindingModels.comment.CommentCreateBindingModel;
import kl.socialnetwork.services.CommentService;
import kl.socialnetwork.utils.constants.ResponseMessageConstants;
import kl.socialnetwork.utils.responseHandler.exceptions.CustomException;
import kl.socialnetwork.utils.responseHandler.successResponse.SuccessResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

import static kl.socialnetwork.utils.constants.ResponseMessageConstants.*;

@RestController()
@RequestMapping(value = "/comment")
public class CommentController {

    private final CommentService commentService;
    private final ObjectMapper objectMapper;

    @Autowired
    public CommentController( CommentService commentService, ObjectMapper objectMapper) {
        this.commentService = commentService;
        this.objectMapper = objectMapper;
    }

    @PostMapping(value = "/create")
    public ResponseEntity<Object> createComment(@RequestBody @Valid CommentCreateBindingModel commentCreateBindingModel) throws Exception {
        boolean comment = this.commentService.createComment(commentCreateBindingModel);
        if (comment) {
            SuccessResponse successResponse = new SuccessResponse(LocalDateTime.now(), SUCCESSFUL_CREATE_COMMENT_MESSAGE, "", true);
            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }
        throw new CustomException(SERVER_ERROR_MESSAGE);
    }

    @PostMapping(value = "/remove")
    public ResponseEntity removeComment(@RequestBody Map<String, Object> body) throws Exception {
        String loggedInUserId = (String) body.get("loggedInUserId");
        String commentToRemoveId = (String) body.get("commentToRemoveId");

        CompletableFuture<Boolean> result = this.commentService.deleteComment(loggedInUserId, commentToRemoveId);
        if (result.get()) {
            SuccessResponse successResponse = new SuccessResponse(LocalDateTime.now(), SUCCESSFUL_DELETE_COMMENT_MESSAGE, "", true);
            return new ResponseEntity<>(this.objectMapper.writeValueAsString(successResponse), HttpStatus.OK);
        }
        throw new CustomException(ResponseMessageConstants.SERVER_ERROR_MESSAGE);
    }
}
