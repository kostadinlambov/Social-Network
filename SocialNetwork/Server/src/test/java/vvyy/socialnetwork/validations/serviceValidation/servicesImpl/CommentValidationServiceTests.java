package vvyy.socialnetwork.validations.serviceValidation.servicesImpl;

import vvyy.socialnetwork.domain.entities.Comment;
import vvyy.socialnetwork.domain.entities.Post;
import vvyy.socialnetwork.domain.entities.User;
import vvyy.socialnetwork.domain.models.bindingModels.comment.CommentCreateBindingModel;
import vvyy.socialnetwork.testUtils.CommentsUtils;
import vvyy.socialnetwork.testUtils.PostsUtils;
import vvyy.socialnetwork.testUtils.UsersUtils;
import vvyy.socialnetwork.validations.serviceValidation.services.CommentValidationService;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class CommentValidationServiceTests {
    private CommentValidationService commentValidationService;

    @Before
    public void setupTest() {
        commentValidationService = new CommentValidationServiceImpl();
    }

    @Test
    public void isValidWithComment_whenValid_true() {
        User user = UsersUtils.createUser();
        Post post = PostsUtils.createPost(user, user);
        Comment comment = CommentsUtils.createComment(user, user, post);

        boolean result = commentValidationService.isValid(comment);
        assertTrue(result);
    }

    @Test
    public void isValidWithComment_whenNull_false() {
        Comment comment = null;
        boolean result = commentValidationService.isValid(comment);
        assertFalse(result);
    }

    @Test
    public void isValidWithCommentCreateBindingModel_whenValid_true() {
        CommentCreateBindingModel commentCreateBindingModel = CommentsUtils.getCommentCreateBindingModel(1).get(0);

        boolean result = commentValidationService.isValid(commentCreateBindingModel);
        assertTrue(result);
    }

    @Test
    public void isValidWithCommentCreateBindingModel_whenNull_false() {
        CommentCreateBindingModel commentCreateBindingModel = null;
        boolean result = commentValidationService.isValid(commentCreateBindingModel);
        assertFalse(result);
    }
}
