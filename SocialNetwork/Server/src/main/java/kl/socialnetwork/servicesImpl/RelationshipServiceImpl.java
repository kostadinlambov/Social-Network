package kl.socialnetwork.servicesImpl;

import kl.socialnetwork.domain.entities.Relationship;
import kl.socialnetwork.domain.entities.User;
import kl.socialnetwork.domain.models.serviceModels.RelationshipServiceModel;
import kl.socialnetwork.domain.models.viewModels.relationship.FriendsCandidatesViewModel;
import kl.socialnetwork.repositories.RelationshipRepository;
import kl.socialnetwork.repositories.UserRepository;
import kl.socialnetwork.services.RelationshipService;
import kl.socialnetwork.validations.serviceValidation.services.RelationshipValidationService;
import kl.socialnetwork.validations.serviceValidation.services.UserValidationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class RelationshipServiceImpl implements RelationshipService {
    private final RelationshipRepository relationshipRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final UserValidationService userValidation;
    private final RelationshipValidationService relationshipValidation;

    @Autowired
    public RelationshipServiceImpl(RelationshipRepository relationshipRepository, UserRepository userRepository, ModelMapper modelMapper, UserValidationService userValidation, RelationshipValidationService relationshipValidation) {
        this.relationshipRepository = relationshipRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.userValidation = userValidation;
        this.relationshipValidation = relationshipValidation;
    }

    @Override
    public List<RelationshipServiceModel> findAllUserRelationshipsWithStatus(String userId) {
        List<Relationship> relationshipList = this.relationshipRepository
                .findRelationshipByUserIdAndStatus(userId, 1);

        return relationshipList
                .stream()
                .map(relationship -> this.modelMapper
                        .map(relationship, RelationshipServiceModel.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<FriendsCandidatesViewModel> searchUsers(String loggedInUserId, String search) {
        List<User> userList = this.userRepository.findAllUsersLike(loggedInUserId, search.toLowerCase());

        List<Relationship> currentUserRelationshipList = this.relationshipRepository
                .findAllByUserOneIdOrUserTwoId(loggedInUserId, loggedInUserId);

        return userList.stream()
                .map(currentUser -> this.modelMapper.map(currentUser, FriendsCandidatesViewModel.class))
                .map(user -> mapUser(user, currentUserRelationshipList))
                .collect(Collectors.toList());
    }

    @Override
    public List<FriendsCandidatesViewModel> findAllFriendCandidates(String loggedInUserId) {
        List<User> userList = this.userRepository.findAll();

        List<Relationship> notCandidatesForFriends = this.relationshipRepository.findAllNotCandidatesForFriends(loggedInUserId);
        List<Relationship> relationshipWithStatusZero = this.relationshipRepository.findRelationshipByUserIdAndStatus(loggedInUserId, 0);

        List<User> usersWithRelationship = new ArrayList<>();

        notCandidatesForFriends.forEach(relationship -> {
            if (!relationship.getUserOne().getId().equals(loggedInUserId)) {
                usersWithRelationship.add(relationship.getUserOne());
            } else {
                usersWithRelationship.add(relationship.getUserTwo());
            }
        });

        List<FriendsCandidatesViewModel> notFriendsUserList = userList.stream()
                .filter(user -> !usersWithRelationship.contains(user) && !user.getId().equals(loggedInUserId))
                .map(user -> this.modelMapper.map(user, FriendsCandidatesViewModel.class))
                .collect(Collectors.toList());


        return notFriendsUserList.stream()
                .map(user -> mapUser(user, relationshipWithStatusZero))
                .collect(Collectors.toList());
    }

    @Override
    public boolean createRequestForAddingFriend(String loggedInUserId, String friendCandidateId) throws Exception {
        User loggedInUser = this.userRepository.findById(loggedInUserId)
                .filter(userValidation::isValid)
                .orElseThrow(Exception::new);

        User friendCandidateUser = this.userRepository.findById(friendCandidateId)
                .filter(userValidation::isValid)
                .orElseThrow(Exception::new);

        Relationship relationshipFromDb = this.relationshipRepository.findRelationshipByUserOneIdAndUserTwoId(loggedInUserId, friendCandidateId);

        if (relationshipFromDb == null) {
            Relationship relationship = new Relationship();
            relationship.setActionUser(loggedInUser);
            relationship.setUserOne(loggedInUser);
            relationship.setUserTwo(friendCandidateUser);
            relationship.setStatus(0);
            relationship.setTime(LocalDateTime.now());

            return this.relationshipRepository.save(relationship) != null;
        } else {
            relationshipFromDb.setActionUser(loggedInUser);
            relationshipFromDb.setStatus(0);
            relationshipFromDb.setTime(LocalDateTime.now());
            return this.relationshipRepository.save(relationshipFromDb) != null;
        }
    }

    @Override
    public boolean removeFriend(String loggedInUserId, String friendToRemoveId) throws Exception {
        return this.changeStatusAndSave(loggedInUserId, friendToRemoveId, 1, 2);
    }

    @Override
    public boolean acceptFriend(String loggedInUserId, String friendToAcceptId) throws Exception {
        return this.changeStatusAndSave(loggedInUserId, friendToAcceptId, 0, 1);
    }

    @Override
    public boolean cancelFriendshipRequest(String loggedInUserId, String friendToRejectId) throws Exception {
        return this.changeStatusAndSave(loggedInUserId, friendToRejectId, 0, 2);
    }

    private FriendsCandidatesViewModel mapUser(FriendsCandidatesViewModel user, List<Relationship> relationshipList) {
        Relationship relationshipWithCurrentUser = relationshipList.stream()
                .filter(relationship ->
                        relationship.getUserOne().getId().equals(user.getId()) ||
                                relationship.getUserTwo().getId().equals(user.getId()))
                .findFirst().orElse(null);

        if (relationshipWithCurrentUser != null) {
            user.setStatus(relationshipWithCurrentUser.getStatus());
            user.setStarterOfAction(relationshipWithCurrentUser.getActionUser().getId().equals(user.getId()));
        }

        return user;
    }

    private boolean changeStatusAndSave(String loggedInUserId, String friendId, int fromStatus, int toStatus) throws Exception {
        User loggedInUser = this.userRepository.findById(loggedInUserId)
                .filter(userValidation::isValid)
                .orElseThrow(Exception::new);

        User friend = this.userRepository.findById(friendId)
                .filter(userValidation::isValid)
                .orElseThrow(Exception::new);

        Relationship relationship = this.relationshipRepository
                .findRelationshipWithFriendWithStatus(
                        loggedInUserId, friendId, fromStatus);

        if (!relationshipValidation.isValid(relationship)) {
            throw new Exception();
        }

        relationship.setActionUser(loggedInUser);
        relationship.setStatus(toStatus);
        relationship.setTime(LocalDateTime.now());
        return this.relationshipRepository.save(relationship) != null;
    }
}
