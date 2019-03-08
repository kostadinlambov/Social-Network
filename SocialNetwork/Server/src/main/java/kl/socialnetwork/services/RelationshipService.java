package kl.socialnetwork.services;

import kl.socialnetwork.domain.modles.serviceModels.RelationshipServiceModel;
import kl.socialnetwork.domain.modles.viewModels.relationship.FriendsAllViewModel;
import kl.socialnetwork.domain.modles.viewModels.relationship.FriendsCandidatesViewModel;

import java.util.List;

public interface RelationshipService {

    List<RelationshipServiceModel> findAllUserRelationshipsWithStatus(String userId);

    List<FriendsCandidatesViewModel> findAllFriendCandidates(String id);


    boolean createRequestForAddingFriend(String loggedInUserId, String friendCandidateId);

    boolean removeFriend(String loggedInUserId, String friendToRemoveId);

    boolean acceptFriend(String loggedInUserId, String friendToAcceptId);

    boolean cancelFriendshipRequest(String loggedInUserId, String friendToRejectId);

    List<FriendsCandidatesViewModel> searchUsers(String loggedInUserId, String search);
}
