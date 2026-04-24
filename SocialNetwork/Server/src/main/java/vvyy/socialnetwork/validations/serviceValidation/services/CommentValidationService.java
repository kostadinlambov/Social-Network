package vvyy.socialnetwork.validations.serviceValidation.services;

import vvyy.socialnetwork.domain.entities.Comment;
import vvyy.socialnetwork.domain.models.bindingModels.comment.CommentCreateBindingModel;

public interface CommentValidationService {
    boolean isValid(Comment comment);

    boolean isValid(CommentCreateBindingModel commentCreateBindingModel);
}
