package kl.socialnetwork.servicesImpl;

import kl.socialnetwork.domain.entities.Like;
import kl.socialnetwork.domain.entities.Post;
import kl.socialnetwork.domain.entities.User;
import kl.socialnetwork.domain.modles.bindingModels.post.PostCreateBindingModel;
import kl.socialnetwork.domain.modles.serviceModels.PostServiceModel;
import kl.socialnetwork.domain.modles.viewModels.post.PostCreateViewModel;
import kl.socialnetwork.repositories.LikeRepository;
import kl.socialnetwork.repositories.PostRepository;
import kl.socialnetwork.repositories.UserRepository;
import kl.socialnetwork.services.PostService;
import kl.socialnetwork.utils.constants.ResponseMessageConstants;
import kl.socialnetwork.utils.responseHandler.exceptions.CustomException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
@Transactional
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;
    private final ModelMapper modelMapper;


    @Autowired
    public PostServiceImpl(PostRepository postRepository, UserRepository userRepository, LikeRepository likeRepository, ModelMapper modelMapper) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.likeRepository = likeRepository;
        this.modelMapper = modelMapper;
    }


    @Override
    public PostServiceModel createPost(PostCreateBindingModel postCreateBindingModel) {
        User user = this.userRepository
                .findById(postCreateBindingModel.getUserId())
                .orElse(null);

        if(user != null){

            PostServiceModel postServiceModel = new PostServiceModel();
            postServiceModel.setUser(user);
            postServiceModel.setContent(postCreateBindingModel.getContent());
            postServiceModel.setImageUrl(postCreateBindingModel.getImageUrl());
            postServiceModel.setTime(LocalDateTime.now());
            postServiceModel.setLike(new ArrayList<>());

            Post post = this.modelMapper.map(postServiceModel, Post.class);

            Post savedPost = this.postRepository.saveAndFlush(post);

            if(savedPost != null){
                return this.modelMapper.map(savedPost, PostServiceModel.class);
            }
        }

        throw new CustomException(ResponseMessageConstants.SERVER_ERROR_MESSAGE);
    }
}
