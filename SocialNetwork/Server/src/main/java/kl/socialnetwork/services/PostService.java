package kl.socialnetwork.services;

import kl.socialnetwork.domain.modles.bindingModels.post.PostCreateBindingModel;
import kl.socialnetwork.domain.modles.serviceModels.PostServiceModel;
import kl.socialnetwork.domain.modles.viewModels.post.PostAllViewModel;

import java.util.List;

public interface PostService {

    boolean createPost(PostCreateBindingModel postCreateBindingModel);

    List<PostServiceModel> getAllPosts(String timelineUserId);
}
