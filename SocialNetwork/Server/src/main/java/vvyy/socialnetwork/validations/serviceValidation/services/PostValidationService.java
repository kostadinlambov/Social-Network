package vvyy.socialnetwork.validations.serviceValidation.services;

import vvyy.socialnetwork.domain.entities.Post;
import vvyy.socialnetwork.domain.models.bindingModels.post.PostCreateBindingModel;

public interface PostValidationService {
    boolean isValid(Post post);

    boolean isValid(PostCreateBindingModel postCreateBindingModel);
}
