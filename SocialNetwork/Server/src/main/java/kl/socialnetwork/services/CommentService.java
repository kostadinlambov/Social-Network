package kl.socialnetwork.services;

import kl.socialnetwork.domain.modles.bindingModels.comment.CommentCreateBindingModel;

public interface CommentService {

    boolean createComment(CommentCreateBindingModel commentCreateBindingModel) throws Exception;


    boolean deleteComment(String loggedInUserId, String commentToRemoveId) throws Exception;
}
