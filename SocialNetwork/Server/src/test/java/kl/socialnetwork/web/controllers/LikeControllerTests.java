package kl.socialnetwork.web.controllers;

import kl.socialnetwork.services.LikeService;
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

import static kl.socialnetwork.utils.constants.ResponseMessageConstants.SERVER_ERROR_MESSAGE;
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
public class LikeControllerTests {
    private MockMvc mvc;

    @Autowired
    private WebApplicationContext context;

    @MockBean
    private LikeService likeServiceMock;

    @Before
    public void setup() {
        mvc = MockMvcBuilders
                .webAppContextSetup(context)
                .alwaysDo(print())
                .apply(springSecurity())
                .build();
    }

    @Test
    public void givenWac_whenServletContext_thenItProvidesLikeController() {
        ServletContext servletContext = context.getServletContext();

        Assert.assertNotNull(servletContext);
        Assert.assertTrue(servletContext instanceof MockServletContext);
        Assert.assertNotNull(context.getBean("likeController"));
    }

    @Test
    @WithMockUser(authorities = "USER")
    public void addLike_whenInputsAreValid_addsLike() throws Exception {
        when(likeServiceMock.addLike(anyString(), anyString()))
                .thenReturn(true);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.putIfAbsent("postId", "1");
        requestBody.putIfAbsent("loggedInUserId", "2");

        this.mvc
                .perform(post("/like/add")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonString(requestBody)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(TestUtil.TEXT_PLAIN_UTF8))
                .andExpect(jsonPath("$.success").value("true"))
                .andExpect(jsonPath("$.message").value("You liked a post!"));

        verify(this.likeServiceMock, times(1)).addLike(anyString(), anyString());
        verifyNoMoreInteractions(this.likeServiceMock);
    }


    @Test
    @WithMockUser(authorities = "USER")
    public void addLike_whenAddLikeReturnsFalse_throwCustomException() throws Exception {
        when(likeServiceMock.addLike(anyString(), anyString()))
                .thenReturn(false);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.putIfAbsent("postId", "1");
        requestBody.putIfAbsent("loggedInUserId", "2");

        Exception resolvedException = this.mvc
                .perform(post("/like/add")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonString(requestBody)))
                .andDo(print())
                .andExpect(status().isInternalServerError())
                .andReturn().getResolvedException();

        Assert.assertEquals(SERVER_ERROR_MESSAGE, resolvedException.getMessage());
        Assert.assertEquals(CustomException.class, resolvedException.getClass());

        verify(likeServiceMock, times(1)).addLike(anyString(), anyString());
        verifyNoMoreInteractions(likeServiceMock);
    }
}
