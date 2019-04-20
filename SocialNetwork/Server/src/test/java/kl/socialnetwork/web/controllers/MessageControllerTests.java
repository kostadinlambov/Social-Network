package kl.socialnetwork.web.controllers;

import kl.socialnetwork.domain.entities.Relationship;
import kl.socialnetwork.domain.entities.User;
import kl.socialnetwork.domain.models.bindingModels.message.MessageCreateBindingModel;
import kl.socialnetwork.domain.models.serviceModels.MessageServiceModel;
import kl.socialnetwork.domain.models.viewModels.message.MessageAllViewModel;
import kl.socialnetwork.domain.models.viewModels.message.MessageFriendsViewModel;
import kl.socialnetwork.services.MessageService;
import kl.socialnetwork.testUtils.*;
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
import java.util.List;

import static kl.socialnetwork.utils.constants.ResponseMessageConstants.SERVER_ERROR_MESSAGE;
import static kl.socialnetwork.utils.constants.ResponseMessageConstants.SUCCESSFUL_CREATE_MESSAGE_MESSAGE;
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
public class MessageControllerTests {
    private MockMvc mvc;

    @Autowired
    private WebApplicationContext context;

    @MockBean
    private MessageService mockMessageService;

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
        Assert.assertNotNull(context.getBean("messageController"));
    }

//    getAllMessages

    @Test()
    public void getAllMessages_whenUnAuthorized_403Forbidden() throws Exception {
        this.mvc
                .perform(get("/message/all/{id}", "1"))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "USER")
    public void getAllMessages_when2Messages_2Messages() throws Exception {
        List<User> users = UsersUtils.getUsers(2);
        User firstUser = users.get(0);
        User secondUser = users.get(1);

        Relationship relationship = RelationshipsUtils.createRelationship(firstUser, secondUser, 1, firstUser);

        List<MessageServiceModel> messageServiceModels = MessagesUtils.getMessageServiceModels(2, firstUser, secondUser, relationship);

        List<MessageAllViewModel> messageAllViewModels = MessagesUtils.getMessageAllViewModels(2);

        when(this.mockMessageService.getAllMessages(anyString(), anyString()))
                .thenReturn(messageServiceModels);

        this.mvc
                .perform(get("/message/all/{id}", "1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(content().contentTypeCompatibleWith("application/json"))
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(messageAllViewModels.get(0).getId())))
                .andExpect(jsonPath("$[0].fromUserId", is(messageAllViewModels.get(0).getFromUserId())))
                .andExpect(jsonPath("$[0].fromUserProfilePicUrl", is(messageAllViewModels.get(0).getFromUserProfilePicUrl())))
                .andExpect(jsonPath("$[0].content", is(messageAllViewModels.get(0).getContent())));

        verify(this.mockMessageService, times(1)).getAllMessages(anyString(), anyString());
        verifyNoMoreInteractions(this.mockMessageService);
    }

    @Test
    @WithMockUser(authorities = "USER")
    public void getAllMessages_when0Messages_EmptyCollection() throws Exception {
        // Arrange
        when(this.mockMessageService.getAllMessages(anyString(), anyString()))
                .thenReturn(new ArrayList<>());

        // Act
        this.mvc
                .perform(get("/message/all/{id}", "1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(content().contentTypeCompatibleWith("application/json"))
                .andExpect(jsonPath("$", hasSize(0)));

        verify(this.mockMessageService, times(1)).getAllMessages(anyString(), anyString());
        verifyNoMoreInteractions(this.mockMessageService);
    }

//    getAllFriendMessages

    @Test()
    public void getAllFriendMessages_whenUnAuthorized_403Forbidden() throws Exception {
        this.mvc
                .perform(get("/message/friend"))
                .andDo(print())
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(authorities = "USER")
    public void getAllFriendMessages_when2Messages_2Messages() throws Exception {
        List<MessageFriendsViewModel> messageFriendsViewModels = MessagesUtils.getMessageFriendsViewModels(2);

        when(this.mockMessageService.getAllFriendMessages(anyString()))
                .thenReturn(messageFriendsViewModels);

        this.mvc
                .perform(get("/message/friend"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(content().contentTypeCompatibleWith("application/json"))
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(messageFriendsViewModels.get(0).getId())))
                .andExpect(jsonPath("$[0].fromUserId", is(messageFriendsViewModels.get(0).getFromUserId())))
                .andExpect(jsonPath("$[0].fromUserProfilePicUrl", is(messageFriendsViewModels.get(0).getFromUserProfilePicUrl())))
                .andExpect(jsonPath("$[0].fromUserFirstName", is(messageFriendsViewModels.get(0).getFromUserFirstName())))
                .andExpect(jsonPath("$[0].fromUserLastName", is(messageFriendsViewModels.get(0).getFromUserLastName())))
                .andExpect(jsonPath("$[0].content", is(messageFriendsViewModels.get(0).getContent())))
                .andExpect(jsonPath("$[0].count", is(messageFriendsViewModels.get(0).getCount())));

        verify(this.mockMessageService, times(1)).getAllFriendMessages(anyString());
        verifyNoMoreInteractions(this.mockMessageService);
    }

    @Test
    @WithMockUser(authorities = "USER")
    public void getAllFriendMessages_when0Messages_EmptyCollection() throws Exception {
        when(this.mockMessageService.getAllFriendMessages(anyString()))
                .thenReturn(new ArrayList<>());

        this.mvc
                .perform(get("/message/friend"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(content().contentTypeCompatibleWith("application/json"))
                .andExpect(jsonPath("$", hasSize(0)));

        verify(this.mockMessageService, times(1)).getAllFriendMessages(anyString());
        verifyNoMoreInteractions(this.mockMessageService);
    }


//    createPrivateChatMessages

//
//    @Test()
//    public void createMessage_whenUnAuthorized_403Forbidden() throws Exception {
//        MessageCreateBindingModel messageCreateBindingModel = MessagesUtils.getMessageCreateBindingModel();
//
//        this.mvc
//                .perform(post("/message/create")
//                        .contentType(TestUtil.APPLICATION_JSON_UTF8)
//                        .content(TestUtil.convertObjectToJsonString(messageCreateBindingModel))
//                )
//                .andDo(print())
//                .andExpect(status().isForbidden());
//    }
//
//    @Test
//    @WithMockUser(authorities = "USER")
//    public void createMessage_whenInputsAreValid_createMessage() throws Exception {
//        MessageCreateBindingModel messageCreateBindingModel = MessagesUtils.getMessageCreateBindingModel();
//
//        when(mockMessageService.createMessage(any(MessageCreateBindingModel.class), anyString()))
//                .thenReturn(true);
//
//        this.mvc
//                .perform(post("/message/create")
//                        .contentType(MediaType.APPLICATION_JSON_UTF8)
//                        .content(TestUtil.convertObjectToJsonString(messageCreateBindingModel)))
//                .andDo(print())
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(TestUtil.TEXT_PLAIN_UTF8))
//                .andExpect(jsonPath("$.success").value("true"))
//                .andExpect(jsonPath("$.message").value(SUCCESSFUL_CREATE_MESSAGE_MESSAGE));
//
//        verify(this.mockMessageService, times(1)).createMessage(any(MessageCreateBindingModel.class), anyString());
//        verifyNoMoreInteractions(this.mockMessageService);
//    }
//
//    @Test
//    @WithMockUser(authorities = "USER")
//    public void createMessage_whenCreateMessageReturnsFalse_throwCustomException() throws Exception {
//        MessageCreateBindingModel messageCreateBindingModel = MessagesUtils.getMessageCreateBindingModel();
//
//        when(mockMessageService.createMessage(any(MessageCreateBindingModel.class), anyString()))
//                .thenReturn(false);
//
//        Exception resolvedException = this.mvc
//                .perform(post("/message/create")
//                        .contentType(MediaType.APPLICATION_JSON_UTF8)
//                        .content(TestUtil.convertObjectToJsonString(messageCreateBindingModel)))
//                .andDo(print())
//                .andExpect(status().isInternalServerError())
//                .andReturn().getResolvedException();
//
//        Assert.assertEquals(SERVER_ERROR_MESSAGE, resolvedException.getMessage());
//        Assert.assertEquals(CustomException.class, resolvedException.getClass());
//
//        verify(mockMessageService, times(1)).createMessage(any(MessageCreateBindingModel.class), anyString());
//        verifyNoMoreInteractions(mockMessageService);
//    }
}
