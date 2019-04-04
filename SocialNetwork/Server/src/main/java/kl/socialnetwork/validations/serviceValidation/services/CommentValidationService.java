package kl.socialnetwork.validations.serviceValidation.services;

import kl.socialnetwork.domain.entities.Comment;
import kl.socialnetwork.domain.models.bindingModels.comment.CommentCreateBindingModel;

public interface CommentValidationService {
    boolean isValid(Comment comment);

    boolean isValid(CommentCreateBindingModel commentCreateBindingModel);
}
