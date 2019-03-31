package kl.socialnetwork.validations.serviceValidation.services;

import kl.socialnetwork.domain.entities.Comment;
import kl.socialnetwork.domain.entities.Post;
import kl.socialnetwork.domain.modles.bindingModels.comment.CommentCreateBindingModel;
import kl.socialnetwork.domain.modles.bindingModels.post.PostCreateBindingModel;

public interface CommentValidationService {
    boolean isValid(Comment comment);

    boolean isValid(CommentCreateBindingModel commentCreateBindingModel);
}
