package kl.socialnetwork.web.controllers;

import kl.socialnetwork.domain.models.bindingModels.comment.CommentCreateBindingModel;
import kl.socialnetwork.services.CommentService;
import kl.socialnetwork.testUtils.CommentsUtils;
import kl.socialnetwork.testUtils.TestUtil;
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
import java.util.Map;
import java.util.concurrent.CompletableFuture;

import static kl.socialnetwork.utils.constants.ResponseMessageConstants.*;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
@WebAppConfiguration
@SpringBootTest
//@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class CommentControllerTests {
    private MockMvc mvc;

    @Autowired
    private WebApplicationContext context;

    @MockBean
    private CommentService commentServiceMock;

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
        Assert.assertNotNull(context.getBean("commentController"));
    }

    @Test()
    public void createComment_whenUnAuthorized_403Forbidden() throws Exception {
        this.mvc
                .perform(post("/comment/create"))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "USER")
    public void createComment_whenCreateCommentReturnsTrue_createComment() throws Exception {
        CommentCreateBindingModel commentCreateBindingModel = CommentsUtils.getCommentCreateBindingModel(1).get(0);

        when(commentServiceMock.createComment(any(CommentCreateBindingModel.class)))
                .thenReturn(true);

        this.mvc
                .perform(post("/comment/create")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonString(commentCreateBindingModel)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(TestUtil.TEXT_PLAIN_UTF8))
                .andExpect(jsonPath("$.success").value("true"))
                .andExpect(jsonPath("$.payload").value(""))
                .andExpect(jsonPath("$.message").value(SUCCESSFUL_CREATE_COMMENT_MESSAGE));

        verify(this.commentServiceMock, times(1)).createComment(any());
        verifyNoMoreInteractions(this.commentServiceMock);
    }

    @Test
    @WithMockUser(authorities = "USER")
    public void createComment_whenCreateCommentReturnsFalse_throwCustomException() throws Exception {
        CommentCreateBindingModel commentCreateBindingModel = CommentsUtils.getCommentCreateBindingModel(1).get(0);

        when(commentServiceMock.createComment(any(CommentCreateBindingModel.class)))
                .thenReturn(false);

        Exception resolvedException = this.mvc
                .perform(post("/comment/create")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonString(commentCreateBindingModel)))
                .andDo(print())
                .andExpect(status().isInternalServerError())
                .andReturn().getResolvedException();

        Assert.assertEquals(SERVER_ERROR_MESSAGE, resolvedException.getMessage());
        Assert.assertEquals(CustomException.class, resolvedException.getClass());

        verify(commentServiceMock, times(1)).createComment(any());
        verifyNoMoreInteractions(commentServiceMock);
    }

    @Test()
    public void removeComment_whenUnAuthorized_403Forbidden() throws Exception {
        this.mvc
                .perform(post("/comment/remove"))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "USER")
    public void removeComment_whenDeleteCommentReturnsTrue_deleteComment() throws Exception {
        when(commentServiceMock.deleteComment(anyString(), anyString()))
                .thenReturn(CompletableFuture.completedFuture(true));

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.putIfAbsent("loggedInUserId", "1");
        requestBody.putIfAbsent("commentToRemoveId", "2");

        this.mvc
                .perform(post("/comment/remove")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonString(requestBody)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(TestUtil.TEXT_PLAIN_UTF8))
                .andExpect(jsonPath("$.success").value("true"))
                .andExpect(jsonPath("$.payload").value(""))
                .andExpect(jsonPath("$.message").value(SUCCESSFUL_DELETE_COMMENT_MESSAGE));

        verify(this.commentServiceMock, times(1)).deleteComment(anyString(), anyString());
        verifyNoMoreInteractions(this.commentServiceMock);
    }


    @Test
    @WithMockUser(authorities = "USER")
    public void removeComment_whenDeleteCommentReturnsFalse_throwCustomException() throws Exception {
        when(commentServiceMock.deleteComment(anyString(), anyString()))
                .thenReturn(CompletableFuture.completedFuture(false));

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.putIfAbsent("loggedInUserId", "1");
        requestBody.putIfAbsent("commentToRemoveId", "2");

        Exception resolvedException = this.mvc
                .perform(post("/comment/remove")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonString(requestBody)))
                .andDo(print())
                .andExpect(status().isInternalServerError())
                .andReturn().getResolvedException();

        Assert.assertEquals(SERVER_ERROR_MESSAGE, resolvedException.getMessage());
        Assert.assertEquals(CustomException.class, resolvedException.getClass());

        verify(commentServiceMock, times(1)).deleteComment(anyString(), anyString());
        verifyNoMoreInteractions(commentServiceMock);
    }
}
