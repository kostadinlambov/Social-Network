package kl.socialnetwork.validations.serviceValidation.services;

import kl.socialnetwork.domain.entities.Post;
import kl.socialnetwork.domain.models.bindingModels.post.PostCreateBindingModel;

public interface PostValidationService {
    boolean isValid(Post post);

    boolean isValid(PostCreateBindingModel postCreateBindingModel);
}
