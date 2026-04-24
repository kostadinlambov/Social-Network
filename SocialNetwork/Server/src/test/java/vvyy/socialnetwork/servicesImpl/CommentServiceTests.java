package vvyy.socialnetwork.servicesImpl;

import vvyy.socialnetwork.domain.entities.Comment;
import vvyy.socialnetwork.domain.entities.Post;
import vvyy.socialnetwork.domain.entities.User;
import vvyy.socialnetwork.domain.models.bindingModels.comment.CommentCreateBindingModel;
import vvyy.socialnetwork.repositories.CommentRepository;
import vvyy.socialnetwork.repositories.PostRepository;
import vvyy.socialnetwork.repositories.UserRepository;
import vvyy.socialnetwork.services.CommentService;
import vvyy.socialnetwork.testUtils.CommentsUtils;
import vvyy.socialnetwork.testUtils.PostsUtils;
import vvyy.socialnetwork.testUtils.UsersUtils;
import vvyy.socialnetwork.validations.serviceValidation.services.CommentValidationService;
import vvyy.socialnetwork.validations.serviceValidation.services.PostValidationService;
import vvyy.socialnetwork.validations.serviceValidation.services.UserValidationService;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.concurrent.CompletableFuture;

import static vvyy.socialnetwork.utils.constants.ResponseMessageConstants.SERVER_ERROR_MESSAGE;
import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CommentServiceTests {

    @Autowired
    private CommentService commentService;

    @MockBean
    private PostRepository mockPostRepository;

    @MockBean
    private UserRepository mockUserRepository;

    @MockBean
    private CommentRepository mockCommentRepository;

    @MockBean
    private PostValidationService mockPostValidationService;

    @MockBean
    private UserValidationService mockUserValidationService;

    @MockBean
    private CommentValidationService mockCommentValidationService;

    @Rule
    public ExpectedException thrown = ExpectedException.none();

    @Before
    public void setUpTest() {

    }

    @Test
    public void createComment_whenUsersAndPostAndCommentCreateBindingModelAreValid_createComment() throws Exception {
        // Arrange
        CommentCreateBindingModel commentCreateBindingModel = CommentsUtils.getCommentCreateBindingModel(1).get(0);

        when(mockCommentValidationService.isValid(any(CommentCreateBindingModel.class)))
                .thenReturn(true);

        when(mockPostValidationService.isValid(any(Post.class)))
                .thenReturn(true);

        when(mockUserValidationService.isValid(any(User.class))).thenReturn(true);

        when(mockUserRepository.findById(any()))
                .thenReturn(java.util.Optional.of(new User()));

        when(mockPostRepository.findById(any()))
                .thenReturn(java.util.Optional.of(new Post()));

        // Act
        commentService.createComment(commentCreateBindingModel);

        // Assert
        verify(mockCommentRepository).save(any());
        verifyNoMoreInteractions(mockCommentRepository);
    }

    @Test(expected = Exception.class)
    public void createComment_whenCommentCreateBindingModelIsNotValid_throwException() throws Exception {
        // Arrange
        CommentCreateBindingModel commentCreateBindingModel = CommentsUtils.getCommentCreateBindingModel(1).get(0);

        when(mockCommentValidationService.isValid(any(CommentCreateBindingModel.class)))
                .thenReturn(false);

        when(mockPostValidationService.isValid(any(Post.class)))
                .thenReturn(true);

        when(mockUserValidationService.isValid(any(User.class))).thenReturn(true);

        when(mockUserRepository.findById(any()))
                .thenReturn(java.util.Optional.of(new User()));

        when(mockPostRepository.findById(any()))
                .thenReturn(java.util.Optional.of(new Post()));

        // Act
        commentService.createComment(commentCreateBindingModel);

        // Assert
        verify(mockCommentRepository).save(any());
        verifyNoMoreInteractions(mockCommentRepository);
    }

    @Test(expected = Exception.class)
    public void createComment_whenUsersAreNotValid_throwException() throws Exception {
        CommentCreateBindingModel commentCreateBindingModel = CommentsUtils.getCommentCreateBindingModel(1).get(0);

        when(mockCommentValidationService.isValid(any(CommentCreateBindingModel.class)))
                .thenReturn(true);

        when(mockPostValidationService.isValid(any(Post.class)))
                .thenReturn(true);

        when(mockUserValidationService.isValid(any(User.class))).thenReturn(false);

        when(mockUserRepository.findById(any()))
                .thenReturn(java.util.Optional.of(new User()));

        when(mockPostRepository.findById(any()))
                .thenReturn(java.util.Optional.of(new Post()));

        // Act
        commentService.createComment(commentCreateBindingModel);

        // Assert
        verify(mockCommentRepository).save(any());
        verifyNoMoreInteractions(mockCommentRepository);
    }

    @Test(expected = Exception.class)
    public void createComment_whenPostIsNotValid_throwException() throws Exception {
        // Arrange
        CommentCreateBindingModel commentCreateBindingModel = CommentsUtils.getCommentCreateBindingModel(1).get(0);

        when(mockCommentValidationService.isValid(any(CommentCreateBindingModel.class)))
                .thenReturn(true);

        when(mockPostValidationService.isValid(any(Post.class)))
                .thenReturn(false);

        when(mockUserValidationService.isValid(any(User.class))).thenReturn(true);

        when(mockUserRepository.findById(any()))
                .thenReturn(java.util.Optional.of(new User()));

        when(mockPostRepository.findById(any()))
                .thenReturn(null);

        // Act
        commentService.createComment(commentCreateBindingModel);

        // Assert
        verify(mockCommentRepository).save(any());
        verifyNoMoreInteractions(mockCommentRepository);
    }

    @Test(expected = Exception.class)
    public void createComment_whenUsersAndPostAndCommentCreateBindingModelAreNotValid_throwException() throws Exception {
        // Arrange
        CommentCreateBindingModel commentCreateBindingModel = CommentsUtils.getCommentCreateBindingModel(1).get(0);

        when(mockCommentValidationService.isValid(any(CommentCreateBindingModel.class)))
                .thenReturn(false);

        when(mockPostValidationService.isValid(any(Post.class)))
                .thenReturn(false);

        when(mockUserValidationService.isValid(any(User.class))).thenReturn(false);

        when(mockUserRepository.findById(any()))
                .thenReturn(null);

        when(mockPostRepository.findById(any()))
                .thenReturn(null);

        // Act
        commentService.createComment(commentCreateBindingModel);

        // Assert
        verify(mockCommentRepository).save(any());
        verifyNoMoreInteractions(mockCommentRepository);
    }

    @Test
    public void deleteComment_whenUserAndCommentAreValid_deleteComment() throws Exception {
        // Arrange
        User user = UsersUtils.createUser();
        Post post = PostsUtils.createPost(user, user);
        Comment comment = CommentsUtils.createComment(user, user, post);

        when(mockUserRepository.findById(any()))
                .thenReturn(java.util.Optional.of(user));

        when(mockCommentValidationService.isValid(any(Comment.class)))
                .thenReturn(true);

        when(mockCommentRepository.findById(any()))
                .thenReturn(java.util.Optional.of(comment));

        when(mockUserValidationService.isValid(any(User.class)))
                .thenReturn(true);

        // Act
        CompletableFuture<Boolean> result = commentService.deleteComment("1", "1");

        // Assert
        assertTrue(result.get());
    }

    @Test()
    public void deleteComment_whenUserIsNotValid_throwException() throws Exception {
        // Arrange
        User user = UsersUtils.createUser();
        Post post = PostsUtils.createPost(user, user);
        Comment comment = CommentsUtils.createComment(user, user, post);

        when(mockUserRepository.findById(any()))
                .thenReturn(java.util.Optional.of(user));

        when(mockUserValidationService.isValid(any(User.class)))
                .thenReturn(false);

        when(mockCommentValidationService.isValid(any(Comment.class)))
                .thenReturn(true);

        when(mockCommentRepository.findById(any()))
                .thenReturn(java.util.Optional.of(comment));

        thrown.expect(Exception.class);
        thrown.expectMessage(SERVER_ERROR_MESSAGE);

        // Act
        CompletableFuture<Boolean> result = commentService.deleteComment("1", "1");

        // Assert
        assertTrue(result.get());
    }

    @Test()
    public void deleteComment_whenCommentIsNotValid_throwException() throws Exception {
        // Arrange
        User user = UsersUtils.createUser();
        Post post = PostsUtils.createPost(user, user);
        Comment comment = CommentsUtils.createComment(user, user, post);

        when(mockUserRepository.findById(any()))
                .thenReturn(java.util.Optional.of(user));

        when(mockUserValidationService.isValid(any(User.class)))
                .thenReturn(true);

        when(mockCommentRepository.findById(any()))
                .thenReturn(java.util.Optional.of(comment));

        when(mockCommentValidationService.isValid(any(Comment.class)))
                .thenReturn(false);

        thrown.expect(Exception.class);
        thrown.expectMessage(SERVER_ERROR_MESSAGE);

        //  Act
        CompletableFuture<Boolean> result = commentService.deleteComment("1", "1");

        // Assert
        assertNull(result.get());
    }

    @Test()
    public void deleteComment_whenUserAndCommentAreNotValid_throwException() throws Exception {
        // Arrange
        User user = UsersUtils.createUser();
        Post post = PostsUtils.createPost(user, user);
        Comment comment = CommentsUtils.createComment(user, user, post);

        when(mockUserRepository.findById(any()))
                .thenReturn(java.util.Optional.of(user));

        when(mockUserValidationService.isValid(any(User.class)))
                .thenReturn(false);

        when(mockCommentRepository.findById(any()))
                .thenReturn(java.util.Optional.of(comment));

        when(mockCommentValidationService.isValid(any(Comment.class)))
                .thenReturn(false);

        thrown.expect(Exception.class);
        thrown.expectMessage(SERVER_ERROR_MESSAGE);

        //  Act
        CompletableFuture<Boolean> result = commentService.deleteComment("1", "1");

        // Assert
        assertNull(result.get());
    }

    @Test()
    public void deleteComment_whenUserIsNotAuthorized_throwException() throws Exception {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        Post post = PostsUtils.createPost(users.get(1), users.get(1));
        Comment comment = CommentsUtils.createComment(users.get(1), users.get(1), post);

        when(mockUserRepository.findById(any()))
                .thenReturn(java.util.Optional.of(users.get(0)));

        when(mockUserValidationService.isValid(any(User.class)))
                .thenReturn(true);

        when(mockCommentRepository.findById(any()))
                .thenReturn(java.util.Optional.of(comment));

        when(mockCommentValidationService.isValid(any(Comment.class)))
                .thenReturn(true);

        thrown.expect(Exception.class);
        thrown.expectMessage(SERVER_ERROR_MESSAGE);

        // Act
        CompletableFuture<Boolean> result = commentService.deleteComment("5", "1");

        // Assert
        assertNull(result.get());
    }
}
