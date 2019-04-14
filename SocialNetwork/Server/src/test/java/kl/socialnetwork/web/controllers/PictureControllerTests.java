package kl.socialnetwork.web.controllers;

import kl.socialnetwork.domain.entities.User;
import kl.socialnetwork.domain.models.serviceModels.PictureServiceModel;
import kl.socialnetwork.services.PictureService;
import kl.socialnetwork.testUtils.PictureUtils;
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
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.mock.web.MockServletContext;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static kl.socialnetwork.utils.constants.ResponseMessageConstants.SERVER_ERROR_MESSAGE;
import static kl.socialnetwork.utils.constants.ResponseMessageConstants.SUCCESSFUL_PICTURE_DELETE_MESSAGE;
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
public class PictureControllerTests {
    private MockMvc mvc;

    @Autowired
    private WebApplicationContext context;

    @MockBean
    private PictureService pictureServiceMock;

    @Before
    public void setup() {
        mvc = MockMvcBuilders
                .webAppContextSetup(context)
                .alwaysDo(print())
                .apply(springSecurity())
                .build();
    }

    @Test
    public void givenWac_whenServletContext_thenItProvidesPictureController() {
        ServletContext servletContext = context.getServletContext();

        Assert.assertNotNull(servletContext);
        Assert.assertTrue(servletContext instanceof MockServletContext);
        Assert.assertNotNull(context.getBean("pictureController"));
    }

    @Test()
    public void getAllPictures_whenUnAuthorized_403Forbidden() throws Exception {
        this.mvc
                .perform(get("/pictures/all/{id}", "1"))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "USER")
    public void getAllPictures_when2Pictures_2Pictures() throws Exception {
        User users = UsersUtils.createUser();
        List<PictureServiceModel> pictures = PictureUtils.getPictureServiceModels(2, users);

        when(this.pictureServiceMock.getAllPicturesByUserId("1"))
                .thenReturn(pictures);

        this.mvc
                .perform(get("/pictures/all/{id}", "1"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(content().contentTypeCompatibleWith("application/json"))
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is("1")))
                .andExpect(jsonPath("$[0].userId", is("1")))
                .andExpect(jsonPath("$[0].description", is("description 0 picture")))
                .andExpect(jsonPath("$[0].imageUrl", is("imageUrl 0")))
                .andExpect(jsonPath("$[1].id", is("2")))
                .andExpect(jsonPath("$[1].userId", is("1")))
                .andExpect(jsonPath("$[1].description", is("description 1 picture")))
                .andExpect(jsonPath("$[1].imageUrl", is("imageUrl 1")));

        verify(this.pictureServiceMock, times(1)).getAllPicturesByUserId("1");
        verifyNoMoreInteractions(this.pictureServiceMock);
    }


    @Test()
    @WithMockUser(authorities = "USER")
    public void getAllPictures_whenGetAllPicturesByUserIdThrowsException_throwCustomException() throws Exception {
        when(this.pictureServiceMock.getAllPicturesByUserId("1"))
                .thenThrow(new NullPointerException());

        Exception resolvedException = this.mvc
                .perform(get("/pictures/all/{id}", "1"))
                .andDo(print())
                .andExpect(status().isInternalServerError())
                .andReturn().getResolvedException();

        Assert.assertEquals(SERVER_ERROR_MESSAGE, resolvedException.getMessage());
        Assert.assertEquals(CustomException.class, resolvedException.getClass());

        verify(pictureServiceMock, times(1)).getAllPicturesByUserId("1");
        verifyNoMoreInteractions(pictureServiceMock);
    }

    @Test()
    public void addPicture_whenUnAuthorized_403Forbidden() throws Exception {
        this.mvc
                .perform(MockMvcRequestBuilders.multipart("/pictures/add"))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "USER")
    public void addPicture_whenAddPictureReturnsTrue_addPicture() throws Exception {
        MockMultipartFile pictureFile =
                new MockMultipartFile("data", "filename.txt", "text/plain", "some xml".getBytes());

        when(pictureServiceMock.addPicture(anyString(), any(MultipartFile.class)))
                .thenReturn(true);

        this.mvc
                .perform(MockMvcRequestBuilders.multipart("/pictures/add")
                        .file("file", pictureFile.getBytes())
                        .param("loggedInUserId", "1"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(TestUtil.TEXT_PLAIN_UTF8))
                .andExpect(jsonPath("$.success").value("true"))
                .andExpect(jsonPath("$.message").value("Successfully uploaded picture!"));

        verify(this.pictureServiceMock, times(1)).addPicture(anyString(), any(MultipartFile.class));
        verifyNoMoreInteractions(this.pictureServiceMock);
    }

    @Test
    @WithMockUser(authorities = "USER")
    public void addPicture_whenAddPictureReturnsFalse_throwCustomException() throws Exception {
        MockMultipartFile pictureFile =
                new MockMultipartFile("data", "filename.txt", "text/plain", "some xml".getBytes());

        when(pictureServiceMock.addPicture(anyString(), any(MultipartFile.class)))
                .thenReturn(false);

        Exception resolvedException = this.mvc
                .perform(MockMvcRequestBuilders.multipart("/pictures/add")
                        .file("file", pictureFile.getBytes())
                        .param("loggedInUserId", "1"))
                .andDo(print())
                .andExpect(status().isInternalServerError())
                .andReturn().getResolvedException();

        Assert.assertEquals(SERVER_ERROR_MESSAGE, resolvedException.getMessage());
        Assert.assertEquals(CustomException.class, resolvedException.getClass());

        verify(pictureServiceMock, times(1)).addPicture(anyString(), any(MultipartFile.class));
        verifyNoMoreInteractions(pictureServiceMock);
    }

    @Test()
    public void removePicture_whenUnAuthorized_403Forbidden() throws Exception {
        this.mvc
                .perform(post("/pictures/remove"))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "USER")
    public void removePicture_whenDeletePictureReturnsTrue_deletePost() throws Exception {
        when(pictureServiceMock.deletePicture(anyString(), anyString()))
                .thenReturn(true);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.putIfAbsent("loggedInUserId", "1");
        requestBody.putIfAbsent("photoToRemoveId", "2");

        this.mvc
                .perform(post("/pictures/remove")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonString(requestBody)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(TestUtil.TEXT_PLAIN_UTF8))
                .andExpect(jsonPath("$.success").value("true"))
                .andExpect(jsonPath("$.message").value(SUCCESSFUL_PICTURE_DELETE_MESSAGE));

        verify(this.pictureServiceMock, times(1)).deletePicture(anyString(), anyString());
        verifyNoMoreInteractions(this.pictureServiceMock);
    }

    @Test
    @WithMockUser(authorities = "USER")
    public void removePicture_whenDeletePictureReturnsFalse_throwCustomException() throws Exception {
        when(pictureServiceMock.deletePicture(anyString(), anyString()))
                .thenReturn(false);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.putIfAbsent("loggedInUserId", "1");
        requestBody.putIfAbsent("photoToRemoveId", "2");

        Exception resolvedException = this.mvc
                .perform(post("/pictures/remove")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonString(requestBody)))
                .andDo(print())
                .andExpect(status().isInternalServerError())
                .andReturn().getResolvedException();

        Assert.assertEquals(SERVER_ERROR_MESSAGE, resolvedException.getMessage());
        Assert.assertEquals(CustomException.class, resolvedException.getClass());

        verify(pictureServiceMock, times(1)).deletePicture(anyString(), anyString());
        verifyNoMoreInteractions(pictureServiceMock);
    }
}
