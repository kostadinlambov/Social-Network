package kl.socialnetwork.services;

import kl.socialnetwork.domain.modles.serviceModels.RelationshipServiceModel;
import kl.socialnetwork.domain.modles.viewModels.relationship.FriendsAllViewModel;

import java.util.List;

public interface RelationshipService {

    List<RelationshipServiceModel> findAllUserRelationshipsWithStatus(String userId, int status);

    List<FriendsAllViewModel> findAllNotFriends(String id, int status);


    boolean createRequestForAddingFriend(String loggedInUserId, String friendCandidateId);

    boolean removeFriend(String loggedInUserId, String friendToRemoveId);
}
