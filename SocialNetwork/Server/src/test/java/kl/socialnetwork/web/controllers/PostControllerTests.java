package kl.socialnetwork.web.controllers;

import kl.socialnetwork.domain.entities.Comment;
import kl.socialnetwork.domain.entities.Post;
import kl.socialnetwork.domain.entities.User;
import kl.socialnetwork.domain.models.bindingModels.post.PostCreateBindingModel;
import kl.socialnetwork.domain.models.serviceModels.PostServiceModel;
import kl.socialnetwork.domain.models.viewModels.comment.CommentAllViewModel;
import kl.socialnetwork.domain.models.viewModels.post.PostAllViewModel;
import kl.socialnetwork.services.PostService;
import kl.socialnetwork.testUtils.CommentsUtils;
import kl.socialnetwork.testUtils.PostsUtils;
import kl.socialnetwork.testUtils.TestUtil;
import kl.socialnetwork.testUtils.UsersUtils;
import kl.socialnetwork.utils.responseHandler.exceptions.CustomException;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockServletContext;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.ServletContext;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

import static kl.socialnetwork.utils.constants.ResponseMessageConstants.SERVER_ERROR_MESSAGE;
import static kl.socialnetwork.utils.constants.ResponseMessageConstants.SUCCESSFUL_CREATE_POST_MESSAGE;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
@WebAppConfiguration
@SpringBootTest
//@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class PostControllerTests {
    private MockMvc mvc;

    @Autowired
    private WebApplicationContext context;

    @MockBean
    private PostService postServiceMock;

    @Before
    public void setup() {
        mvc = MockMvcBuilders
                .webAppContextSetup(context)
                .alwaysDo(print())
                .apply(springSecurity())
                .build();
    }

    @Test
    public void givenWac_whenServletContext_thenItProvidesPostController() {
        ServletContext servletContext = context.getServletContext();

        Assert.assertNotNull(servletContext);
        Assert.assertTrue(servletContext instanceof MockServletContext);
        Assert.assertNotNull(context.getBean("postController"));
    }

    @Test
    @WithMockUser(authorities = "USER")
    public void getAllPosts_when2Posts_2Posts() throws Exception {
        List<User> users = UsersUtils.getUsers(2);
        User firstUser = users.get(0);
        User secondUser = users.get(1);
        Post post = PostsUtils.createPost(firstUser, firstUser);

        List<Comment> comments = CommentsUtils.getComments(2, firstUser, firstUser, post);

        List<PostServiceModel> posts = PostsUtils.getPostServiceModels(2, users.get(0), users.get(1));

        posts.get(0).getCommentList().addAll(comments);
        posts.get(1).getCommentList().addAll(comments);

        List<PostAllViewModel> postAllViewModels = PostsUtils.getPostAllViewModels(2);
        List<CommentAllViewModel> commentAllViewModels = CommentsUtils.getCommentAllViewModels(2);

        postAllViewModels.get(0).getCommentList().addAll(commentAllViewModels);
        postAllViewModels.get(1).getCommentList().addAll(commentAllViewModels);

        when(this.postServiceMock.getAllPosts("1"))
                .thenReturn(posts);

        CommentAllViewModel firstComment = postAllViewModels.get(0).getCommentList().get(0);

        this.mvc
                .perform(get("/post/all/{id}", "1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(content().contentTypeCompatibleWith("application/json"))
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].postId", is(postAllViewModels.get(0).getPostId())))
                .andExpect(jsonPath("$[0].content", is(postAllViewModels.get(0).getContent())))
                .andExpect(jsonPath("$[0].commentList[0].content", is(firstComment.getContent())))
                .andExpect(jsonPath("$[0].commentList[0].creatorFirstName", is(firstComment.getCreatorFirstName())))
                .andExpect(jsonPath("$[0].commentList[0].creatorLastName", is(firstComment.getCreatorLastName())))
                .andExpect(jsonPath("$[0].commentList[0].creatorProfilePicUrl", is(firstComment.getCreatorProfilePicUrl())))
                .andExpect(jsonPath("$[0].commentList[0].timelineUserId", is(firstComment.getTimelineUserId())))
                .andExpect(jsonPath("$[1].postId", is(postAllViewModels.get(1).getPostId())))
                .andExpect(jsonPath("$[1].content", is(postAllViewModels.get(1).getContent())));

        verify(this.postServiceMock, times(1)).getAllPosts("1");
        verifyNoMoreInteractions(this.postServiceMock);
    }

    @Test()
    @WithMockUser(authorities = "USER")
    public void getAllPosts_whenGetAllPostsThrowsException_throwCustomException() throws Exception {
        when(this.postServiceMock.getAllPosts("1"))
                .thenThrow(new NullPointerException());

        Exception resolvedException = this.mvc
                .perform(get("/post/all/{id}", "1"))
                .andExpect(status().isInternalServerError())
                .andReturn().getResolvedException();

        Assert.assertEquals(SERVER_ERROR_MESSAGE, resolvedException.getMessage());
        Assert.assertEquals(CustomException.class, resolvedException.getClass());

        verify(postServiceMock, times(1)).getAllPosts("1");
        verifyNoMoreInteractions(postServiceMock);
    }

    @Test()
    public void getAllPosts_whenUnAuthorized_403Forbidden() throws Exception {
        this.mvc
                .perform(get("/post/all/{id}", "1"))
                .andExpect(status().isForbidden());
    }


    @Test
    @WithMockUser(authorities = "USER")
    public void createPost_whenInputsAreValid_createPost() throws Exception {
        PostCreateBindingModel postCreateBindingModel = PostsUtils.getPostCreateBindingModels(1).get(0);

        when(postServiceMock.createPost(any(PostCreateBindingModel.class)))
                .thenReturn(true);

        this.mvc
                .perform(post("/post/create")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonString(postCreateBindingModel)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(TestUtil.TEXT_PLAIN_UTF8))
                .andExpect(jsonPath("$.success").value("true"))
                .andExpect(jsonPath("$.message").value(SUCCESSFUL_CREATE_POST_MESSAGE));

        verify(this.postServiceMock, times(1)).createPost(any());
        verifyNoMoreInteractions(this.postServiceMock);
    }

    @Test
    @WithMockUser(authorities = "USER")
    public void createPost_whenCreatePostReturnsFalse_throwCustomException() throws Exception {
        PostCreateBindingModel postCreateBindingModel = PostsUtils.getPostCreateBindingModels(1).get(0);

        when(postServiceMock.createPost(any(PostCreateBindingModel.class)))
                .thenReturn(false);

        Exception resolvedException = this.mvc
                .perform(post("/post/create")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonString(postCreateBindingModel)))
                .andDo(print())
                .andExpect(status().isInternalServerError())
                .andReturn().getResolvedException();

        Assert.assertEquals(SERVER_ERROR_MESSAGE, resolvedException.getMessage());
        Assert.assertEquals(CustomException.class, resolvedException.getClass());

        verify(postServiceMock, times(1)).createPost(any());
        verifyNoMoreInteractions(postServiceMock);
    }

    @Test
    @WithMockUser(authorities = "USER")
    public void removePost_whenDeletePostReturnsTrue_deletePost() throws Exception {
        when(postServiceMock.deletePost(anyString(), anyString()))
                .thenReturn(CompletableFuture.completedFuture(true));

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.putIfAbsent("loggedInUserId", "1");
        requestBody.putIfAbsent("postToRemoveId", "2");

        this.mvc
                .perform(post("/post/remove")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonString(requestBody)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(TestUtil.TEXT_PLAIN_UTF8))
                .andExpect(jsonPath("$.success").value("true"))
                .andExpect(jsonPath("$.message").value("Post successfully deleted!"));

        verify(this.postServiceMock, times(1)).deletePost(anyString(), anyString());
        verifyNoMoreInteractions(this.postServiceMock);
    }


    @Test
    @WithMockUser(authorities = "USER")
    public void removePost_whenDeletePostReturnsFalse_throwCustomException() throws Exception {
        when(postServiceMock.deletePost(anyString(), anyString()))
                .thenReturn(CompletableFuture.completedFuture(false));

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.putIfAbsent("loggedInUserId", "1");
        requestBody.putIfAbsent("postToRemoveId", "2");

        Exception resolvedException = this.mvc
                .perform(post("/post/remove")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonString(requestBody)))
                .andDo(print())
                .andExpect(status().isInternalServerError())
                .andReturn().getResolvedException();

        Assert.assertEquals(SERVER_ERROR_MESSAGE, resolvedException.getMessage());
        Assert.assertEquals(CustomException.class, resolvedException.getClass());

        verify(postServiceMock, times(1)).deletePost(anyString(), anyString());
        verifyNoMoreInteractions(postServiceMock);
    }
}
