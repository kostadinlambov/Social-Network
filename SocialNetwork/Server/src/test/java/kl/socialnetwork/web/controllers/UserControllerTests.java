package kl.socialnetwork.web.controllers;


import kl.socialnetwork.domain.entities.User;
import kl.socialnetwork.domain.entities.UserRole;
import kl.socialnetwork.domain.modles.serviceModels.UserServiceModel;
import kl.socialnetwork.services.UserService;
import kl.socialnetwork.testUtils.RolesUtils;
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
import java.util.List;

import static kl.socialnetwork.utils.constants.ResponseMessageConstants.SERVER_ERROR_MESSAGE;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
@WebAppConfiguration
@SpringBootTest
//@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class UserControllerTests {
    private MockMvc mvc;

    @Autowired
    private WebApplicationContext context;

    @MockBean
    private UserService userServiceMock;

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
        Assert.assertNotNull(context.getBean("userController"));
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    public void getAllUsers_when2Users_2Users() throws Exception {
        UserRole adminRole = RolesUtils.createAdminRole();
        List<User> users = UsersUtils.getUsers(2);
        List<UserServiceModel> userServiceModels = UsersUtils.getUserServiceModels(2, adminRole);

        when(this.userServiceMock.getAllUsers("1"))
                .thenReturn(userServiceModels);

        this.mvc
                .perform(get("/users/all/{id}", "1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(content().contentTypeCompatibleWith("application/json"))
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is("1")))
                .andExpect(jsonPath("$[0].username", is("pesho 0")))
                .andExpect(jsonPath("$[0].role", is("ADMIN")))
                .andExpect(jsonPath("$[1].id", is("2")))
                .andExpect(jsonPath("$[1].username", is("pesho 1")))
                .andExpect(jsonPath("$[1].role", is("ADMIN")));

        verify(this.userServiceMock, times(1)).getAllUsers("1");
        verifyNoMoreInteractions(this.userServiceMock);
    }



    @Test()
    @WithMockUser(authorities = "ADMIN")
    public void getAllUsers_whenGetAllUsersThrowsException_throwCustomException() throws Exception {
        when(this.userServiceMock.getAllUsers("1"))
                .thenThrow(new CustomException(SERVER_ERROR_MESSAGE));

        Exception resolvedException = this.mvc
                .perform(get("/users/all/{id}", "1"))
                .andExpect(status().isInternalServerError())
                .andReturn().getResolvedException();

        Assert.assertEquals(SERVER_ERROR_MESSAGE, resolvedException.getMessage());
        Assert.assertEquals(CustomException.class, resolvedException.getClass());

        verify(userServiceMock, times(1)).getAllUsers("1");
        verifyNoMoreInteractions(userServiceMock);
    }

    @Test()
    public void getAllUsers_whenUnAuthorized_403Forbidden() throws Exception {
        this.mvc
                .perform(get("/users/all/{id}", "1"))
                .andExpect(status().isForbidden());
    }

    @Test()
    @WithMockUser(authorities = "USER")
    public void getAllUsers_whenWrongAuthority_403Forbidden() throws Exception {
        this.mvc
                .perform(get("/users/all/{id}", "1"))
                .andExpect(status().isForbidden());
    }
//
//
//    @Test
//    @WithMockUser(authorities = "USER")
//    public void createPost_whenInputsAreValid_createPost() throws Exception {
//        PostCreateBindingModel postCreateBindingModel = PostsUtils.getPostCreateBindingModels(1).get(0);
//
//        when(postServiceMock.createPost(any(PostCreateBindingModel.class)))
//                .thenReturn(true);
//
//        this.mvc
//                .perform(post("/post/create")
//                        .contentType(MediaType.APPLICATION_JSON_UTF8)
//                        .content(TestUtil.convertObjectToJsonString(postCreateBindingModel)))
//                .andDo(print())
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(TestUtil.TEXT_PLAIN_UTF8))
//                .andExpect(jsonPath("$.success").value("true"))
//                .andExpect(jsonPath("$.message").value(SUCCESSFUL_CREATE_POST_MESSAGE));
//
//        verify(this.postServiceMock, times(1)).createPost(any());
//        verifyNoMoreInteractions(this.postServiceMock);
//    }
//
//    @Test
//    @WithMockUser(authorities = "USER")
//    public void createPost_whenCreatePostReturnsFalse_throwCustomException() throws Exception {
//        PostCreateBindingModel postCreateBindingModel = PostsUtils.getPostCreateBindingModels(1).get(0);
//
//        when(postServiceMock.createPost(any(PostCreateBindingModel.class)))
//                .thenReturn(false);
//
//        Exception resolvedException = this.mvc
//                .perform(post("/post/create")
//                        .contentType(MediaType.APPLICATION_JSON_UTF8)
//                        .content(TestUtil.convertObjectToJsonString(postCreateBindingModel)))
//                .andDo(print())
//                .andExpect(status().isInternalServerError())
//                .andReturn().getResolvedException();
//
//        Assert.assertEquals(SERVER_ERROR_MESSAGE, resolvedException.getMessage());
//        Assert.assertEquals(CustomException.class, resolvedException.getClass());
//
//        verify(postServiceMock, times(1)).createPost(any());
//        verifyNoMoreInteractions(postServiceMock);
//    }
//
//    @Test
//    @WithMockUser(authorities = "USER")
//    public void removePost_whenDeletePostReturnsTrue_deletePost() throws Exception {
//        when(postServiceMock.deletePost(anyString(), anyString()))
//                .thenReturn(true);
//
//        Map<String, Object> requestBody = new HashMap<>();
//        requestBody.putIfAbsent("loggedInUserId", "1");
//        requestBody.putIfAbsent("postToRemoveId", "2");
//
//        this.mvc
//                .perform(post("/post/remove")
//                        .contentType(MediaType.APPLICATION_JSON_UTF8)
//                        .content(TestUtil.convertObjectToJsonString(requestBody)))
//                .andDo(print())
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(TestUtil.TEXT_PLAIN_UTF8))
//                .andExpect(jsonPath("$.success").value("true"))
//                .andExpect(jsonPath("$.message").value("Post successfully deleted!"));
//
//        verify(this.postServiceMock, times(1)).deletePost(anyString(), anyString());
//        verifyNoMoreInteractions(this.postServiceMock);
//    }
//
//
//    @Test
//    @WithMockUser(authorities = "USER")
//    public void removePost_whenDeletePostReturnsFalse_throwCustomException() throws Exception {
//        when(postServiceMock.deletePost(anyString(), anyString()))
//                .thenReturn(false);
//
//        Map<String, Object> requestBody = new HashMap<>();
//        requestBody.putIfAbsent("loggedInUserId", "1");
//        requestBody.putIfAbsent("postToRemoveId", "2");
//
//        Exception resolvedException = this.mvc
//                .perform(post("/post/remove")
//                        .contentType(MediaType.APPLICATION_JSON_UTF8)
//                        .content(TestUtil.convertObjectToJsonString(requestBody)))
//                .andDo(print())
//                .andExpect(status().isInternalServerError())
//                .andReturn().getResolvedException();
//
//        Assert.assertEquals(SERVER_ERROR_MESSAGE, resolvedException.getMessage());
//        Assert.assertEquals(CustomException.class, resolvedException.getClass());
//
//        verify(postServiceMock, times(1)).deletePost(anyString(), anyString());
//        verifyNoMoreInteractions(postServiceMock);
//    }

}
