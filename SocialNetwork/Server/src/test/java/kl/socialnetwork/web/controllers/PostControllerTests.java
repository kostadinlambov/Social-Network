package kl.socialnetwork.web.controllers;


import kl.socialnetwork.config.ApplicationSecurityConfiguration;
import kl.socialnetwork.domain.entities.Like;
import kl.socialnetwork.domain.entities.Post;
import kl.socialnetwork.domain.entities.User;
import kl.socialnetwork.domain.modles.serviceModels.PostServiceModel;
import kl.socialnetwork.repositories.PostRepository;
import kl.socialnetwork.repositories.UserRepository;
import kl.socialnetwork.services.PostService;
import kl.socialnetwork.testUtils.PostsUtils;
import kl.socialnetwork.testUtils.UsersUtils;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
//@Import(ApplicationSecurityConfiguration.class)
//@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class PostControllerTests {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @MockBean
    private PostService postServiceMock;

    @Before
    public void init() {

    }

    @Test
    @WithMockUser()
    public void create_when2Posts_2Posts() throws Exception {
        List<User> users = UsersUtils.getUsers(2);
        List<PostServiceModel> posts = PostsUtils.getPostServiceModels(2, users.get(0), users.get(1));

        when(this.postServiceMock.getAllPosts("1"))
                .thenReturn(posts);

        this.mvc
                .perform(get("/post/all/{id}", "1"))
                .andExpect(status().isOk())
//                .andExpect(content().contentType("text/plain;charset=UTF-8"))
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].postId", is("1")))
                .andExpect(jsonPath("$[0].content", is("content 0 post")))
                .andExpect(jsonPath("$[1].postId", is("2")))
                .andExpect(jsonPath("$[1].content", is("content 1 post")));

        verify(this.postServiceMock, times(1)).getAllPosts("1");
        verifyNoMoreInteractions(this.postServiceMock);
    }


//    @Test
//    @WithMockUser()
//    public void getAllPosts_when2Posts_2Posts() throws Exception {
//        User firstUser = new User();
//        firstUser.setId("1");
//        firstUser.setFirstName("Pesho");
//        firstUser.setLastName("Peshov");
//        firstUser.setUsername("pesho");
//        firstUser.setEmail("pesho@abv.bg");
//        firstUser.setCity("Sofia");
//        firstUser.setProfilePicUrl("profilePic");
//        firstUser.setBackgroundImageUrl("backgroundPic");
//
//        User secondUser = new User();
//        secondUser.setId("2");
//        secondUser.setFirstName("Gosho");
//        secondUser.setLastName("Goshev");
//        secondUser.setUsername("gosho");
//        secondUser.setEmail("gosho@abv.bg");
//        secondUser.setCity("Plovdiv");
//        secondUser.setProfilePicUrl("profilePic2");
//        secondUser.setBackgroundImageUrl("backgroundPic2");
////
//        LocalDateTime time = LocalDateTime.now();
////
//        PostServiceModel firstPost = new PostServiceModel();
//        firstPost.setId("1");
//        firstPost.setContent("content first post");
//        firstPost.setTimelineUser(firstUser);
//        firstPost.setLoggedInUser(firstUser);
//        firstPost.setLike(null);
//        firstPost.setTime(time);
//        firstPost.setImageUrl("imageUrl");
//        firstPost.setCommentList(new ArrayList<>());
//
//        PostServiceModel secondPost = new PostServiceModel();
//        secondPost.setId("2");
//        secondPost.setContent("content second post");
//        secondPost.setTimelineUser(secondUser);
//        secondPost.setLoggedInUser(firstUser);
//        secondPost.setLike(null);
//        secondPost.setTime(time);
//        secondPost.setImageUrl("imageUrl second user");
//        secondPost.setCommentList(new ArrayList<>());
////
//        when(this.postServiceMock.getAllPosts("1"))
//                .thenReturn(Arrays.asList(firstPost, secondPost));
//
//        ResultActions resultActions = this.mvc
//                .perform(get("/post/all/{id}", "1"))
//                .andExpect(status().isOk())
//                .andExpect(content().contentType("application/json;charset=UTF-8"));
////                .andExpect(jsonPath("$", hasSize(2)))
////                .andExpect(jsonPath("$[0].id", is("1")))
////                .andExpect(jsonPath("$[0].content", is("content first post")));
//
//        verify(this.postServiceMock, times(1)).getAllPosts("1");
//        verifyNoMoreInteractions(this.postServiceMock);
//
//
//    }


}
