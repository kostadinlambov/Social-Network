package kl.socialnetwork.services;

import kl.socialnetwork.domain.models.bindingModels.comment.CommentCreateBindingModel;

import java.util.concurrent.CompletableFuture;

public interface CommentService {
    boolean createComment(CommentCreateBindingModel commentCreateBindingModel) throws Exception;

    CompletableFuture<Boolean> deleteComment(String loggedInUserId, String commentToRemoveId) throws Exception;
}
