package kl.socialnetwork.servicesImpl;

import kl.socialnetwork.domain.entities.Relationship;
import kl.socialnetwork.domain.entities.User;
import kl.socialnetwork.domain.models.serviceModels.RelationshipServiceModel;
import kl.socialnetwork.domain.models.viewModels.relationship.FriendsCandidatesViewModel;
import kl.socialnetwork.repositories.RelationshipRepository;
import kl.socialnetwork.repositories.UserRepository;
import kl.socialnetwork.services.RelationshipService;
import kl.socialnetwork.testUtils.RelationshipsUtils;
import kl.socialnetwork.testUtils.UsersUtils;
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
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class RelationshipServiceTests {
    @Autowired
    private RelationshipService relationshipService;

    @MockBean
    private RelationshipRepository mockRelationshipRepository;

    @MockBean
    private RelationshipValidationService mockRelationshipValidation;

    @MockBean
    private UserRepository mockUserRepository;

    @MockBean
    private UserValidationService mockUserValidationService;

    private List<Relationship> relationshipList;

    @Rule
    public ExpectedException thrown = ExpectedException.none();

    @Before
    public void setUpTest() {
        relationshipList = new ArrayList<>();
        when(mockRelationshipRepository.findAll())
                .thenReturn(relationshipList);
    }

    @Test
    public void findAllUserRelationshipsWithStatus_whenUserIdValidAnd2UsersInDbWithStatus1_return2Users() throws Exception {
        // Arrange
        List<User> users = UsersUtils.getUsers(3);
        User userOne = users.get(0);
        User userTwo = users.get(1);
        User userThree = users.get(2);

        Relationship relationship1 = RelationshipsUtils.createRelationship(userOne, userTwo, 1, userOne);
        Relationship relationship2 = RelationshipsUtils.createRelationship(userOne, userThree, 1, userOne);

        relationshipList.addAll(Arrays.asList(relationship1, relationship2));

        when(mockRelationshipRepository.findRelationshipByUserIdAndStatus(anyString(), anyInt()))
                .thenReturn(relationshipList);

        // Act
        List<RelationshipServiceModel> allUserRelationshipsWithStatus = relationshipService.findAllUserRelationshipsWithStatus("1");

        // Assert
        Relationship expected = relationshipList.get(0);
        RelationshipServiceModel actual = allUserRelationshipsWithStatus.get(0);

        assertEquals(2, allUserRelationshipsWithStatus.size());
        assertEquals(expected.getUserOne().getUsername(), actual.getUserOne().getUsername());
        assertEquals(expected.getUserOne().getEmail(), actual.getUserOne().getEmail());
        assertEquals(expected.getUserOne().getFirstName(), actual.getUserOne().getFirstName());
        assertEquals(expected.getUserOne().getLastName(), actual.getUserOne().getLastName());
        assertEquals(expected.getStatus(), actual.getStatus());
        assertEquals(expected.getActionUser().getUsername(), actual.getActionUser().getUsername());
        assertEquals(expected.getActionUser().getEmail(), actual.getActionUser().getEmail());

        verify(mockRelationshipRepository).findRelationshipByUserIdAndStatus(anyString(), anyInt());
        verify(mockRelationshipRepository, times(1)).findRelationshipByUserIdAndStatus(anyString(), anyInt());
        verifyNoMoreInteractions(mockRelationshipRepository);
    }

    @Test
    public void findAllUserRelationshipsWithStatus_whenNoRelationshipsFromUserWithUserIdAndStatus_returnEmptyCollection() throws Exception {
        relationshipList.clear();

        when(mockRelationshipRepository.findRelationshipByUserIdAndStatus(anyString(), anyInt()))
                .thenReturn(relationshipList);

        List<RelationshipServiceModel> allUserRelationshipsWithStatus = relationshipService.findAllUserRelationshipsWithStatus("1");

        assertTrue(allUserRelationshipsWithStatus.isEmpty());

        verify(mockRelationshipRepository).findRelationshipByUserIdAndStatus(anyString(), anyInt());
        verify(mockRelationshipRepository, times(1)).findRelationshipByUserIdAndStatus(anyString(), anyInt());
        verifyNoMoreInteractions(mockRelationshipRepository);
    }

    @Test
    public void searchUsers_when3UsersInDb_return2Users() throws Exception {
        // Arrange
        List<User> users = UsersUtils.getUsers(3);
        User userOne = users.get(0);
        User userTwo = users.get(1);
        User userThree = users.get(2);

        List<User> allUsersWithoutLoggedInUser = new ArrayList<>(Arrays.asList(userTwo, userThree));

        Relationship relationship1 = RelationshipsUtils.createRelationship(userOne, userTwo, 1, userOne);
        Relationship relationship2 = RelationshipsUtils.createRelationship(userOne, userThree, 1, userOne);

        relationshipList.addAll(Arrays.asList(relationship1, relationship2));

        when(mockUserRepository.findAllUsersLike(anyString(), anyString())).thenReturn(allUsersWithoutLoggedInUser);

        when(mockRelationshipRepository.findAllByUserOneIdOrUserTwoId(anyString(), anyString()))
                .thenReturn(relationshipList);

        // Act
        List<FriendsCandidatesViewModel> friendsCandidatesList = relationshipService.searchUsers("1", "search");

        // Assert
        FriendsCandidatesViewModel firstResultUser = friendsCandidatesList.get(0);
        FriendsCandidatesViewModel secondResultUser = friendsCandidatesList.get(1);

        assertEquals(2, friendsCandidatesList.size());
        assertEquals(userTwo.getUsername(), firstResultUser.getUsername());
        assertEquals(userTwo.getProfilePicUrl(), firstResultUser.getProfilePicUrl());
        assertEquals(userTwo.getFirstName(), firstResultUser.getFirstName());
        assertEquals(userTwo.getLastName(), firstResultUser.getLastName());
        assertEquals(Integer.valueOf(relationship1.getStatus()), firstResultUser.getStatus());
        assertEquals(userThree.getUsername(), secondResultUser.getUsername());
        assertEquals(userThree.getProfilePicUrl(), secondResultUser.getProfilePicUrl());
        assertEquals(userThree.getFirstName(), secondResultUser.getFirstName());
        assertEquals(userThree.getLastName(), secondResultUser.getLastName());
        assertEquals(Integer.valueOf(relationship2.getStatus()), secondResultUser.getStatus());

        verify(mockRelationshipRepository).findAllByUserOneIdOrUserTwoId(anyString(), anyString());
        verify(mockRelationshipRepository, times(1)).findAllByUserOneIdOrUserTwoId(anyString(), anyString());
        verifyNoMoreInteractions(mockRelationshipRepository);

    }

    @Test
    public void searchUsers_when1UserInDb_returnEmptyCollection() {
        relationshipList.clear();

        // Arrange
        when(mockUserRepository.findAllUsersLike(anyString(), anyString())).thenReturn(new ArrayList<>());

        when(mockRelationshipRepository.findAllByUserOneIdOrUserTwoId(anyString(), anyString()))
                .thenReturn(relationshipList);

        // Act
        List<FriendsCandidatesViewModel> friendsCandidatesList = relationshipService.searchUsers("1", "search");

        // Assert
        assertEquals(0, friendsCandidatesList.size());

        verify(mockRelationshipRepository).findAllByUserOneIdOrUserTwoId(anyString(), anyString());
        verify(mockRelationshipRepository, times(1)).findAllByUserOneIdOrUserTwoId(anyString(), anyString());
        verifyNoMoreInteractions(mockRelationshipRepository);
    }

    @Test
    public void findAllFriendCandidates_when4UsersInDbAndOneFriend_return2Users() throws Exception {
        // Arrange
        List<User> users = UsersUtils.getUsers(4);
        User userOne = users.get(0);
        User userTwo = users.get(1);
        User userThree = users.get(2);
        User userFour = users.get(3);

        Relationship relationship1 = RelationshipsUtils.createRelationship(userOne, userTwo, 1, userOne);
        Relationship relationship2 = RelationshipsUtils.createRelationship(userOne, userThree, 0, userOne);

        List<Relationship> relationshipWithStatusOne = List.of(relationship1);
        List<Relationship> relationshipWithStatusZero = List.of(relationship2);

        when(mockUserRepository.findAll()).thenReturn(users);

        when(mockRelationshipRepository.findAllNotCandidatesForFriends(anyString())).thenReturn(relationshipWithStatusOne);

        when(mockRelationshipRepository.findRelationshipByUserIdAndStatus(anyString(), anyInt()))
                .thenReturn(relationshipWithStatusZero);

        // Act
        List<FriendsCandidatesViewModel> friendsCandidatesList = relationshipService.findAllFriendCandidates(userOne.getId());

        // Assert
        FriendsCandidatesViewModel firstFriendCandidate = friendsCandidatesList.get(0);
        FriendsCandidatesViewModel secondFriendCandidate = friendsCandidatesList.get(1);

        assertEquals(2, friendsCandidatesList.size());

        assertEquals(userThree.getUsername(), firstFriendCandidate.getUsername());
        assertEquals(userThree.getProfilePicUrl(), firstFriendCandidate.getProfilePicUrl());
        assertEquals(userThree.getFirstName(), firstFriendCandidate.getFirstName());
        assertEquals(userThree.getLastName(), firstFriendCandidate.getLastName());
        assertEquals(Integer.valueOf(relationship2.getStatus()), firstFriendCandidate.getStatus());
        assertEquals(userFour.getUsername(), secondFriendCandidate.getUsername());
        assertEquals(userFour.getProfilePicUrl(), secondFriendCandidate.getProfilePicUrl());
        assertEquals(userFour.getFirstName(), secondFriendCandidate.getFirstName());
        assertEquals(userFour.getLastName(), secondFriendCandidate.getLastName());

        verify(mockRelationshipRepository).findAllNotCandidatesForFriends(anyString());
        verify(mockRelationshipRepository, times(1)).findAllNotCandidatesForFriends(anyString());
        verify(mockRelationshipRepository).findRelationshipByUserIdAndStatus(anyString(), anyInt());
        verify(mockRelationshipRepository, times(1)).findRelationshipByUserIdAndStatus(anyString(), anyInt());
    }

    @Test
    public void findAllFriendCandidates_when4UsersInDbAndAllAreAlreadyFriends_returnEmptyCollection() throws Exception {
        // Arrange
        List<User> users = UsersUtils.getUsers(4);
        User userOne = users.get(0);
        User userTwo = users.get(1);
        User userThree = users.get(2);
        User userFour = users.get(3);

        Relationship relationship1 = RelationshipsUtils.createRelationship(userOne, userTwo, 1, userOne);
        Relationship relationship2 = RelationshipsUtils.createRelationship(userOne, userThree, 1, userOne);
        Relationship relationship3 = RelationshipsUtils.createRelationship(userFour, userOne, 1, userOne);

        List<Relationship> relationshipWithStatusOne = List.of(relationship1, relationship2, relationship3);

        when(mockUserRepository.findAll()).thenReturn(users);

        when(mockRelationshipRepository.findAllNotCandidatesForFriends(anyString())).thenReturn(relationshipWithStatusOne);

        when(mockRelationshipRepository.findRelationshipByUserIdAndStatus(anyString(), anyInt()))
                .thenReturn(new ArrayList<>());

        // Act
        List<FriendsCandidatesViewModel> friendsCandidatesList = relationshipService.findAllFriendCandidates(userOne.getId());

        // Assert
        assertEquals(0, friendsCandidatesList.size());

        verify(mockRelationshipRepository).findAllNotCandidatesForFriends(anyString());
        verify(mockRelationshipRepository, times(1)).findAllNotCandidatesForFriends(anyString());
        verify(mockRelationshipRepository).findRelationshipByUserIdAndStatus(anyString(), anyInt());
        verify(mockRelationshipRepository, times(1)).findRelationshipByUserIdAndStatus(anyString(), anyInt());
    }

    @Test
    public void findAllFriendCandidates_when1UserInDb_returnEmptyCollection() throws Exception {
        // Arrange
        User user = UsersUtils.createUser();

        when(mockUserRepository.findAll()).thenReturn(List.of(user));

        when(mockRelationshipRepository.findAllNotCandidatesForFriends(anyString())).thenReturn(new ArrayList<>());

        when(mockRelationshipRepository.findRelationshipByUserIdAndStatus(anyString(), anyInt()))
                .thenReturn(new ArrayList<>());

        // Act
        List<FriendsCandidatesViewModel> friendsCandidatesList = relationshipService.findAllFriendCandidates(user.getId());

        // Assert
        assertEquals(0, friendsCandidatesList.size());

        verify(mockRelationshipRepository).findAllNotCandidatesForFriends(anyString());
        verify(mockRelationshipRepository, times(1)).findAllNotCandidatesForFriends(anyString());
        verify(mockRelationshipRepository).findRelationshipByUserIdAndStatus(anyString(), anyInt());
        verify(mockRelationshipRepository, times(1)).findRelationshipByUserIdAndStatus(anyString(), anyInt());
    }

    @Test
    public void createRequestForAddingFriend_whenUsersAreValidAndTheyAreNotFriendsAndHaveRelationshipWithStatus2_createFriendRequest() throws Exception {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        User userOne = users.get(0);
        User userTwo = users.get(1);

        Relationship relationship = RelationshipsUtils.createRelationship(userOne, userTwo, 2, userOne);

        when(mockUserValidationService.isValid(userOne)).thenReturn(true);

        when(mockUserValidationService.isValid(userTwo)).thenReturn(true);

        when(mockUserRepository.findById(userOne.getId())).thenReturn(Optional.of(userOne));

        when(mockUserRepository.findById(userTwo.getId())).thenReturn(Optional.of(userTwo));

        when(mockRelationshipRepository.findRelationshipByUserOneIdAndUserTwoId(userOne.getId(), userTwo.getId())).thenReturn(relationship);

        // Act
        relationshipService.createRequestForAddingFriend(userOne.getId(), userTwo.getId());

        // Assert
        verify(mockRelationshipRepository).save(any());
        verify(mockRelationshipRepository, times(1)).save(any());
    }

    @Test
    public void createRequestForAddingFriend_whenUsersAreValidAndTheyAreNotFriendsAndDontHaveRelationship_createRelationshipAndCreateFriendRequest() throws Exception {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        User userOne = users.get(0);
        User userTwo = users.get(1);

        when(mockUserValidationService.isValid(userOne)).thenReturn(true);

        when(mockUserValidationService.isValid(userTwo)).thenReturn(true);

        when(mockUserRepository.findById(userOne.getId())).thenReturn(Optional.of(userOne));

        when(mockUserRepository.findById(userTwo.getId())).thenReturn(Optional.of(userTwo));

        when(mockRelationshipRepository.findRelationshipByUserOneIdAndUserTwoId(userOne.getId(), userTwo.getId())).thenReturn(null);

        // Act
        relationshipService.createRequestForAddingFriend(userOne.getId(), userTwo.getId());

        // Assert
        verify(mockRelationshipRepository).save(any());
        verify(mockRelationshipRepository, times(1)).save(any());
    }

    @Test
    public void createRequestForAddingFriend_whenLoggedInUserIsNotValid_throwException() throws Exception {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        User userOne = users.get(0);
        User userTwo = users.get(1);

        when(mockUserValidationService.isValid(userOne)).thenReturn(false);

        when(mockUserValidationService.isValid(userTwo)).thenReturn(true);

        when(mockUserRepository.findById(userOne.getId())).thenReturn(Optional.of(userOne));

        when(mockUserRepository.findById(userTwo.getId())).thenReturn(Optional.of(userTwo));

        thrown.expect(Exception.class);

        // Act
        relationshipService.createRequestForAddingFriend(userOne.getId(), userTwo.getId());
    }

    @Test
    public void createRequestForAddingFriend_whenFriendCandidateIsNotValid_throwException() throws Exception {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        User userOne = users.get(0);
        User userTwo = users.get(1);

        when(mockUserValidationService.isValid(userOne)).thenReturn(true);

        when(mockUserValidationService.isValid(userTwo)).thenReturn(false);

        when(mockUserRepository.findById(userOne.getId())).thenReturn(Optional.of(userOne));

        when(mockUserRepository.findById(userTwo.getId())).thenReturn(Optional.of(userTwo));

        thrown.expect(Exception.class);

        // Act
        relationshipService.createRequestForAddingFriend(userOne.getId(), userTwo.getId());
    }

    @Test
    public void removeFriend_whenUsersAreValidAndRelationshipStatusIs1_changeRelationshipStatusTo2() throws Exception {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        User userOne = users.get(0);
        User userTwo = users.get(1);

        Relationship relationship = RelationshipsUtils.createRelationship(userOne, userTwo, 1, userOne);

        when(mockUserValidationService.isValid(userOne)).thenReturn(true);

        when(mockUserValidationService.isValid(userTwo)).thenReturn(true);

        when(mockUserRepository.findById(userOne.getId())).thenReturn(Optional.of(userOne));

        when(mockUserRepository.findById(userTwo.getId())).thenReturn(Optional.of(userTwo));

        when(mockRelationshipRepository.findRelationshipWithFriendWithStatus(userOne.getId(), userTwo.getId(), 1)).thenReturn(relationship);

        when(mockRelationshipValidation.isValid(any())).thenReturn(true);

        // Act
        relationshipService.removeFriend(userOne.getId(), userTwo.getId());

        // Assert
        verify(mockRelationshipRepository).save(any());
        verify(mockRelationshipRepository, times(1)).save(any());
    }

    @Test
    public void removeFriend_whenUsersAreValidAndRelationshipStatusIsNot1_throwException() throws Exception {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        User userOne = users.get(0);
        User userTwo = users.get(1);

        when(mockUserValidationService.isValid(userOne)).thenReturn(true);

        when(mockUserValidationService.isValid(userTwo)).thenReturn(true);

        when(mockUserRepository.findById(userOne.getId())).thenReturn(Optional.of(userOne));

        when(mockUserRepository.findById(userTwo.getId())).thenReturn(Optional.of(userTwo));

        when(mockRelationshipRepository.findRelationshipWithFriendWithStatus(userOne.getId(), userTwo.getId(), 2)).thenReturn(null);

        when(mockRelationshipValidation.isValid(any())).thenReturn(false);

        thrown.expect(Exception.class);

        // Act
        relationshipService.removeFriend(userOne.getId(), userTwo.getId());
    }

    @Test
    public void removeFriend_whenLoggedInUserIsNotValid_throwException() throws Exception {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        User userOne = users.get(0);
        User userTwo = users.get(1);

        when(mockUserValidationService.isValid(userOne)).thenReturn(false);

        when(mockUserRepository.findById(userOne.getId())).thenReturn(Optional.of(userOne));

        thrown.expect(Exception.class);

        // Act
        relationshipService.removeFriend(userOne.getId(), userTwo.getId());
    }

    @Test
    public void removeFriend_whenFriendToRemoveIsNotValid_throwException() throws Exception {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        User userOne = users.get(0);
        User userTwo = users.get(1);

        when(mockUserValidationService.isValid(userOne)).thenReturn(true);

        when(mockUserValidationService.isValid(userTwo)).thenReturn(false);

        when(mockUserRepository.findById(userOne.getId())).thenReturn(Optional.of(userOne));

        when(mockUserRepository.findById(userTwo.getId())).thenReturn(Optional.of(userTwo));

        thrown.expect(Exception.class);

        // Act
        relationshipService.removeFriend(userOne.getId(), userTwo.getId());
    }

    @Test
    public void removeFriend_whenBothUsersAreNotValid_throwException() throws Exception {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        User userOne = users.get(0);
        User userTwo = users.get(1);

        when(mockUserValidationService.isValid(userOne)).thenReturn(false);

        when(mockUserValidationService.isValid(userTwo)).thenReturn(false);

        when(mockUserRepository.findById(userOne.getId())).thenReturn(Optional.of(userOne));

        when(mockUserRepository.findById(userTwo.getId())).thenReturn(Optional.of(userTwo));

        thrown.expect(Exception.class);

        // Act
        relationshipService.removeFriend(userOne.getId(), userTwo.getId());
    }

    @Test
    public void removeFriend_whenRelationshipIsNotValid_throwException() throws Exception {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        User userOne = users.get(0);
        User userTwo = users.get(1);

        Relationship relationship = RelationshipsUtils.createRelationship(userOne, userTwo, 1, userOne);

        when(mockUserValidationService.isValid(userOne)).thenReturn(true);

        when(mockUserValidationService.isValid(userTwo)).thenReturn(true);

        when(mockUserRepository.findById(userOne.getId())).thenReturn(Optional.of(userOne));

        when(mockUserRepository.findById(userTwo.getId())).thenReturn(Optional.of(userTwo));

        when(mockRelationshipRepository.findRelationshipWithFriendWithStatus(userOne.getId(), userTwo.getId(), 1)).thenReturn(relationship);

        when(mockRelationshipValidation.isValid(any())).thenReturn(false);

        thrown.expect(Exception.class);

        // Act
        relationshipService.removeFriend(userOne.getId(), userTwo.getId());
    }

    @Test
    public void removeFriend_whenBothUsersAndRelationshipIsNotValid_throwException() throws Exception {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        User userOne = users.get(0);
        User userTwo = users.get(1);

        Relationship relationship = RelationshipsUtils.createRelationship(userOne, userTwo, 1, userOne);

        when(mockUserValidationService.isValid(userOne)).thenReturn(false);

        when(mockUserValidationService.isValid(userTwo)).thenReturn(false);

        when(mockUserRepository.findById(userOne.getId())).thenReturn(Optional.of(userOne));

        when(mockUserRepository.findById(userTwo.getId())).thenReturn(Optional.of(userTwo));

        when(mockRelationshipRepository.findRelationshipWithFriendWithStatus(userOne.getId(), userTwo.getId(), 1)).thenReturn(relationship);

        when(mockRelationshipValidation.isValid(any())).thenReturn(false);

        thrown.expect(Exception.class);

        // Act
        relationshipService.removeFriend(userOne.getId(), userTwo.getId());
    }

    @Test
    public void acceptFriend_whenUsersAreValidAndRelationshipStatusIs0_changeRelationshipStatusTo1() throws Exception {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        User userOne = users.get(0);
        User userTwo = users.get(1);

        Relationship relationship = RelationshipsUtils.createRelationship(userOne, userTwo, 0, userOne);

        when(mockUserValidationService.isValid(userOne)).thenReturn(true);

        when(mockUserValidationService.isValid(userTwo)).thenReturn(true);

        when(mockUserRepository.findById(userOne.getId())).thenReturn(Optional.of(userOne));

        when(mockUserRepository.findById(userTwo.getId())).thenReturn(Optional.of(userTwo));

        when(mockRelationshipRepository.findRelationshipWithFriendWithStatus(userOne.getId(), userTwo.getId(), 0)).thenReturn(relationship);

        when(mockRelationshipValidation.isValid(any())).thenReturn(true);

        // Act
        relationshipService.acceptFriend(userOne.getId(), userTwo.getId());

        // Assert
        verify(mockRelationshipRepository).save(any());
        verify(mockRelationshipRepository, times(1)).save(any());
    }

    @Test
    public void acceptFriend_whenUsersAreValidAndRelationshipStatusIsNot0_throwException() throws Exception {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        User userOne = users.get(0);
        User userTwo = users.get(1);

        when(mockUserValidationService.isValid(userOne)).thenReturn(true);

        when(mockUserValidationService.isValid(userTwo)).thenReturn(true);

        when(mockUserRepository.findById(userOne.getId())).thenReturn(Optional.of(userOne));

        when(mockUserRepository.findById(userTwo.getId())).thenReturn(Optional.of(userTwo));

        when(mockRelationshipRepository.findRelationshipWithFriendWithStatus(userOne.getId(), userTwo.getId(), 2)).thenReturn(null);

        when(mockRelationshipValidation.isValid(any())).thenReturn(false);

        thrown.expect(Exception.class);

        // Act
        relationshipService.acceptFriend(userOne.getId(), userTwo.getId());
    }

    @Test
    public void acceptFriend_whenLoggedInUserIsNotValid_throwException() throws Exception {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        User userOne = users.get(0);
        User userTwo = users.get(1);

        when(mockUserValidationService.isValid(userOne)).thenReturn(false);

        when(mockUserRepository.findById(userOne.getId())).thenReturn(Optional.of(userOne));

        thrown.expect(Exception.class);

        // Act
        relationshipService.acceptFriend(userOne.getId(), userTwo.getId());
    }

    @Test
    public void acceptFriend_whenFriendToAcceptIsNotValid_throwException() throws Exception {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        User userOne = users.get(0);
        User userTwo = users.get(1);

        when(mockUserValidationService.isValid(userOne)).thenReturn(true);

        when(mockUserValidationService.isValid(userTwo)).thenReturn(false);

        when(mockUserRepository.findById(userOne.getId())).thenReturn(Optional.of(userOne));

        when(mockUserRepository.findById(userTwo.getId())).thenReturn(Optional.of(userTwo));

        thrown.expect(Exception.class);

        // Act
        relationshipService.acceptFriend(userOne.getId(), userTwo.getId());
    }

    @Test
    public void acceptFriend_whenBothUsersAreNotValid_throwException() throws Exception {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        User userOne = users.get(0);
        User userTwo = users.get(1);

        when(mockUserValidationService.isValid(userOne)).thenReturn(false);

        when(mockUserValidationService.isValid(userTwo)).thenReturn(false);

        when(mockUserRepository.findById(userOne.getId())).thenReturn(Optional.of(userOne));

        when(mockUserRepository.findById(userTwo.getId())).thenReturn(Optional.of(userTwo));

        thrown.expect(Exception.class);

        // Act
        relationshipService.acceptFriend(userOne.getId(), userTwo.getId());
    }

    @Test
    public void acceptFriend_whenRelationshipIsNotValid_throwException() throws Exception {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        User userOne = users.get(0);
        User userTwo = users.get(1);

        Relationship relationship = RelationshipsUtils.createRelationship(userOne, userTwo, 0, userOne);

        when(mockUserValidationService.isValid(userOne)).thenReturn(true);

        when(mockUserValidationService.isValid(userTwo)).thenReturn(true);

        when(mockUserRepository.findById(userOne.getId())).thenReturn(Optional.of(userOne));

        when(mockUserRepository.findById(userTwo.getId())).thenReturn(Optional.of(userTwo));

        when(mockRelationshipRepository.findRelationshipWithFriendWithStatus(userOne.getId(), userTwo.getId(), 0)).thenReturn(relationship);

        when(mockRelationshipValidation.isValid(any())).thenReturn(false);

        thrown.expect(Exception.class);

        // Act
        relationshipService.acceptFriend(userOne.getId(), userTwo.getId());
    }

    @Test
    public void acceptFriend_whenBothUsersAndRelationshipIsNotValid_throwException() throws Exception {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        User userOne = users.get(0);
        User userTwo = users.get(1);

        Relationship relationship = RelationshipsUtils.createRelationship(userOne, userTwo, 1, userOne);

        when(mockUserValidationService.isValid(userOne)).thenReturn(false);

        when(mockUserValidationService.isValid(userTwo)).thenReturn(false);

        when(mockUserRepository.findById(userOne.getId())).thenReturn(Optional.of(userOne));

        when(mockUserRepository.findById(userTwo.getId())).thenReturn(Optional.of(userTwo));

        when(mockRelationshipRepository.findRelationshipWithFriendWithStatus(userOne.getId(), userTwo.getId(), 1)).thenReturn(relationship);

        when(mockRelationshipValidation.isValid(any())).thenReturn(false);

        thrown.expect(Exception.class);

        // Act
        relationshipService.acceptFriend(userOne.getId(), userTwo.getId());
    }

    @Test
    public void cancelFriendshipRequest_whenUsersAreValidAndRelationshipStatusIs0_changeRelationshipStatusTo2() throws Exception {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        User userOne = users.get(0);
        User userTwo = users.get(1);

        Relationship relationship = RelationshipsUtils.createRelationship(userOne, userTwo, 0, userOne);

        when(mockUserValidationService.isValid(userOne)).thenReturn(true);

        when(mockUserValidationService.isValid(userTwo)).thenReturn(true);

        when(mockUserRepository.findById(userOne.getId())).thenReturn(Optional.of(userOne));

        when(mockUserRepository.findById(userTwo.getId())).thenReturn(Optional.of(userTwo));

        when(mockRelationshipRepository.findRelationshipWithFriendWithStatus(userOne.getId(), userTwo.getId(), 0)).thenReturn(relationship);

        when(mockRelationshipValidation.isValid(any())).thenReturn(true);

        // Act
        relationshipService.cancelFriendshipRequest(userOne.getId(), userTwo.getId());

        // Assert
        verify(mockRelationshipRepository).save(any());
        verify(mockRelationshipRepository, times(1)).save(any());
    }

    @Test
    public void cancelFriendshipRequest_whenUsersAreValidAndRelationshipStatusIsNot0_throwException() throws Exception {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        User userOne = users.get(0);
        User userTwo = users.get(1);

        when(mockUserValidationService.isValid(userOne)).thenReturn(true);

        when(mockUserValidationService.isValid(userTwo)).thenReturn(true);

        when(mockUserRepository.findById(userOne.getId())).thenReturn(Optional.of(userOne));

        when(mockUserRepository.findById(userTwo.getId())).thenReturn(Optional.of(userTwo));

        when(mockRelationshipRepository.findRelationshipWithFriendWithStatus(userOne.getId(), userTwo.getId(), 2)).thenReturn(null);

        when(mockRelationshipValidation.isValid(any())).thenReturn(false);

        thrown.expect(Exception.class);

        // Act
        relationshipService.cancelFriendshipRequest(userOne.getId(), userTwo.getId());
    }

    @Test
    public void cancelFriendshipRequest_whenLoggedInUserIsNotValid_throwException() throws Exception {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        User userOne = users.get(0);
        User userTwo = users.get(1);

        when(mockUserValidationService.isValid(userOne)).thenReturn(false);

        when(mockUserRepository.findById(userOne.getId())).thenReturn(Optional.of(userOne));

        thrown.expect(Exception.class);

        // Act
        relationshipService.cancelFriendshipRequest(userOne.getId(), userTwo.getId());
    }

    @Test
    public void cancelFriendshipRequest_whenFriendToAcceptIsNotValid_throwException() throws Exception {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        User userOne = users.get(0);
        User userTwo = users.get(1);

        when(mockUserValidationService.isValid(userOne)).thenReturn(true);

        when(mockUserValidationService.isValid(userTwo)).thenReturn(false);

        when(mockUserRepository.findById(userOne.getId())).thenReturn(Optional.of(userOne));

        when(mockUserRepository.findById(userTwo.getId())).thenReturn(Optional.of(userTwo));

        thrown.expect(Exception.class);

        // Act
        relationshipService.cancelFriendshipRequest(userOne.getId(), userTwo.getId());
    }

    @Test
    public void cancelFriendshipRequest_whenBothUsersAreNotValid_throwException() throws Exception {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        User userOne = users.get(0);
        User userTwo = users.get(1);

        when(mockUserValidationService.isValid(userOne)).thenReturn(false);

        when(mockUserValidationService.isValid(userTwo)).thenReturn(false);

        when(mockUserRepository.findById(userOne.getId())).thenReturn(Optional.of(userOne));

        when(mockUserRepository.findById(userTwo.getId())).thenReturn(Optional.of(userTwo));

        thrown.expect(Exception.class);

        // Act
        relationshipService.cancelFriendshipRequest(userOne.getId(), userTwo.getId());
    }

    @Test
    public void cancelFriendshipRequest_whenRelationshipIsNotValid_throwException() throws Exception {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        User userOne = users.get(0);
        User userTwo = users.get(1);

        Relationship relationship = RelationshipsUtils.createRelationship(userOne, userTwo, 0, userOne);

        when(mockUserValidationService.isValid(userOne)).thenReturn(true);

        when(mockUserValidationService.isValid(userTwo)).thenReturn(true);

        when(mockUserRepository.findById(userOne.getId())).thenReturn(Optional.of(userOne));

        when(mockUserRepository.findById(userTwo.getId())).thenReturn(Optional.of(userTwo));

        when(mockRelationshipRepository.findRelationshipWithFriendWithStatus(userOne.getId(), userTwo.getId(), 0)).thenReturn(relationship);

        when(mockRelationshipValidation.isValid(any())).thenReturn(false);

        thrown.expect(Exception.class);

        // Act
        relationshipService.cancelFriendshipRequest(userOne.getId(), userTwo.getId());
    }

    @Test
    public void cancelFriendshipRequest_whenBothUsersAndRelationshipIsNotValid_throwException() throws Exception {
        // Arrange
        List<User> users = UsersUtils.getUsers(2);
        User userOne = users.get(0);
        User userTwo = users.get(1);

        Relationship relationship = RelationshipsUtils.createRelationship(userOne, userTwo, 0, userOne);

        when(mockUserValidationService.isValid(userOne)).thenReturn(false);

        when(mockUserValidationService.isValid(userTwo)).thenReturn(false);

        when(mockUserRepository.findById(userOne.getId())).thenReturn(Optional.of(userOne));

        when(mockUserRepository.findById(userTwo.getId())).thenReturn(Optional.of(userTwo));

        when(mockRelationshipRepository.findRelationshipWithFriendWithStatus(userOne.getId(), userTwo.getId(), 0)).thenReturn(relationship);

        when(mockRelationshipValidation.isValid(any())).thenReturn(false);

        thrown.expect(Exception.class);

        // Act
        relationshipService.cancelFriendshipRequest(userOne.getId(), userTwo.getId());
    }
}
