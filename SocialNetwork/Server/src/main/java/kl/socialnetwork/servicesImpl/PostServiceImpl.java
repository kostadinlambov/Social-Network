package kl.socialnetwork.servicesImpl;

import kl.socialnetwork.domain.entities.Picture;
import kl.socialnetwork.domain.entities.Post;
import kl.socialnetwork.domain.entities.User;
import kl.socialnetwork.domain.modles.bindingModels.post.PostCreateBindingModel;
import kl.socialnetwork.domain.modles.serviceModels.PictureServiceModel;
import kl.socialnetwork.domain.modles.serviceModels.PostServiceModel;
import kl.socialnetwork.domain.modles.viewModels.post.PostAllViewModel;
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
import java.util.List;
import java.util.stream.Collectors;

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
    public boolean createPost(PostCreateBindingModel postCreateBindingModel) {
        User loggedInUser = this.userRepository
                .findById(postCreateBindingModel.getLoggedInUserId())
                .orElse(null);

        User timelineUser = this.userRepository
                .findById(postCreateBindingModel.getTimelineUserId())
                .orElse(null);

        if(loggedInUser != null && timelineUser != null){

            PostServiceModel postServiceModel = new PostServiceModel();
            postServiceModel.setLoggedInUser(loggedInUser);
            postServiceModel.setTimelineUser(timelineUser);
            postServiceModel.setContent(postCreateBindingModel.getContent());
            postServiceModel.setImageUrl(postCreateBindingModel.getImageUrl());
            postServiceModel.setTime(LocalDateTime.now());
            postServiceModel.setLike(new ArrayList<>());

            Post post = this.modelMapper.map(postServiceModel, Post.class);

            return this.postRepository.saveAndFlush(post) != null;

        }

        throw new CustomException(ResponseMessageConstants.SERVER_ERROR_MESSAGE);
    }

    @Override
    public List<PostServiceModel> getAllPosts(String timelineUserId) {
        List<Post> postList = this.postRepository.findAllByTimelineUserIdOrderByTimeDesc(timelineUserId);

        return postList
                .stream()
                .map(post -> this.modelMapper
                        .map(post, PostServiceModel.class))
                .collect(Collectors.toList());
    }
}
