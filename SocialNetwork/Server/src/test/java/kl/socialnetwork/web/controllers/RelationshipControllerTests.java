package kl.socialnetwork.web.controllers;

import kl.socialnetwork.domain.entities.User;
import kl.socialnetwork.domain.models.serviceModels.RelationshipServiceModel;
import kl.socialnetwork.domain.models.viewModels.relationship.FriendsCandidatesViewModel;
import kl.socialnetwork.services.RelationshipService;
import kl.socialnetwork.testUtils.RelationshipsUtils;
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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static kl.socialnetwork.utils.constants.ResponseMessageConstants.*;
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
public class RelationshipControllerTests {
    private MockMvc mvc;

    @Autowired
    private WebApplicationContext context;

    @MockBean
    private RelationshipService mockRelationshipService;

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
        Assert.assertNotNull(context.getBean("relationshipController"));
    }

    @Test()
    public void findAllFriends_whenUnAuthorized_403Forbidden() throws Exception {
        this.mvc
                .perform(get("/relationship/friends/{id}", "1"))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    public void findAllFriends_when2Friends_2Friends() throws Exception {
        List<User> users = UsersUtils.getUsers(3);
        User userOne = users.get(0);
        User userTwo = users.get(1);
        User userThree = users.get(2);

        RelationshipServiceModel firstRelationshipServiceModel = RelationshipsUtils.getRelationshipServiceModel(userOne, userTwo, 1, userOne);
        RelationshipServiceModel secondRelationshipServiceModel = RelationshipsUtils.getRelationshipServiceModel(userThree, userOne, 1, userThree);

        when(this.mockRelationshipService.findAllUserRelationshipsWithStatus(anyString()))
                .thenReturn(List.of(firstRelationshipServiceModel, secondRelationshipServiceModel));

        this.mvc
                .perform(get("/relationship/friends/{id}", "1"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(content().contentTypeCompatibleWith("application/json"))
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is("2")))
                .andExpect(jsonPath("$[0].username", is("pesho 1")))
                .andExpect(jsonPath("$[0].firstName", is("Pesho 1")))
                .andExpect(jsonPath("$[0].lastName", is("Peshov 1")))
                .andExpect(jsonPath("$[0].profilePicUrl", is("profilePic 1")))
                .andExpect(jsonPath("$[0].backgroundImageUrl", is("backgroundPic 1")))
                .andExpect(jsonPath("$[1].id", is("3")))
                .andExpect(jsonPath("$[1].username", is("pesho 2")))
                .andExpect(jsonPath("$[1].firstName", is("Pesho 2")))
                .andExpect(jsonPath("$[1].lastName", is("Peshov 2")))
                .andExpect(jsonPath("$[1].profilePicUrl", is("profilePic 2")))
                .andExpect(jsonPath("$[1].backgroundImageUrl", is("backgroundPic 2")));

        verify(this.mockRelationshipService, times(1)).findAllUserRelationshipsWithStatus(anyString());
        verifyNoMoreInteractions(this.mockRelationshipService);
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    public void findAllFriends_whenZeroFriends_returnEmptyCollection() throws Exception {

        when(this.mockRelationshipService.findAllUserRelationshipsWithStatus(anyString()))
                .thenReturn(new ArrayList<>());

        this.mvc
                .perform(get("/relationship/friends/{id}", "1"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(content().contentTypeCompatibleWith("application/json"))
                .andExpect(jsonPath("$", hasSize(0)));


        verify(mockRelationshipService).findAllUserRelationshipsWithStatus(anyString());
        verify(mockRelationshipService, times(1)).findAllUserRelationshipsWithStatus(anyString());
        verifyNoMoreInteractions(mockRelationshipService);
    }

    // findAllNotFriends

    @Test()
    public void findAllNotFriends_whenUnAuthorized_403Forbidden() throws Exception {
        this.mvc
                .perform(get("/relationship/findFriends/{id}", "1"))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    public void findAllNotFriends_when2NotFriends_2NotFriends() throws Exception {
        List<FriendsCandidatesViewModel> friendsCandidatesViewModel = RelationshipsUtils.getFriendsCandidatesViewModel(2);

        when(this.mockRelationshipService.findAllFriendCandidates(anyString()))
                .thenReturn(friendsCandidatesViewModel);

        this.mvc
                .perform(get("/relationship/findFriends/{id}", "1"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(content().contentTypeCompatibleWith("application/json"))
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is("1")))
                .andExpect(jsonPath("$[0].username", is("pesho 0")))
                .andExpect(jsonPath("$[0].firstName", is("Pesho 0")))
                .andExpect(jsonPath("$[0].lastName", is("Peshov 0")))
                .andExpect(jsonPath("$[0].profilePicUrl", is("profilePic 0")))
                .andExpect(jsonPath("$[0].backgroundImageUrl", is("backgroundPic 0")))
                .andExpect(jsonPath("$[0].starterOfAction", is(false)))
                .andExpect(jsonPath("$[0].status", is(2)))
                .andExpect(jsonPath("$[1].id", is("2")))
                .andExpect(jsonPath("$[1].username", is("pesho 1")))
                .andExpect(jsonPath("$[1].firstName", is("Pesho 1")))
                .andExpect(jsonPath("$[1].lastName", is("Peshov 1")))
                .andExpect(jsonPath("$[1].profilePicUrl", is("profilePic 1")))
                .andExpect(jsonPath("$[1].backgroundImageUrl", is("backgroundPic 1")))
                .andExpect(jsonPath("$[0].starterOfAction", is(false)))
                .andExpect(jsonPath("$[0].status", is(2)));

        verify(this.mockRelationshipService, times(1)).findAllFriendCandidates(anyString());
        verifyNoMoreInteractions(this.mockRelationshipService);
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    public void findAllNotFriends_whenZeroNotFriends_returnEmptyCollection() throws Exception {

        when(this.mockRelationshipService.findAllFriendCandidates(anyString()))
                .thenReturn(new ArrayList<>());

        this.mvc
                .perform(get("/relationship/findFriends/{id}", "1"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(content().contentTypeCompatibleWith("application/json"))
                .andExpect(jsonPath("$", hasSize(0)));


        verify(mockRelationshipService).findAllFriendCandidates(anyString());
        verify(mockRelationshipService, times(1)).findAllFriendCandidates(anyString());
        verifyNoMoreInteractions(mockRelationshipService);
    }

    // addFriend

    @Test()
    public void addFriend_whenUnAuthorized_403Forbidden() throws Exception {
        Map<String, Object> body = new HashMap<>();
        body.put("loggedInUserId", "1");
        body.put("friendCandidateId", "2");

        this.mvc
                .perform(post("/relationship/addFriend")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonString(body)))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    public void addFriend_whenCreateRequestForAddingFriendReturnsTrue_addFriend() throws Exception {
        Map<String, Object> body = new HashMap<>();
        body.put("loggedInUserId", "1");
        body.put("friendCandidateId", "2");

        when(mockRelationshipService.createRequestForAddingFriend(anyString(), anyString()))
                .thenReturn(true);

        this.mvc
                .perform(post("/relationship/addFriend")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonString(body)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(TestUtil.TEXT_PLAIN_UTF8))
                .andExpect(jsonPath("$.success").value("true"))
                .andExpect(jsonPath("$.message").value(SUCCESSFUL_FRIEND_REQUEST_SUBMISSION_MESSAGE));

        verify(mockRelationshipService, times(1)).createRequestForAddingFriend(anyString(), anyString());
        verifyNoMoreInteractions(mockRelationshipService);
    }

    @Test
    @WithMockUser(authorities = "ROOT")
    public void addFriend_whenCreateRequestForAddingFriendReturnsFalse_throwException() throws Exception {
        Map<String, Object> body = new HashMap<>();
        body.put("loggedInUserId", "1");
        body.put("friendCandidateId", "2");

        when(mockRelationshipService.createRequestForAddingFriend(anyString(), anyString()))
                .thenReturn(false);

        Exception resolvedException = this.mvc
                .perform(post("/relationship/addFriend")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonString(body)))
                .andDo(print())
                .andExpect(status().isInternalServerError())
                .andReturn().getResolvedException();

        Assert.assertEquals(SERVER_ERROR_MESSAGE, resolvedException.getMessage());
        Assert.assertEquals(CustomException.class, resolvedException.getClass());

        verify(mockRelationshipService, times(1)).createRequestForAddingFriend(anyString(), anyString());
        verifyNoMoreInteractions(mockRelationshipService);
    }

    // removeFriend

    @Test()
    public void removeFriend_whenUnAuthorized_403Forbidden() throws Exception {
        Map<String, Object> body = new HashMap<>();
        body.put("loggedInUserId", "1");
        body.put("friendToRemoveId", "2");

        this.mvc
                .perform(post("/relationship/removeFriend")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonString(body)))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    public void removeFriend_whenRemoveFriendReturnsTrue_removeFriend() throws Exception {
        Map<String, Object> body = new HashMap<>();
        body.put("loggedInUserId", "1");
        body.put("friendToRemoveId", "2");

        when(mockRelationshipService.removeFriend(anyString(), anyString()))
                .thenReturn(true);

        this.mvc
                .perform(post("/relationship/removeFriend")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonString(body)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(TestUtil.TEXT_PLAIN_UTF8))
                .andExpect(jsonPath("$.success").value("true"))
                .andExpect(jsonPath("$.message").value(SUCCESSFUL_FRIEND_REMOVE_MESSAGE));

        verify(mockRelationshipService, times(1)).removeFriend(anyString(), anyString());
        verifyNoMoreInteractions(mockRelationshipService);
    }

    @Test
    @WithMockUser(authorities = "ROOT")
    public void removeFriend_whenRemoveFriendReturnsFalse_throwException() throws Exception {
        Map<String, Object> body = new HashMap<>();
        body.put("loggedInUserId", "1");
        body.put("friendToRemoveId", "2");

        when(mockRelationshipService.removeFriend(anyString(), anyString()))
                .thenReturn(false);

        Exception resolvedException = this.mvc
                .perform(post("/relationship/removeFriend")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonString(body)))
                .andDo(print())
                .andExpect(status().isInternalServerError())
                .andReturn().getResolvedException();

        Assert.assertEquals(SERVER_ERROR_MESSAGE, resolvedException.getMessage());
        Assert.assertEquals(CustomException.class, resolvedException.getClass());

        verify(mockRelationshipService, times(1)).removeFriend(anyString(), anyString());
        verifyNoMoreInteractions(mockRelationshipService);
    }

//    acceptFriend

    @Test()
    public void acceptFriend_whenUnAuthorized_403Forbidden() throws Exception {
        Map<String, Object> body = new HashMap<>();
        body.put("loggedInUserId", "1");
        body.put("friendToAcceptId", "2");

        this.mvc
                .perform(post("/relationship/acceptFriend")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonString(body)))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    public void acceptFriend_whenAcceptFriendReturnsTrue_acceptFriend() throws Exception {
        Map<String, Object> body = new HashMap<>();
        body.put("loggedInUserId", "1");
        body.put("friendToAcceptId", "2");

        when(mockRelationshipService.acceptFriend(anyString(), anyString()))
                .thenReturn(true);

        this.mvc
                .perform(post("/relationship/acceptFriend")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonString(body)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(TestUtil.TEXT_PLAIN_UTF8))
                .andExpect(jsonPath("$.success").value("true"))
                .andExpect(jsonPath("$.message").value(SUCCESSFUL_ADDED_FRIEND_MESSAGE));

        verify(mockRelationshipService, times(1)).acceptFriend(anyString(), anyString());
        verifyNoMoreInteractions(mockRelationshipService);
    }

    @Test
    @WithMockUser(authorities = "ROOT")
    public void acceptFriend_whenAcceptFriendReturnsFalse_throwException() throws Exception {
        Map<String, Object> body = new HashMap<>();
        body.put("loggedInUserId", "1");
        body.put("friendToAcceptId", "2");

        when(mockRelationshipService.acceptFriend(anyString(), anyString()))
                .thenReturn(false);

        Exception resolvedException = this.mvc
                .perform(post("/relationship/acceptFriend")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonString(body)))
                .andDo(print())
                .andExpect(status().isInternalServerError())
                .andReturn().getResolvedException();

        Assert.assertEquals(SERVER_ERROR_MESSAGE, resolvedException.getMessage());
        Assert.assertEquals(CustomException.class, resolvedException.getClass());

        verify(mockRelationshipService, times(1)).acceptFriend(anyString(), anyString());
        verifyNoMoreInteractions(mockRelationshipService);
    }

    // cancelFriendshipRequest

    @Test()
    public void cancelFriendshipRequest_whenUnAuthorized_403Forbidden() throws Exception {
        Map<String, Object> body = new HashMap<>();
        body.put("loggedInUserId", "1");
        body.put("friendToRejectId", "2");

        this.mvc
                .perform(post("/relationship/cancelRequest")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonString(body)))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    public void cancelFriendshipRequest_whenCancelFriendshipRequestReturnsTrue_acceptFriend() throws Exception {
        Map<String, Object> body = new HashMap<>();
        body.put("loggedInUserId", "1");
        body.put("friendToRejectId", "2");

        when(mockRelationshipService.cancelFriendshipRequest(anyString(), anyString()))
                .thenReturn(true);

        this.mvc
                .perform(post("/relationship/cancelRequest")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonString(body)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(TestUtil.TEXT_PLAIN_UTF8))
                .andExpect(jsonPath("$.success").value("true"))
                .andExpect(jsonPath("$.message").value(SUCCESSFUL_REJECT_FRIEND_REQUEST_MESSAGE));

        verify(mockRelationshipService, times(1)).cancelFriendshipRequest(anyString(), anyString());
        verifyNoMoreInteractions(mockRelationshipService);
    }

    @Test
    @WithMockUser(authorities = "ROOT")
    public void cancelFriendshipRequest_whenCancelFriendshipRequestReturnsFalse_throwException() throws Exception {
        Map<String, Object> body = new HashMap<>();
        body.put("loggedInUserId", "1");
        body.put("friendToRejectId", "2");

        when(mockRelationshipService.cancelFriendshipRequest(anyString(), anyString()))
                .thenReturn(false);

        Exception resolvedException = this.mvc
                .perform(post("/relationship/cancelRequest")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonString(body)))
                .andDo(print())
                .andExpect(status().isInternalServerError())
                .andReturn().getResolvedException();

        Assert.assertEquals(SERVER_ERROR_MESSAGE, resolvedException.getMessage());
        Assert.assertEquals(CustomException.class, resolvedException.getClass());

        verify(mockRelationshipService, times(1)).cancelFriendshipRequest(anyString(), anyString());
        verifyNoMoreInteractions(mockRelationshipService);
    }

//    searchUsers

    @Test()
    public void searchUsers_whenUnAuthorized_403Forbidden() throws Exception {
        Map<String, Object> body = new HashMap<>();
        body.put("loggedInUserId", "1");
        body.put("search", "test_username");

        this.mvc
                .perform(post("/relationship/search")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonString(body)))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    public void searchUsers_when2Users_2Users() throws Exception {
        Map<String, Object> body = new HashMap<>();
        body.put("loggedInUserId", "1");
        body.put("search", "test_username");

        List<FriendsCandidatesViewModel> friendsCandidatesViewModel = RelationshipsUtils.getFriendsCandidatesViewModel(2);

        when(this.mockRelationshipService.searchUsers(anyString(), anyString()))
                .thenReturn(friendsCandidatesViewModel);

        this.mvc
                .perform(post("/relationship/search")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonString(body)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(content().contentTypeCompatibleWith("application/json"))
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is("1")))
                .andExpect(jsonPath("$[0].username", is("pesho 0")))
                .andExpect(jsonPath("$[0].firstName", is("Pesho 0")))
                .andExpect(jsonPath("$[0].lastName", is("Peshov 0")))
                .andExpect(jsonPath("$[0].profilePicUrl", is("profilePic 0")))
                .andExpect(jsonPath("$[0].backgroundImageUrl", is("backgroundPic 0")))
                .andExpect(jsonPath("$[0].starterOfAction", is(false)))
                .andExpect(jsonPath("$[0].status", is(2)))
                .andExpect(jsonPath("$[1].id", is("2")))
                .andExpect(jsonPath("$[1].username", is("pesho 1")))
                .andExpect(jsonPath("$[1].firstName", is("Pesho 1")))
                .andExpect(jsonPath("$[1].lastName", is("Peshov 1")))
                .andExpect(jsonPath("$[1].profilePicUrl", is("profilePic 1")))
                .andExpect(jsonPath("$[1].backgroundImageUrl", is("backgroundPic 1")))
                .andExpect(jsonPath("$[0].starterOfAction", is(false)))
                .andExpect(jsonPath("$[0].status", is(2)));

        verify(this.mockRelationshipService, times(1)).searchUsers(anyString(), anyString());
        verifyNoMoreInteractions(this.mockRelationshipService);
    }

    @Test
    @WithMockUser(authorities = "ADMIN")
    public void searchUsers_whenZeroUsers_returnEmptyCollection() throws Exception {
        Map<String, Object> body = new HashMap<>();
        body.put("loggedInUserId", "1");
        body.put("search", "test_username");

        when(this.mockRelationshipService.searchUsers(anyString(), anyString()))
                .thenReturn(new ArrayList<>());

        this.mvc
                .perform(post("/relationship/search")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .content(TestUtil.convertObjectToJsonString(body)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(content().contentTypeCompatibleWith("application/json"))
                .andExpect(jsonPath("$", hasSize(0)));

        verify(mockRelationshipService, times(1)).searchUsers(anyString(), anyString());
        verifyNoMoreInteractions(mockRelationshipService);
    }
}
