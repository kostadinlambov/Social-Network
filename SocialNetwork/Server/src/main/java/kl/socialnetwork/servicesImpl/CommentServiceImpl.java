package kl.socialnetwork.servicesImpl;

import kl.socialnetwork.domain.entities.Comment;
import kl.socialnetwork.domain.entities.Post;
import kl.socialnetwork.domain.entities.User;
import kl.socialnetwork.domain.entities.UserRole;
import kl.socialnetwork.domain.modles.bindingModels.comment.CommentCreateBindingModel;
import kl.socialnetwork.domain.modles.serviceModels.CommentServiceModel;
import kl.socialnetwork.repositories.CommentRepository;
import kl.socialnetwork.repositories.PostRepository;
import kl.socialnetwork.repositories.RoleRepository;
import kl.socialnetwork.repositories.UserRepository;
import kl.socialnetwork.services.CommentService;
import kl.socialnetwork.utils.constants.ResponseMessageConstants;
import kl.socialnetwork.utils.responseHandler.exceptions.CustomException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;


@Service
@Transactional
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final RoleRepository roleRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository, UserRepository userRepository, PostRepository postRepository, RoleRepository roleRepository, ModelMapper modelMapper) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.roleRepository = roleRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public boolean createComment(CommentCreateBindingModel commentCreateBindingModel) {
        User creator = this.userRepository
                .findById(commentCreateBindingModel.getLoggedInUserId())
                .orElse(null);
        User timelineUser = this.userRepository.findById(commentCreateBindingModel.getTimelineUserId()).orElse(null);

        Post post = this.postRepository
                .findById(commentCreateBindingModel.getPostId())
                .orElse(null);

        if (creator != null && post != null && timelineUser !=  null) {
            CommentServiceModel commentServiceModel = new CommentServiceModel();
            commentServiceModel.setPost(post);
            commentServiceModel.setCreator(creator);
            commentServiceModel.setTimelineUser(timelineUser);
            commentServiceModel.setContent(commentCreateBindingModel.getContent());
            commentServiceModel.setTime(LocalDateTime.now());
            commentServiceModel.setImageUrl(commentCreateBindingModel.getImageUrl());

            Comment comment = this.modelMapper.map(commentServiceModel, Comment.class);

            return this.commentRepository.saveAndFlush(comment) != null;
        }

        throw new CustomException(ResponseMessageConstants.SERVER_ERROR_MESSAGE);
    }

    @Override
    public boolean deleteComment(String loggedInUserId, String commentToRemoveId) {
        User loggedInUser = this.userRepository.findById(loggedInUserId).orElse(null);
        Comment commentToRemove = this.commentRepository.findById(commentToRemoveId).orElse(null);

        if (loggedInUser != null && commentToRemove != null) {
            UserRole rootRole = this.roleRepository.findByAuthority("ROOT");
            boolean hasRootAuthority = loggedInUser.getAuthorities().contains(rootRole);
            boolean isCommentCreator = commentToRemove.getCreator().getId().equals(loggedInUserId);
            boolean isTimeLineUser = commentToRemove.getTimelineUser().getId().equals(loggedInUserId);

            if (hasRootAuthority || isCommentCreator || isTimeLineUser) {
                try {
                    this.commentRepository.delete(commentToRemove);
                    return true;
                } catch (Exception e) {
                    throw new CustomException(ResponseMessageConstants.SERVER_ERROR_MESSAGE);
                }
            } else {
                throw new CustomException("Unauthorized!");
            }
        }

        return false;
    }
}
