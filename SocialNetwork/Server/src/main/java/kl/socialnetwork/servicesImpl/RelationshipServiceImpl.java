package kl.socialnetwork.servicesImpl;

import kl.socialnetwork.domain.entities.Relationship;
import kl.socialnetwork.domain.entities.User;
import kl.socialnetwork.domain.modles.serviceModels.RelationshipServiceModel;
import kl.socialnetwork.domain.modles.viewModels.relationship.FriendsCandidatesViewModel;
import kl.socialnetwork.repositories.RelationshipRepository;
import kl.socialnetwork.repositories.UserRepository;
import kl.socialnetwork.services.RelationshipService;
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

    @Autowired
    public RelationshipServiceImpl(RelationshipRepository relationshipRepository, UserRepository userRepository, ModelMapper modelMapper) {
        this.relationshipRepository = relationshipRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<RelationshipServiceModel> findAllUserRelationshipsWithStatus(String userId) {
        List<Relationship> relationshipList = this.relationshipRepository
                .findRelationshipByUserIdAndStatus(userId, 1);

        List<RelationshipServiceModel> relationshipServiceModels = relationshipList
                .stream()
                .map(relationship -> this.modelMapper
                        .map(relationship, RelationshipServiceModel.class))
                .collect(Collectors.toList());

        return relationshipServiceModels;
    }


    @Override
    public List<FriendsCandidatesViewModel> searchUsers(String loggedInUserId, String search) {
        List<User> userList = this.userRepository.findAllAllUsersLike(loggedInUserId, search.toLowerCase());

        List<Relationship> currentUserRelationshipList = this.relationshipRepository
                .findAllByUserOneIdOrUserTwoId(loggedInUserId, loggedInUserId);

        return userList.stream()
                .map(currentUser -> this.modelMapper.map(currentUser, FriendsCandidatesViewModel.class))
                .map(user -> mapUser(user, currentUserRelationshipList))
                .collect(Collectors.toList());
//                .map(user -> {
//            Relationship relationshipWithCurrentUser = currentUserRelationshipList.stream()
//                    .filter(relationship ->
//                            relationship.getUserOne().getId().equals(user.getId()) ||
//                                    relationship.getUserTwo().getId().equals(user.getId()))
//                    .findFirst().orElse(null);
//            if (relationshipWithCurrentUser != null) {
//                user.setStatus(relationshipWithCurrentUser.getStatus());
//                user.setStarterOfAction(relationshipWithCurrentUser.getActionUser().getId().equals(user.getId()));
//            }
//
//            return user;
//        }
//        )

//        return null;
    }

    public List<FriendsCandidatesViewModel> findAllFriendCandidates(String id) {
        List<User> userList = this.userRepository.findAll();

        List<Relationship> notCandidatesForFriends = this.relationshipRepository.findAllNotCandidatesForFriends(id);
        List<Relationship> relationshipWithStatusZero = this.relationshipRepository.findRelationshipByUserIdAndStatus(id, 0);

        List<User> usersWithRelationship = new ArrayList<>();

        notCandidatesForFriends.forEach(relationship -> {
            if (!relationship.getUserOne().getId().equals(id)) {
                usersWithRelationship.add(relationship.getUserOne());
            } else {
                usersWithRelationship.add(relationship.getUserTwo());
            }
        });

        List<FriendsCandidatesViewModel> notFriendsUserList = userList.stream()
                .filter(user -> !usersWithRelationship.contains(user) && !user.getId().equals(id))
                .map(user -> this.modelMapper.map(user, FriendsCandidatesViewModel.class))
                .collect(Collectors.toList());


        return notFriendsUserList.stream()
                .map(user -> mapUser(user, relationshipWithStatusZero))
                .collect(Collectors.toList());
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

    @Override
    public boolean createRequestForAddingFriend(String loggedInUserId, String friendCandidateId) {
        User loggedInUser = this.userRepository.findById(loggedInUserId).orElse(null);
        User friendCandidateUser = this.userRepository.findById(friendCandidateId).orElse(null);

        if (loggedInUser != null && friendCandidateUser != null) {
            Relationship relationshipFromDb = this.relationshipRepository.findRelationshipByUserOneIdAndUserTwoId(loggedInUserId, friendCandidateId);

            if (relationshipFromDb == null) {
                Relationship relationship = new Relationship();
                relationship.setActionUser(loggedInUser);
                relationship.setUserOne(loggedInUser);
                relationship.setUserTwo(friendCandidateUser);
                relationship.setStatus(0);
                relationship.setTime(LocalDateTime.now());

                return this.relationshipRepository.saveAndFlush(relationship) != null;
            } else {
                relationshipFromDb.setActionUser(loggedInUser);
                relationshipFromDb.setStatus(0);
                relationshipFromDb.setTime(LocalDateTime.now());
                return this.relationshipRepository.saveAndFlush(relationshipFromDb) != null;
            }
        }
        return false;
    }

    @Override
    public boolean removeFriend(String loggedInUserId, String friendToRemoveId) {
        return this.changeStatusAndSave(loggedInUserId, friendToRemoveId, 1, 2);
    }

    @Override
    public boolean acceptFriend(String loggedInUserId, String friendToAcceptId) {
        return this.changeStatusAndSave(loggedInUserId, friendToAcceptId, 0, 1);

    }

    @Override
    public boolean cancelFriendshipRequest(String loggedInUserId, String friendToRejectId) {
        return this.changeStatusAndSave(loggedInUserId, friendToRejectId, 0, 2);
    }


    private boolean changeStatusAndSave(String loggedInUserId, String userTwoID, int fromStatus, int toStatus) {
        User loggedInUser = this.userRepository.findById(loggedInUserId).orElse(null);
        User friendToReject = this.userRepository.findById(userTwoID).orElse(null);

        if (loggedInUser != null && friendToReject != null) {

            Relationship relationship = this.relationshipRepository
                    .findRelationshipWithFriendWithStatus(
                            loggedInUserId, userTwoID, fromStatus);


            if (relationship != null) {
                relationship.setActionUser(loggedInUser);
                relationship.setStatus(toStatus);
                relationship.setTime(LocalDateTime.now());
                return this.relationshipRepository.saveAndFlush(relationship) != null;
            }

            System.out.println();
        }
        return false;
    }
}
