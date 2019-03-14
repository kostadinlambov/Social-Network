package kl.socialnetwork.services;

import kl.socialnetwork.domain.modles.bindingModels.post.PostCreateBindingModel;
import kl.socialnetwork.domain.modles.serviceModels.PostServiceModel;

public interface PostService {

    PostServiceModel createPost(PostCreateBindingModel postCreateBindingModel);
}
