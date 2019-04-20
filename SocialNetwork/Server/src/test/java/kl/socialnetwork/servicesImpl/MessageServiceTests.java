package kl.socialnetwork.servicesImpl;

import kl.socialnetwork.domain.entities.*;
import kl.socialnetwork.domain.models.bindingModels.message.MessageCreateBindingModel;
import kl.socialnetwork.domain.models.serviceModels.MessageServiceModel;
import kl.socialnetwork.domain.models.viewModels.message.MessageFriendsViewModel;
import kl.socialnetwork.repositories.MessageRepository;
import kl.socialnetwork.repositories.RelationshipRepository;
import kl.socialnetwork.repositories.UserRepository;
import kl.socialnetwork.services.MessageService;
import kl.socialnetwork.testUtils.*;
import kl.socialnetwork.utils.responseHandler.exceptions.CustomException;
import kl.socialnetwork.validations.serviceValidation.services.MessageValidationService;
import kl.socialnetwork.validations.serviceValidation.services.RelationshipValidationService;
import kl.socialnetwork.validations.serviceValidation.services.UserValidationService;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

import static kl.socialnetwork.utils.constants.ResponseMessageConstants.SERVER_ERROR_MESSAGE;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MessageServiceTests {

    @Autowired
    private MessageService messageService;

    @MockBean
    private MessageRepository mockMessageRepository;

    @MockBean
    private MessageValidationService mockMessageValidation;

    @MockBean
    private RelationshipValidationService mockRelationshipValidation;

    @MockBean
    private RelationshipRepository mockRelationshipRepository;

    @MockBean
    private UserRepository mockUserRepository;

    @MockBean
    private UserValidationService mockUserValidationService;

    @Rule
    public ExpectedException thrown = ExpectedException.none();

    private List<Message> messageList;

    @Before
    public void setUpTest() {
        messageList = new ArrayList<>();
    }

    @Test
    public void getAllMessages_when2Messages_2Messages() {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        User firstUser = users.get(0);
        User secondUser = users.get(1);
        Relationship relationship = RelationshipsUtils.createRelationship(firstUser, secondUser, 1, firstUser);
        List<Message> messages = MessagesUtils.getMessages(2, firstUser, secondUser, relationship);

        messageList.addAll(messages);

        when(mockUserRepository.findByUsername(anyString()))
                .thenReturn(java.util.Optional.ofNullable(firstUser));

        when(mockUserRepository.findById(anyString()))
                .thenReturn(java.util.Optional.ofNullable(secondUser));


        when(mockUserValidationService.isValid(any(User.class)))
                .thenReturn(true);

        when(mockMessageRepository.findAllMessagesBetweenTwoUsers(anyString(), anyString()))
                .thenReturn(messageList);


        // Act
        List<MessageServiceModel> allMessages = messageService.getAllMessages("username", "userId");

        // Assert
        Message expected = messageList.get(0);
        MessageServiceModel actual = allMessages.get(0);

        assertEquals(2, allMessages.size());
        assertEquals(expected.getContent(), actual.getContent());
        assertEquals(expected.getFromUser().getId(), actual.getFromUser().getId());
        assertEquals(expected.getToUser().getId(), actual.getToUser().getId());
        assertEquals(expected.getStatus(), actual.getStatus());
        assertEquals(expected.getSubject(), actual.getSubject());

        verify(mockMessageRepository).findAllMessagesBetweenTwoUsers(anyString(), anyString());
        verify(mockMessageRepository, times(1)).findAllMessagesBetweenTwoUsers(anyString(), anyString());
    }

    @Test
    public void getAllMessages_whenZeroMessages_returnEmptyCollection() {
        // Arrange
        messageList.clear();

        List<User> users = UsersUtils.getUsers(2);
        User firstUser = users.get(0);
        User secondUser = users.get(1);

        when(mockUserRepository.findByUsername(anyString()))
                .thenReturn(java.util.Optional.ofNullable(firstUser));

        when(mockUserRepository.findById(anyString()))
                .thenReturn(java.util.Optional.ofNullable(secondUser));

        when(mockUserValidationService.isValid(any(User.class)))
                .thenReturn(true);

        when(mockMessageRepository.findAllMessagesBetweenTwoUsers(anyString(), anyString()))
                .thenReturn(messageList);

        // Act
        List<MessageServiceModel> allMessages = messageService.getAllMessages("username", "userId");

        // Assert
        assertTrue(allMessages.isEmpty());
        verify(mockMessageRepository).findAllMessagesBetweenTwoUsers(anyString(), anyString());
        verify(mockMessageRepository, times(1)).findAllMessagesBetweenTwoUsers(anyString(), anyString());
    }

    @Test
    public void getAllMessages_whenFromUserIsNotValid_throwException() {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        User firstUser = users.get(0);
        User secondUser = users.get(1);
        Relationship relationship = RelationshipsUtils.createRelationship(firstUser, secondUser, 1, firstUser);
        List<Message> messages = MessagesUtils.getMessages(2, firstUser, secondUser, relationship);

        messageList.addAll(messages);

        when(mockUserRepository.findByUsername(anyString()))
                .thenReturn(java.util.Optional.ofNullable(firstUser));

        when(mockUserRepository.findById(anyString()))
                .thenReturn(java.util.Optional.ofNullable(secondUser));

        when(mockUserValidationService.isValid(firstUser))
                .thenReturn(false);

        when(mockUserValidationService.isValid(secondUser))
                .thenReturn(true);

        when(mockMessageRepository.findAllMessagesBetweenTwoUsers(anyString(), anyString()))
                .thenReturn(messageList);

        thrown.expect(CustomException.class);
        thrown.expectMessage(SERVER_ERROR_MESSAGE);

        // Act
        List<MessageServiceModel> allMessages = messageService.getAllMessages("username", "userId");
    }

    @Test
    public void getAllMessages_whenToUserIsNotValid_throwException() {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        User firstUser = users.get(0);
        User secondUser = users.get(1);
        Relationship relationship = RelationshipsUtils.createRelationship(firstUser, secondUser, 1, firstUser);
        List<Message> messages = MessagesUtils.getMessages(2, firstUser, secondUser, relationship);

        messageList.addAll(messages);

        when(mockUserRepository.findByUsername(anyString()))
                .thenReturn(java.util.Optional.ofNullable(firstUser));

        when(mockUserRepository.findById(anyString()))
                .thenReturn(java.util.Optional.ofNullable(secondUser));

        when(mockUserValidationService.isValid(firstUser))
                .thenReturn(true);

        when(mockUserValidationService.isValid(secondUser))
                .thenReturn(false);

        when(mockMessageRepository.findAllMessagesBetweenTwoUsers(anyString(), anyString()))
                .thenReturn(messageList);

        thrown.expect(CustomException.class);
        thrown.expectMessage(SERVER_ERROR_MESSAGE);

        // Act
        List<MessageServiceModel> allMessages = messageService.getAllMessages("username", "userId");
    }

    //    getAllFriendMessages
    @Test
    public void getAllFriendMessages_when2Messages_2Messages() {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        User firstUser = users.get(0);
        User secondUser = users.get(1);
        User thirdUser = UsersUtils.createUser();
        thirdUser.setId("5");
        User fourthUser = UsersUtils.createUser();
        thirdUser.setId("6");

        Relationship relationship = RelationshipsUtils.createRelationship(firstUser, secondUser, 1, firstUser);
        List<Message> messages = MessagesUtils.getMessages(2, firstUser, secondUser, relationship);
        Message message3 = MessagesUtils.createMessage(thirdUser, firstUser, relationship);
        Message message4 = MessagesUtils.createMessage(fourthUser, thirdUser, relationship);

        messageList.addAll(messages);
        messageList.add(message3);
        messageList.add(message4);

        List<MessageFriendsViewModel> messageFriendsViewModels = MessagesUtils.getMessageFriendsViewModels(4);
        List<Object[]> countOfUnreadMessagesObjectArr = MessagesUtils.getCountOfUnreadMessagesObjectArr(2);

        when(mockUserRepository.findByUsername(anyString()))
                .thenReturn(java.util.Optional.ofNullable(firstUser));

        when(mockUserValidationService.isValid(any(User.class)))
                .thenReturn(true);

        when(mockMessageRepository.getAllUnreadMessages(anyString()))
                .thenReturn(messageList);

        when(mockMessageRepository.getCountOfUnreadMessagesByFromUser(anyString()))
                .thenReturn(countOfUnreadMessagesObjectArr);

        // Act
        List<MessageFriendsViewModel> allFriendMessages = messageService.getAllFriendMessages("userId");

        // Assert
        MessageFriendsViewModel expected = messageFriendsViewModels.get(0);
        MessageFriendsViewModel actual = allFriendMessages.get(0);

        assertEquals(4, allFriendMessages.size());
        assertEquals(expected.getContent(), actual.getContent());
        assertEquals(expected.getFromUserId(), actual.getFromUserId());
        assertEquals(1, actual.getCount());

        verify(mockMessageRepository).getAllUnreadMessages(anyString());
        verify(mockMessageRepository, times(1)).getAllUnreadMessages(anyString());
    }

    @Test
    public void getAllFriendMessages_whenZeroFriendsMessages_returnEmptyCollection() {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        User firstUser = users.get(0);
        User secondUser = users.get(1);
        User thirdUser = UsersUtils.createUser();
        thirdUser.setId("5");
        User fourthUser = UsersUtils.createUser();
        thirdUser.setId("6");

        Relationship relationship = RelationshipsUtils.createRelationship(firstUser, secondUser, 0, firstUser);
        List<Message> messages = MessagesUtils.getMessages(2, firstUser, secondUser, relationship);
        Message message3 = MessagesUtils.createMessage(thirdUser, firstUser, relationship);
        Message message4 = MessagesUtils.createMessage(fourthUser, thirdUser, relationship);

        messageList.addAll(messages);
        messageList.add(message3);
        messageList.add(message4);

        List<MessageFriendsViewModel> messageFriendsViewModels = MessagesUtils.getMessageFriendsViewModels(4);
        List<Object[]> countOfUnreadMessagesObjectArr = MessagesUtils.getCountOfUnreadMessagesObjectArr(2);

        when(mockUserRepository.findByUsername(anyString()))
                .thenReturn(java.util.Optional.ofNullable(firstUser));

        when(mockUserValidationService.isValid(any(User.class)))
                .thenReturn(true);

        when(mockMessageRepository.getAllUnreadMessages(anyString()))
                .thenReturn(messageList);

        when(mockMessageRepository.getCountOfUnreadMessagesByFromUser(anyString()))
                .thenReturn(countOfUnreadMessagesObjectArr);

        // Act
        List<MessageFriendsViewModel> allFriendMessages = messageService.getAllFriendMessages("userId");

        // Assert
        assertTrue(allFriendMessages.isEmpty());

        verify(mockMessageRepository).getAllUnreadMessages(anyString());
        verify(mockMessageRepository, times(1)).getAllUnreadMessages(anyString());
    }

    @Test
    public void getAllFriendMessages_whenZeroMessages_returnEmptyCollection() {
        // Arrange
        messageList.clear();

        List<User> users = UsersUtils.getUsers(2);
        User firstUser = users.get(0);

        List<Object[]> countOfUnreadMessagesObjectArr = MessagesUtils.getCountOfUnreadMessagesObjectArr(2);

        when(mockUserRepository.findByUsername(anyString()))
                .thenReturn(java.util.Optional.ofNullable(firstUser));

        when(mockUserValidationService.isValid(any(User.class)))
                .thenReturn(true);

        when(mockMessageRepository.getAllUnreadMessages(anyString()))
                .thenReturn(messageList);

        when(mockMessageRepository.getCountOfUnreadMessagesByFromUser(anyString()))
                .thenReturn(countOfUnreadMessagesObjectArr);

        // Act
        List<MessageFriendsViewModel> allFriendMessages = messageService.getAllFriendMessages("username");

        // Assert
        assertTrue(allFriendMessages.isEmpty());

        verify(mockMessageRepository).getAllUnreadMessages(anyString());
        verify(mockMessageRepository, times(1)).getAllUnreadMessages(anyString());
    }

    @Test
    public void getAllFriendMessages_whenUserIsNotValid_throwException() {
        // Arrange
        when(mockUserRepository.findByUsername(anyString()))
                .thenReturn(java.util.Optional.of(new User()));

        when(mockUserValidationService.isValid(any(User.class)))
                .thenReturn(false);

        thrown.expect(CustomException.class);
        thrown.expectMessage(SERVER_ERROR_MESSAGE);

        // Act
        messageService.getAllFriendMessages("userId");
    }

    // createMessage

    @Test
    public void createMessage_whenAllInputsAreValid_createMessage() throws Exception {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        Relationship relationship = RelationshipsUtils.createRelationship(users.get(0), users.get(1), 1, users.get(0));
        MessageCreateBindingModel messageCreateBindingModel = MessagesUtils.getMessageCreateBindingModel();
        Message message = MessagesUtils.createMessage(users.get(0), users.get(1), relationship);

        when(mockMessageValidation.isValid(any(MessageCreateBindingModel.class)))
                .thenReturn(true);

        when(mockUserRepository.findByUsername(any()))
                .thenReturn(java.util.Optional.ofNullable(users.get(0)));

        when(mockUserRepository.findById(any()))
                .thenReturn(java.util.Optional.of(users.get(1)));


        when(mockUserValidationService.isValid(users.get(0)))
                .thenReturn(true);

        when(mockUserValidationService.isValid(users.get(1)))
                .thenReturn(true);

        when(mockRelationshipRepository.findRelationshipWithFriendWithStatus(anyString(), anyString(), anyInt()))
                .thenReturn(relationship);

        when(mockRelationshipValidation.isValid(any(Relationship.class)))
                .thenReturn(true);

        when(mockMessageRepository.save(any())).thenReturn(message);
        // Act
        messageService.createMessage(messageCreateBindingModel, "username");

        // Assert
        verify(mockMessageRepository).save(any());
        verifyNoMoreInteractions(mockMessageRepository);
    }

    @Test
    public void createMessage_whenMessageCreateBindingModelIsNotValid_throeException() throws Exception {
        // Arrange
        MessageCreateBindingModel messageCreateBindingModel = MessagesUtils.getMessageCreateBindingModel();

        when(mockMessageValidation.isValid(any(MessageCreateBindingModel.class)))
                .thenReturn(false);

        thrown.expect(CustomException.class);
        thrown.expectMessage(SERVER_ERROR_MESSAGE);
        // Act
        messageService.createMessage(messageCreateBindingModel, "username");
    }

    @Test
    public void createMessage_whenFromUserIsNotValid_throeException() throws Exception {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        MessageCreateBindingModel messageCreateBindingModel = MessagesUtils.getMessageCreateBindingModel();

        when(mockMessageValidation.isValid(any(MessageCreateBindingModel.class)))
                .thenReturn(true);

        when(mockUserRepository.findByUsername(any()))
                .thenReturn(java.util.Optional.ofNullable(users.get(0)));

        when(mockUserRepository.findById(any()))
                .thenReturn(java.util.Optional.of(users.get(1)));


        when(mockUserValidationService.isValid(users.get(0)))
                .thenReturn(false);

        thrown.expect(CustomException.class);
        thrown.expectMessage(SERVER_ERROR_MESSAGE);
        // Act
        messageService.createMessage(messageCreateBindingModel, "username");
    }

    @Test
    public void createMessage_whenToUserIsNotValid_throeException() throws Exception {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        MessageCreateBindingModel messageCreateBindingModel = MessagesUtils.getMessageCreateBindingModel();

        when(mockMessageValidation.isValid(any(MessageCreateBindingModel.class)))
                .thenReturn(true);

        when(mockUserRepository.findByUsername(any()))
                .thenReturn(java.util.Optional.ofNullable(users.get(0)));

        when(mockUserRepository.findById(any()))
                .thenReturn(java.util.Optional.of(users.get(1)));


        when(mockUserValidationService.isValid(users.get(0)))
                .thenReturn(true);

        when(mockUserValidationService.isValid(users.get(1)))
                .thenReturn(false);

        thrown.expect(CustomException.class);
        thrown.expectMessage(SERVER_ERROR_MESSAGE);
        // Act
        messageService.createMessage(messageCreateBindingModel, "username");
    }

    @Test
    public void createMessage_whenRelationshipIsNotValid_throeException() throws Exception {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        Relationship relationship = RelationshipsUtils.createRelationship(users.get(0), users.get(1), 1, users.get(0));
        MessageCreateBindingModel messageCreateBindingModel = MessagesUtils.getMessageCreateBindingModel();

        when(mockMessageValidation.isValid(any(MessageCreateBindingModel.class)))
                .thenReturn(true);

        when(mockUserRepository.findByUsername(any()))
                .thenReturn(java.util.Optional.ofNullable(users.get(0)));

        when(mockUserRepository.findById(any()))
                .thenReturn(java.util.Optional.of(users.get(1)));


        when(mockUserValidationService.isValid(users.get(0)))
                .thenReturn(true);

        when(mockUserValidationService.isValid(users.get(1)))
                .thenReturn(true);

        when(mockRelationshipRepository.findRelationshipWithFriendWithStatus(anyString(), anyString(), anyInt()))
                .thenReturn(relationship);

        when(mockRelationshipValidation.isValid(any(Relationship.class)))
                .thenReturn(false);

        thrown.expect(CustomException.class);
        thrown.expectMessage(SERVER_ERROR_MESSAGE);
        // Act
        messageService.createMessage(messageCreateBindingModel, "username");
    }

    @Test
    public void createMessage_whenSaveMessageReturnsNull_throeException() throws Exception {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        Relationship relationship = RelationshipsUtils.createRelationship(users.get(0), users.get(1), 1, users.get(0));
        MessageCreateBindingModel messageCreateBindingModel = MessagesUtils.getMessageCreateBindingModel();
        Message message = MessagesUtils.createMessage(users.get(0), users.get(1), relationship);

        when(mockMessageValidation.isValid(any(MessageCreateBindingModel.class)))
                .thenReturn(true);

        when(mockUserRepository.findByUsername(any()))
                .thenReturn(java.util.Optional.ofNullable(users.get(0)));

        when(mockUserRepository.findById(any()))
                .thenReturn(java.util.Optional.of(users.get(1)));


        when(mockUserValidationService.isValid(users.get(0)))
                .thenReturn(true);

        when(mockUserValidationService.isValid(users.get(1)))
                .thenReturn(true);

        when(mockRelationshipRepository.findRelationshipWithFriendWithStatus(anyString(), anyString(), anyInt()))
                .thenReturn(relationship);

        when(mockRelationshipValidation.isValid(any(Relationship.class)))
                .thenReturn(true);

        when(mockMessageRepository.save(any())).thenReturn(null);

        thrown.expect(CustomException.class);
        thrown.expectMessage(SERVER_ERROR_MESSAGE);

        // Act
        messageService.createMessage(messageCreateBindingModel, "username");
    }
}
