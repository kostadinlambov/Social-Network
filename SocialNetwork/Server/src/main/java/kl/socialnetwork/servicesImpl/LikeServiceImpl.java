package kl.socialnetwork.servicesImpl;

import kl.socialnetwork.domain.entities.Like;
import kl.socialnetwork.domain.entities.Post;
import kl.socialnetwork.domain.entities.User;
import kl.socialnetwork.repositories.LikeRepository;
import kl.socialnetwork.repositories.PostRepository;
import kl.socialnetwork.repositories.UserRepository;
import kl.socialnetwork.services.LikeService;
import kl.socialnetwork.utils.constants.ResponseMessageConstants;
import kl.socialnetwork.utils.responseHandler.exceptions.CustomException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class LikeServiceImpl implements LikeService {
    private final LikeRepository likeRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;


    @Autowired
    public LikeServiceImpl(LikeRepository likeRepository, PostRepository postRepository, UserRepository userRepository, ModelMapper modelMapper) {
        this.likeRepository = likeRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public boolean addLike(String postId, String loggedInUserId) {
        Post post = this.postRepository.findById(postId).orElse(null);
        User user = this.userRepository.findById(loggedInUserId).orElse(null);

        if(post != null && user != null){
            Like likeByUserAndPost = this.likeRepository.findByUserAndPost(user, post);

            if(likeByUserAndPost == null){
                Like like = new Like();
                like.setUser(user);
                like.setPost(post);
                like.setCount(1L);

                return this.likeRepository.saveAndFlush(like) != null;
            }else{
                throw new CustomException("Post was already liked from you!");
            }
        }

        throw new CustomException(ResponseMessageConstants.SERVER_ERROR_MESSAGE);
    }

    @Override
    public int getAllLikesForPost(String postId) {
        Post post = this.postRepository.findById(postId).orElse(null);

        if(post != null){
           return this.likeRepository.findAllByPost(post).size();
        }

        throw new CustomException(ResponseMessageConstants.SERVER_ERROR_MESSAGE);
    }
}
