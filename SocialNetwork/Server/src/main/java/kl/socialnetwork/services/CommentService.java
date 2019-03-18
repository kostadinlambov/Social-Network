package kl.socialnetwork.services;

import kl.socialnetwork.domain.modles.bindingModels.comment.CommentCreateBindingModel;

public interface CommentService {

    boolean createComment(CommentCreateBindingModel commentCreateBindingModel);


    boolean deleteComment(String loggedInUserId, String commentToRemoveId);
}
